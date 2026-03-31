import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

const services = [
  {
    icon: "☁️",
    title: "Cloud Architecture & Migration",
    description:
      "Design and migrate your infrastructure to AWS, GCP, or Azure with zero downtime. Scalable, secure, cost-optimized.",
  },
  {
    icon: "⚡",
    title: "Serverless Development",
    description:
      "Build event-driven applications that scale automatically and cost nothing when idle. Lambda, API Gateway, DynamoDB.",
  },
  {
    icon: "📊",
    title: "Data Analytics & Dashboards",
    description:
      "Turn raw data into actionable insights with custom dashboards, pipelines, and real-time reporting.",
  },
  {
    icon: "🤖",
    title: "AI & Digital Marketing",
    description:
      "AI-powered campaigns, SEO, content strategy, and performance marketing that drives measurable growth.",
  },
];

const stats = [
  { value: "99.9%", label: "Uptime SLA" },
  { value: "14 days", label: "First Results" },
  { value: "30%", label: "Bundle Savings" },
  { value: "0", label: "Lock-in Contracts" },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy text-white">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-navy" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-electric/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-gradient-shift" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 animate-gradient-shift delay-200" />

        <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32 lg:py-40">
          <div className="max-w-2xl">
            <p className="text-cyan font-mono text-sm font-medium tracking-wide mb-4 animate-fade-in-up">
              CLOUD &bull; SERVERLESS &bull; ANALYTICS &bull; AI
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight tracking-tight animate-fade-in-up delay-100">
              Clear skies.{" "}
              <span className="bg-gradient-to-r from-electric to-cyan bg-clip-text text-transparent">
                Zero friction.
              </span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-slate-300 leading-relaxed max-w-xl animate-fade-in-up delay-200">
              We help startups and SMBs build scalable cloud infrastructure,
              ship serverless apps, and grow with AI-powered marketing — all without the enterprise price tag.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300">
              <Link
                href="/contact"
                className="bg-electric hover:bg-electric-dark hover:scale-[1.02] active:scale-[0.98] text-white font-semibold px-8 py-3.5 rounded-lg transition-all duration-200 text-center"
              >
                Get a Free Audit
              </Link>
              <Link
                href="/services"
                className="border border-slate-500 hover:border-electric hover:scale-[1.02] active:scale-[0.98] text-white font-semibold px-8 py-3.5 rounded-lg transition-all duration-200 text-center"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 100}>
                <div className="text-center">
                  <div className="text-3xl font-heading font-bold text-electric">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-muted">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-electric font-mono text-sm font-medium tracking-wide mb-3">
                WHAT WE DO
              </p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy">
                Everything you need to scale
              </h2>
              <p className="mt-4 text-muted text-lg">
                From infrastructure to marketing, we cover the full stack of modern business growth.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, i) => (
              <ScrollReveal key={service.title} delay={i * 100}>
                <div className="group p-8 rounded-2xl border border-slate-200 hover:border-electric/30 hover:shadow-lg hover:shadow-electric/5 hover:-translate-y-1 transition-all duration-300">
                  <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-navy group-hover:text-electric transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-muted leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={400}>
            <div className="text-center mt-12">
              <Link
                href="/services"
                className="text-electric hover:text-electric-dark font-semibold inline-flex items-center gap-2 transition-colors group"
              >
                See pricing & details
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="group-hover:translate-x-1 transition-transform"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-heading font-bold">
              Ready to go{" "}
              <span className="bg-gradient-to-r from-electric to-cyan bg-clip-text text-transparent">
                cloudless
              </span>
              ?
            </h2>
            <p className="mt-4 text-slate-300 text-lg max-w-xl mx-auto">
              Book a free 30-minute audit. We&apos;ll review your current setup and show you
              exactly where you can save time, money, and headaches.
            </p>
            <Link
              href="/contact"
              className="inline-block mt-8 bg-electric hover:bg-electric-dark hover:scale-[1.02] active:scale-[0.98] text-white font-semibold px-10 py-4 rounded-lg transition-all duration-200 text-lg"
            >
              Book Your Free Audit
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
