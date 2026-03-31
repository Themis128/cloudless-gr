import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPostBySlug, formatDate } from "@/lib/blog";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  // Simple markdown-ish rendering: split by ## headers
  const sections = post.content.split(/^## /m);
  const intro = sections[0]?.trim();
  const rest = sections.slice(1);

  return (
    <>
      {/* Header */}
      <section className="bg-navy text-white py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <Link
            href="/blog"
            className="text-slate-400 hover:text-electric text-sm font-medium inline-flex items-center gap-2 mb-6 transition-colors"
          >
            <svg
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M11 7H3M7 3L3 7l4 4" />
            </svg>
            Back to Blog
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono font-medium px-3 py-1 rounded-full bg-electric/20 text-electric-light">
              {post.category}
            </span>
            <span className="text-xs text-slate-400">{post.readTime}</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-tight animate-fade-in-up">
            {post.title}
          </h1>
          <time className="block mt-4 text-sm text-slate-400 font-mono animate-fade-in-up delay-100">
            {formatDate(post.date)}
          </time>
        </div>
      </section>

      {/* Article Body */}
      <article className="py-12 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="prose-custom">
            {intro && (
              <div className="text-lg text-slate-600 leading-relaxed mb-8">
                {intro.split("\n\n").map((para, i) => (
                  <p key={i} className={i > 0 ? "mt-4" : ""}>
                    {para}
                  </p>
                ))}
              </div>
            )}

            {rest.map((section, i) => {
              const [heading, ...bodyParts] = section.split("\n\n");
              return (
                <div key={i} className="mb-8">
                  <h2 className="text-xl md:text-2xl font-heading font-bold text-navy mb-4">
                    {heading?.trim()}
                  </h2>
                  {bodyParts.map((para, j) => (
                    <p
                      key={j}
                      className="text-slate-600 leading-relaxed mb-4"
                    >
                      {para.trim()}
                    </p>
                  ))}
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <h3 className="text-xl font-heading font-bold text-navy">
              Need help implementing this?
            </h3>
            <p className="mt-2 text-muted text-sm">
              Book a free 30-minute audit and we&apos;ll show you exactly where to start.
            </p>
            <Link
              href="/contact"
              className="inline-block mt-4 bg-electric hover:bg-electric-dark text-white font-semibold px-8 py-3 rounded-lg transition-colors text-sm"
            >
              Get a Free Audit
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
