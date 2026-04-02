"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import {
  demoProducts,
  categoryLabels,
  categoryColors,
  type ProductCategory,
  type StoreProduct,
} from "@/lib/store-products";

const categories: ("all" | ProductCategory)[] = [
  "all",
  "service",
  "digital",
  "physical",
];

function formatPrice(amount: number, currency: string = "eur"): string {
  return new Intl.NumberFormat("en-EU", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: 0,
  }).format(amount / 100);
}

function ProductCard({ product }: { product: StoreProduct }) {
  const { addItem } = useCart();
  return (
    <div className="group rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:shadow-electric/5 hover:border-electric/30 hover:-translate-y-1 transition-all duration-300">
      {/* Image placeholder */}
      <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center p-8 relative">
        <div className="text-6xl">
          {product.category === "service"
            ? "⚙️"
            : product.category === "digital"
            ? "📦"
            : "👕"}
        </div>
        <span
          className={`absolute top-4 left-4 text-xs font-mono font-medium px-3 py-1 rounded-full ${
            categoryColors[product.category]
          }`}
        >
          {categoryLabels[product.category]}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <Link href={`/store/${product.id}`}>
          <h3 className="text-lg font-heading font-semibold text-navy group-hover:text-electric transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="mt-2 text-sm text-muted line-clamp-2">
          {product.description}        </p>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-xl font-heading font-bold text-electric">
              {formatPrice(product.price, product.currency)}
            </span>
            {product.recurring && (
              <span className="text-sm text-muted ml-1">/{product.interval}</span>
            )}
          </div>
          <button
            onClick={() => addItem(product)}
            className="bg-electric hover:bg-electric-dark text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors hover:scale-[1.02] active:scale-[0.98]"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default function StoreGrid() {
  const [activeCategory, setActiveCategory] = useState<"all" | ProductCategory>(
    "all"
  );

  const filtered =
    activeCategory === "all"      ? demoProducts
      : demoProducts.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat
                ? "bg-electric text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {cat === "all" ? "All Products" : categoryLabels[cat]}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}