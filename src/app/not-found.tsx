import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex-1 flex items-center justify-center py-24 px-6">
      <div className="text-center">
        <p className="text-electric font-mono text-sm font-medium">404</p>
        <h1 className="mt-2 text-3xl font-heading font-bold text-navy">
          Page not found
        </h1>
        <p className="mt-3 text-muted">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block mt-6 bg-electric hover:bg-electric-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}