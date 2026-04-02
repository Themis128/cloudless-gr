import { describe, it, expect } from "vitest";
import {
  demoProducts,
  getProductById,
  getProductsByCategory,
  categoryLabels,
  categoryColors,
} from "@/lib/store-products";
import type { ProductCategory } from "@/lib/store-products";

describe("store-products", () => {
  describe("demoProducts", () => {
    it("contains 9 products", () => {
      expect(demoProducts).toHaveLength(9);
    });

    it("has unique IDs for every product", () => {
      const ids = demoProducts.map((p) => p.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    it("every product has required fields", () => {
      for (const p of demoProducts) {
        expect(p.id).toBeTruthy();
        expect(p.name).toBeTruthy();
        expect(p.description).toBeTruthy();
        expect(p.price).toBeGreaterThan(0);
        expect(p.currency).toBe("eur");
        expect(["digital", "physical", "service"]).toContain(p.category);
        expect(p.image).toBeTruthy();
      }
    });

    it("contains all three categories", () => {
      const categories = new Set(demoProducts.map((p) => p.category));
      expect(categories).toContain("service");
      expect(categories).toContain("digital");
      expect(categories).toContain("physical");
    });

    it("recurring products have an interval", () => {
      const recurring = demoProducts.filter((p) => p.recurring);
      expect(recurring.length).toBeGreaterThan(0);
      for (const p of recurring) {
        expect(["month", "year"]).toContain(p.interval);
      }
    });
  });

  describe("getProductById", () => {
    it("returns the correct product for a valid ID", () => {
      const product = getProductById("srv-cloud");
      expect(product).toBeDefined();
      expect(product!.name).toBe("Cloud Architecture Audit");
    });

    it("returns undefined for an invalid ID", () => {
      expect(getProductById("nonexistent")).toBeUndefined();
    });
  });

  describe("getProductsByCategory", () => {
    it("returns only services when filtering by service", () => {
      const services = getProductsByCategory("service");
      expect(services.length).toBe(4);
      expect(services.every((p) => p.category === "service")).toBe(true);
    });

    it("returns only digital products", () => {
      const digital = getProductsByCategory("digital");
      expect(digital.length).toBe(3);
      expect(digital.every((p) => p.category === "digital")).toBe(true);
    });

    it("returns only physical products", () => {
      const physical = getProductsByCategory("physical");
      expect(physical.length).toBe(2);
      expect(physical.every((p) => p.category === "physical")).toBe(true);
    });
  });

  describe("categoryLabels and categoryColors", () => {
    it("has labels for all categories", () => {
      const categories: ProductCategory[] = ["service", "digital", "physical"];
      for (const cat of categories) {
        expect(categoryLabels[cat]).toBeTruthy();
        expect(categoryColors[cat]).toBeTruthy();
      }
    });
  });
});
