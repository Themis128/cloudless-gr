"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";

function formatPrice(amount: number, currency: string = "eur"): string {
  return new Intl.NumberFormat("en-EU", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: 0,
  }).format(amount / 100);
}

export default function CartSlideOver() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    totalPrice,
    totalItems,
  } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      const res = await fetch("/api/checkout", {        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            id: item.product.id,
            name: item.product.name,
            price: item.product.price,
            currency: item.product.currency,
            quantity: item.quantity,
            recurring: item.product.recurring,
            interval: item.product.interval,
          })),
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      alert("Checkout failed. Please try again.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />

      {/* Panel */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
            <h2 className="text-lg font-heading font-bold text-navy">
              Cart ({totalItems})
            </h2>
            <button
              onClick={closeCart}
              className="p-2 text-slate-400 hover:text-navy transition-colors"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4l12 12M16 4L4 16" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (              <div className="text-center py-12">
                <div className="text-4xl mb-4">🛒</div>
                <p className="text-muted">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 py-4 border-b border-slate-100"
                  >
                    {/* Icon */}
                    <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">
                        {item.product.category === "service"
                          ? "⚙️"
                          : item.product.category === "digital"
                          ? "📦"
                          : "👕"}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-navy truncate">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-electric font-medium mt-1">
                        {formatPrice(item.product.price, item.product.currency)}
                        {item.product.recurring && `/${item.product.interval}`}                      </p>

                      <div className="flex items-center gap-3 mt-2">
                        {/* Quantity (not for services/subscriptions) */}
                        {!item.product.recurring && (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity - 1)
                              }
                              className="w-7 h-7 rounded bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-sm transition-colors"
                            >
                              -
                            </button>
                            <span className="w-8 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity + 1)
                              }
                              className="w-7 h-7 rounded bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-sm transition-colors"
                            >
                              +
                            </button>
                          </div>
                        )}

                        <button
                          onClick={() => removeItem(item.product.id)}                          className="text-xs text-red-500 hover:text-red-700 transition-colors ml-auto"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-slate-200 px-6 py-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-heading font-semibold text-navy">Total</span>
                <span className="text-xl font-heading font-bold text-electric">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full bg-electric hover:bg-electric-dark disabled:bg-slate-300 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                {isCheckingOut ? "Redirecting to Stripe..." : "Checkout"}
              </button>
              <p className="text-xs text-muted text-center">
                Secure payment powered by Stripe              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}