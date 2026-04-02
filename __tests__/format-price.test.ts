import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock stripe module to avoid STRIPE_SECRET_KEY requirement
vi.mock("stripe", () => {
  return { default: vi.fn() };
});

// Set env before importing
beforeEach(() => {
  process.env.STRIPE_SECRET_KEY = "sk_test_fake_key_for_testing";
});

describe("formatPrice", () => {
  it("formats cents to EUR correctly", async () => {
    const { formatPrice } = await import("@/lib/stripe");
    const result = formatPrice(4900, "eur");
    // Should format 4900 cents as €49
    expect(result).toContain("49");
  });

  it("formats large amounts correctly", async () => {
    const { formatPrice } = await import("@/lib/stripe");
    const result = formatPrice(120000, "eur");
    expect(result).toContain("1,200");
  });

  it("defaults to EUR when no currency specified", async () => {
    const { formatPrice } = await import("@/lib/stripe");
    const result = formatPrice(2500);
    expect(result).toContain("25");
  });
});
