import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Order Confirmed",
  description: "Thank you for your purchase from Cloudless.",
};

export default function SuccessPage() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-navy">
          Order confirmed!
        </h1>
        <p className="mt-4 text-muted text-lg leading-relaxed">
          Thanks for your purchase. You&apos;ll receive a confirmation email
          shortly with your order details and any download links.
        </p>
        <p className="mt-2 text-muted">
          For services, our team will reach out within 24 hours to schedule your
          kickoff call.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/store"
            className="bg-electric hover:bg-electric-dark text-white font-semibold px-8 py-3 rounded-lg transition-colors text-center"
          >
            Continue Shopping
          </Link>          <Link
            href="/"
            className="border border-slate-300 hover:border-electric text-navy font-semibold px-8 py-3 rounded-lg transition-colors text-center"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}