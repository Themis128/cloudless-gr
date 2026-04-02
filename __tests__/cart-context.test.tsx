import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { CartProvider, useCart } from "@/context/CartContext";
import type { StoreProduct } from "@/lib/store-products";
import type { ReactNode } from "react";

const mockProduct: StoreProduct = {
  id: "test-1",
  name: "Test Product",
  description: "A test product",
  price: 1000,
  currency: "eur",
  category: "digital",
  image: "/test.svg",
  features: ["Feature 1"],
};

const mockSubscription: StoreProduct = {
  id: "test-sub",
  name: "Test Subscription",
  description: "A test subscription",
  price: 5000,
  currency: "eur",
  category: "service",
  image: "/sub.svg",
  recurring: true,
  interval: "month",
};

function wrapper({ children }: { children: ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}

describe("CartContext", () => {
  it("starts with an empty cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.items).toHaveLength(0);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.totalPrice).toBe(0);
    expect(result.current.isOpen).toBe(false);
  });

  it("adds an item to the cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addItem(mockProduct));
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].product.id).toBe("test-1");
    expect(result.current.items[0].quantity).toBe(1);
    expect(result.current.totalItems).toBe(1);
    expect(result.current.totalPrice).toBe(1000);
  });

  it("increments quantity when adding the same item twice", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addItem(mockProduct));
    act(() => result.current.addItem(mockProduct));
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(2);
    expect(result.current.totalItems).toBe(2);
    expect(result.current.totalPrice).toBe(2000);
  });

  it("removes an item from the cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addItem(mockProduct));
    act(() => result.current.addItem(mockSubscription));
    expect(result.current.items).toHaveLength(2);
    act(() => result.current.removeItem("test-1"));
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].product.id).toBe("test-sub");
  });

  it("updates item quantity", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addItem(mockProduct));
    act(() => result.current.updateQuantity("test-1", 5));
    expect(result.current.items[0].quantity).toBe(5);
    expect(result.current.totalPrice).toBe(5000);
  });

  it("removes item when quantity set to 0", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addItem(mockProduct));
    act(() => result.current.updateQuantity("test-1", 0));
    expect(result.current.items).toHaveLength(0);
  });

  it("clears the entire cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addItem(mockProduct));
    act(() => result.current.addItem(mockSubscription));
    expect(result.current.items).toHaveLength(2);
    act(() => result.current.clearCart());
    expect(result.current.items).toHaveLength(0);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.totalPrice).toBe(0);
  });

  it("toggles cart open/close", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.isOpen).toBe(false);
    act(() => result.current.toggleCart());
    expect(result.current.isOpen).toBe(true);
    act(() => result.current.toggleCart());
    expect(result.current.isOpen).toBe(false);
  });

  it("closes cart explicitly", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.toggleCart());
    expect(result.current.isOpen).toBe(true);
    act(() => result.current.closeCart());
    expect(result.current.isOpen).toBe(false);
  });

  it("calculates totalPrice with mixed items", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addItem(mockProduct)); // 1000
    act(() => result.current.addItem(mockSubscription)); // 5000
    act(() => result.current.updateQuantity("test-1", 3)); // 3000
    expect(result.current.totalPrice).toBe(8000); // 3000 + 5000
    expect(result.current.totalItems).toBe(4); // 3 + 1
  });

  it("throws when useCart is called outside CartProvider", () => {
    expect(() => {
      renderHook(() => useCart());
    }).toThrow("useCart must be used within a CartProvider");
  });
});
