import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Cloud architecture, serverless development, data analytics, and AI-powered digital marketing services for startups and SMBs.",
};

const services = [
  {
    icon: "☁️",
    title: "Cloud Architecture & Migration",
    price: "From €2,000",
    unit: "per project",
    features: [
      "AWS / GCP / Azure architecture design",
      "Zero-downtime migration planning",
      "Cost optimization & right-sizing",
      "Security & compliance review",
      "Infrastructure as Code (Terraform / CDK)",
    ],
  },
  {
    icon: "⚡",
    title: "Serverless Development",
    price: "From €2,400",
    unit: "per project",    features: [
      "Event-driven application design",
      "AWS Lambda / API Gateway / DynamoDB",
      "CI/CD pipeline setup",
      "Monitoring & alerting",
      "Pay-per-use cost modeling",
    ],
  },
  {
    icon: "📊",
    title: "Data Analytics & Dashboards",
    price: "From €2,400",
    unit: "per project",
    features: [
      "Custom analytics dashboards",
      "ETL pipeline development",
      "Real-time data processing",
      "Business intelligence reporting",
      "Data warehouse design",
    ],
  },
  {
    icon: "🤖",
    title: "AI & Digital Marketing",
    price: "From €800",
    unit: "per month",
    features: [
      "AI-powered content strategy",
      "SEO & search optimization",
      "Paid advertising management",      "Social media automation",
      "Performance tracking & reporting",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-navy text-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-cyan font-mono text-sm font-medium tracking-wide mb-3">
            OUR SERVICES
          </p>
          <h1 className="text-3xl md:text-5xl font-heading font-bold leading-tight">
            Transparent pricing.{" "}
            <span className="bg-gradient-to-r from-electric to-cyan bg-clip-text text-transparent">
              Real results.
            </span>
          </h1>
          <p className="mt-4 text-slate-300 text-lg max-w-xl">
            No hidden fees, no lock-in contracts. Pick what you need or bundle everything
            for 30% savings.
          </p>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-16 md:py-24">        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-2xl border border-slate-200 p-8 hover:shadow-lg hover:shadow-electric/5 hover:border-electric/30 transition-all duration-300"
              >
                <div className="text-3xl mb-3">{service.icon}</div>
                <h2 className="text-xl font-heading font-bold text-navy">
                  {service.title}
                </h2>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-heading font-bold text-electric">
                    {service.price}
                  </span>
                  <span className="text-sm text-muted">{service.unit}</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-slate-600">
                      <svg
                        className="w-5 h-5 text-cyan flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="inline-block mt-8 text-electric hover:text-electric-dark font-semibold text-sm transition-colors"
                >
                  Get started →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bundle CTA */}
      <section className="bg-gradient-to-br from-navy via-navy-light to-navy text-white">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="rounded-2xl border border-electric/30 bg-navy-light/50 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <p className="text-cyan font-mono text-xs font-medium tracking-wide mb-2">
                BEST VALUE
              </p>
              <h2 className="text-2xl md:text-3xl font-heading font-bold">
                Full-Stack Growth Engine
              </h2>
              <p className="mt-3 text-slate-300 leading-relaxed">
                Get all four services bundled together. Cloud infrastructure, serverless apps,
                analytics dashboards, and AI marketing — everything your business needs to scale.              </p>
              <ul className="mt-4 flex flex-wrap gap-3">
                {["Cloud Architecture", "Serverless Dev", "Analytics", "AI Marketing"].map((item) => (
                  <li
                    key={item}
                    className="text-xs font-mono text-cyan bg-cyan/10 px-3 py-1 rounded-full"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-center md:text-right flex-shrink-0">
              <div className="text-4xl font-heading font-bold">€3,600</div>
              <div className="text-sm text-slate-400 mt-1">per month</div>
              <div className="text-xs text-cyan font-mono mt-2">SAVE 30%</div>
              <Link
                href="/contact"
                className="inline-block mt-4 bg-electric hover:bg-electric-dark text-white font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Let&apos;s Talk
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6 text-center">          <h2 className="text-2xl font-heading font-bold text-navy">
            Our Guarantee
          </h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="p-6 rounded-xl bg-slate-50">
              <div className="text-2xl mb-2">🚀</div>
              <h3 className="font-heading font-semibold text-navy">Results in 14 Days</h3>
              <p className="mt-2 text-sm text-muted">
                See measurable progress within two weeks of kickoff.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-slate-50">
              <div className="text-2xl mb-2">🔓</div>
              <h3 className="font-heading font-semibold text-navy">No Lock-in</h3>
              <p className="mt-2 text-sm text-muted">
                Month-to-month. Cancel anytime. Your code is always yours.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-slate-50">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="font-heading font-semibold text-navy">Free Audit</h3>
              <p className="mt-2 text-sm text-muted">
                We start every engagement with a no-cost review of your current setup.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}