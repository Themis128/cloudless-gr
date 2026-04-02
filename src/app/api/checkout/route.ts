import { NextRequest } from "next/server";
import { stripe } from "@/lib/stripe";

interface CheckoutItem {
  id: string;
  name: string;
  price: number;
  currency: string;
  quantity: number;
  recurring?: boolean;
  interval?: "month" | "year";
}

export async function POST(request: NextRequest) {
  try {
    const { items } = (await request.json()) as { items: CheckoutItem[] };

    if (!items || items.length === 0) {
      return Response.json({ error: "No items in cart" }, { status: 400 });
    }

    const origin = request.headers.get("origin") || "https://cloudless.gr";

    const lineItems = items.map((item) => {
      const priceData: Record<string, unknown> = {
        currency: item.currency || "eur",
        product_data: {
          name: item.name,
        },        unit_amount: item.price,
      };

      if (item.recurring) {
        priceData.recurring = {
          interval: item.interval || "month",
        };
      }

      return {
        price_data: priceData,
        quantity: item.quantity,
      };
    });

    // Determine mode based on whether any item is recurring
    const hasSubscription = items.some((item) => item.recurring);
    const mode = hasSubscription ? "subscription" : "payment";

    const session = await stripe.checkout.sessions.create({
      mode: mode as "payment" | "subscription",
      line_items: lineItems as never[],
      success_url: `${origin}/store/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/store`,
      billing_address_collection: "required",
      shipping_address_collection: items.some(
        (item) => !item.recurring && item.price > 10000
      )
        ? { allowed_countries: ["GR", "DE", "FR", "IT", "ES", "NL", "BE", "AT", "PT", "IE", "FI", "SE", "DK", "PL", "CZ", "RO", "BG", "HR", "SK", "SI", "LT", "LV", "EE", "LU", "MT", "CY", "US", "GB", "CA", "AU"] }        : undefined,
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