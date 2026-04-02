"use client";

import { useCart } from "@/context/CartContext";

export default function CartButton() {
  const { toggleCart, totalItems } = useCart();

  return (
    <button
      onClick={toggleCart}
      className="relative p-2 text-slate-300 hover:text-white transition-colors"
      aria-label="Open cart"
    >
      <svg
        width="22"
        height="22"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path
          d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M3 6h18" strokeLinecap="round" strokeLinejoin="round" />
        <path
          d="M16 10a4 4 0 01-8 0"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-electric text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </button>
  );
}