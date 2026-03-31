import type { Metadata } from "next";
import Link from "next/link";
import { posts, formatDate } from "@/lib/blog";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on cloud computing, serverless architecture, data analytics, and AI marketing for startups and SMBs.",
};

const categoryColors: Record<string, string> = {
  Cloud: "bg-electric/10 text-electric",
  Serverless: "bg-cyan/10 text-cyan-dark",
  Analytics: "bg-purple-100 text-purple-700",
  "AI Marketing": "bg-emerald-100 text-emerald-700",
};

export default function BlogPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-navy text-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-cyan font-mono text-sm font-medium tracking-wide mb-3 animate-fade-in-up">
            BLOG
          </p>
          <h1 className="text-3xl md:text-5xl font-heading font-bold leading-tight animate-fade-in-up delay-100">
            Insights &{" "}
            <span className="bg-gradient-to-r from-electric to-cyan bg-clip-text text-transparent">
              practical guides
            </span>
          </h1>
          <p className="mt-4 text-slate-300 text-lg max-w-xl animate-fade-in-up delay-200">
            Cloud architecture, serverless, analytics, and AI marketing — written for
            founders and technical teams who want to move fast.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post, i) => (
              <ScrollReveal key={post.slug} delay={i * 100}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block rounded-2xl border border-slate-200 p-8 hover:border-electric/30 hover:shadow-lg hover:shadow-electric/5 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className={`text-xs font-mono font-medium px-3 py-1 rounded-full ${
                        categoryColors[post.category] ?? "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {post.category}
                    </span>
                    <span className="text-xs text-muted">{post.readTime}</span>
                  </div>
                  <h2 className="text-xl font-heading font-bold text-navy group-hover:text-electric transition-colors">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-muted leading-relaxed text-sm">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <time className="text-xs text-slate-400 font-mono">
                      {formatDate(post.date)}
                    </time>
                    <span className="text-electric text-sm font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read more
                      <svg
                        width="14"
                        height="14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M3 7h8M7 3l4 4-4 4" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
