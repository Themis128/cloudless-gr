import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  demoProducts,
  getProductById,
  categoryLabels,
  categoryColors,
} from "@/lib/store-products";
import AddToCartButton from "@/components/store/AddToCartButton";

export function generateStaticParams() {
  return demoProducts.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.description,
  };
}

function formatPrice(amount: number, currency: string = "eur"): string {  return new Intl.NumberFormat("en-EU", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: 0,
  }).format(amount / 100);
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) notFound();

  return (
    <>
      {/* Breadcrumb */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <nav className="flex items-center gap-2 text-sm text-muted">
            <Link href="/store" className="hover:text-electric transition-colors">
              Store
            </Link>
            <span>/</span>
            <span className="text-navy font-medium">{product.name}</span>
          </nav>
        </div>      </section>

      {/* Product Detail */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Image */}
            <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl flex items-center justify-center">
              <div className="text-8xl">
                {product.category === "service"
                  ? "⚙️"
                  : product.category === "digital"
                  ? "📦"
                  : "👕"}
              </div>
            </div>

            {/* Info */}
            <div>
              <span
                className={`inline-block text-xs font-mono font-medium px-3 py-1 rounded-full mb-4 ${
                  categoryColors[product.category]
                }`}
              >
                {categoryLabels[product.category]}
              </span>

              <h1 className="text-3xl md:text-4xl font-heading font-bold text-navy">
                {product.name}
              </h1>
              <p className="mt-4 text-muted text-lg leading-relaxed">
                {product.description}
              </p>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-3xl font-heading font-bold text-electric">
                  {formatPrice(product.price, product.currency)}
                </span>
                {product.recurring && (
                  <span className="text-muted">/{product.interval}</span>
                )}
              </div>

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-sm font-mono font-medium text-navy tracking-wide mb-4">
                    WHAT&apos;S INCLUDED
                  </h2>
                  <ul className="space-y-3">
                    {product.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm text-slate-600"
                      >
                        <svg
                          className="w-5 h-5 text-cyan flex-shrink-0 mt-0.5"
                          fill="none"                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M5 13l4 4L19 7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Add to cart */}
              <div className="mt-8">
                <AddToCartButton product={product} />
              </div>

              <p className="mt-4 text-xs text-muted">
                Secure checkout powered by Stripe. 30-day money-back guarantee.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}