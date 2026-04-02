"use client";

import { useCart } from "@/context/CartContext";
import type { StoreProduct } from "@/lib/store-products";

export default function AddToCartButton({ product }: { product: StoreProduct }) {
  const { addItem, toggleCart } = useCart();

  const handleAdd = () => {
    addItem(product);
    toggleCart();
  };

  return (
    <button
      onClick={handleAdd}
      className="w-full bg-electric hover:bg-electric-dark text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] text-lg"
    >
      {product.recurring ? "Subscribe" : "Add to Cart"}
    </button>
  );
}