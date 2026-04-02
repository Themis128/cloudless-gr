import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CartProvider } from "@/context/CartContext";
import StoreGrid from "@/components/store/StoreGrid";

// Mock next/link to render plain anchors
vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

function renderWithCart(ui: React.ReactElement) {
  return render(<CartProvider>{ui}</CartProvider>);
}

describe("StoreGrid", () => {
  it("renders all 8 products by default", () => {
    renderWithCart(<StoreGrid />);
    const addButtons = screen.getAllByText("Add to Cart");
    expect(addButtons.length).toBe(8);
  });

  it("renders filter buttons for all categories", () => {
    renderWithCart(<StoreGrid />);
    // Use getAllByRole to target filter buttons specifically
    const buttons = screen.getAllByRole("button");
    const filterLabels = buttons
      .filter((b) => !b.textContent?.includes("Add to Cart"))
      .map((b) => b.textContent);
    expect(filterLabels).toContain("All Products");
    expect(filterLabels).toContain("Services");
    expect(filterLabels).toContain("Digital Products");
    expect(filterLabels).toContain("Merch & Physical");
  });

  it("filters to only services when Services is clicked", () => {
    renderWithCart(<StoreGrid />);
    const filterButtons = screen.getAllByRole("button").filter(
      (b) => !b.textContent?.includes("Add to Cart")
    );
    const servicesBtn = filterButtons.find((b) => b.textContent === "Services")!;
    fireEvent.click(servicesBtn);
    const addButtons = screen.getAllByText("Add to Cart");
    expect(addButtons.length).toBe(3);
    expect(screen.getByText("Cloud Architecture Audit")).toBeDefined();
  });

  it("filters to digital products", () => {
    renderWithCart(<StoreGrid />);
    const filterButtons = screen.getAllByRole("button").filter(
      (b) => !b.textContent?.includes("Add to Cart")
    );
    const digitalBtn = filterButtons.find((b) => b.textContent === "Digital Products")!;
    fireEvent.click(digitalBtn);
    const addButtons = screen.getAllByText("Add to Cart");
    expect(addButtons.length).toBe(3);
    expect(screen.getByText("Cloud Migration Playbook")).toBeDefined();
  });

  it("filters to physical products", () => {
    renderWithCart(<StoreGrid />);
    const filterButtons = screen.getAllByRole("button").filter(
      (b) => !b.textContent?.includes("Add to Cart")
    );
    const physicalBtn = filterButtons.find((b) => b.textContent === "Merch & Physical")!;
    fireEvent.click(physicalBtn);
    const addButtons = screen.getAllByText("Add to Cart");
    expect(addButtons.length).toBe(2);
  });

  it("returns to all products when All Products is clicked", () => {
    renderWithCart(<StoreGrid />);
    const filterButtons = screen.getAllByRole("button").filter(
      (b) => !b.textContent?.includes("Add to Cart")
    );
    const servicesBtn = filterButtons.find((b) => b.textContent === "Services")!;
    fireEvent.click(servicesBtn);
    expect(screen.getAllByText("Add to Cart").length).toBe(3);
    const allBtn = filterButtons.find((b) => b.textContent === "All Products")!;
    fireEvent.click(allBtn);
    expect(screen.getAllByText("Add to Cart").length).toBe(8);
  });

  it("product cards link to detail pages", () => {
    renderWithCart(<StoreGrid />);
    const link = screen.getByText("Cloud Architecture Audit").closest("a");
    expect(link?.getAttribute("href")).toBe("/store/srv-cloud");
  });
});
