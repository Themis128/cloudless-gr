import type { Metadata } from "next";
import StoreGrid from "@/components/store/StoreGrid";

export const metadata: Metadata = {
  title: "Store",
  description:
    "Cloud migration playbooks, serverless courses, analytics templates, dev merch, and expert service packages from Cloudless.",
};

export default function StorePage() {
  return (
    <>
      {/* Header */}
      <section className="bg-navy text-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-cyan font-mono text-sm font-medium tracking-wide mb-3">
            STORE
          </p>
          <h1 className="text-3xl md:text-5xl font-heading font-bold leading-tight">
            Tools, templates &amp;{" "}
            <span className="bg-gradient-to-r from-electric to-cyan bg-clip-text text-transparent">
              expert services.
            </span>
          </h1>
          <p className="mt-4 text-slate-300 text-lg max-w-xl">
            Everything you need to build, scale, and market your cloud-powered
            business — from self-serve digital products to done-for-you services.
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <StoreGrid />
        </div>
      </section>
    </>
  );
}