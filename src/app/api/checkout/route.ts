import { NextRequest } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { getProductById, type StoreProduct } from "@/lib/store-products";

// Stripe's SDK needs Node APIs — it cannot run on the Edge runtime.
export const runtime = "nodejs";

const MAX_QUANTITY = 100;

const SHIPPING_COUNTRIES: Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[] =
  [
    "GR", "DE", "FR", "IT", "ES", "NL", "BE", "AT", "PT", "IE",
    "FI", "SE", "DK", "PL", "CZ", "RO", "BG", "HR", "SK", "SI",
    "LT", "LV", "EE", "LU", "MT", "CY", "US", "GB", "CA", "AU",
  ];

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const items = (body as { items?: unknown })?.items;
  if (!Array.isArray(items) || items.length === 0) {
    return Response.json({ error: "No items in cart" }, { status: 400 });
  }

  // Resolve each requested item against canonical server-side product data.
  // Prices, names and currencies are never trusted from the client.
  const resolved: { product: StoreProduct; quantity: number }[] = [];
  for (const raw of items) {
    const id = (raw as { id?: unknown })?.id;
    const quantity = (raw as { quantity?: unknown })?.quantity;

    if (typeof id !== "string") {
      return Response.json(
        { error: "Each item needs a valid id" },
        { status: 400 }
      );
    }
    if (
      typeof quantity !== "number" ||
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > MAX_QUANTITY
    ) {
      return Response.json(
        {
          error: `Quantity for "${id}" must be a whole number between 1 and ${MAX_QUANTITY}`,
        },
        { status: 400 }
      );
    }

    const product = getProductById(id);
    if (!product) {
      return Response.json(
        { error: `Unknown product: ${id}` },
        { status: 400 }
      );
    }
    resolved.push({ product, quantity });
  }

  // A single Stripe Checkout session cannot mix subscription and one-time items.
  const hasSubscription = resolved.some((r) => r.product.recurring);
  const hasOneTime = resolved.some((r) => !r.product.recurring);
  if (hasSubscription && hasOneTime) {
    return Response.json(
      { error: "Subscriptions and one-time items must be purchased separately" },
      { status: 400 }
    );
  }

  const origin = request.headers.get("origin") || "https://cloudless.gr";

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = resolved.map(
    ({ product, quantity }) => {
      const priceData: Stripe.Checkout.SessionCreateParams.LineItem.PriceData = {
        currency: product.currency || "eur",
        product_data: { name: product.name },
        unit_amount: product.price,
      };

      if (product.recurring) {
        priceData.recurring = { interval: product.interval || "month" };
      }

      return { price_data: priceData, quantity };
    }
  );

  const needsShipping = resolved.some(
    ({ product }) => !product.recurring && product.price > 10000
  );

  try {
    const session = await getStripe().checkout.sessions.create({
      mode: hasSubscription ? "subscription" : "payment",
      line_items: lineItems,
      success_url: `${origin}/store/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/store`,
      billing_address_collection: "required",
      shipping_address_collection: needsShipping
        ? { allowed_countries: SHIPPING_COUNTRIES }
        : undefined,
    });

    return Response.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return Response.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
