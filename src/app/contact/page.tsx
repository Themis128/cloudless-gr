"use client";

import type { FormEvent } from "react";
import { useState } from "react";

const serviceOptions = [
  "Cloud Architecture & Migration",
  "Serverless Development",
  "Data Analytics & Dashboards",
  "AI & Digital Marketing",
  "Full-Stack Growth Engine (Bundle)",
  "Not sure yet — let's discuss",
];

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      service_id: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "",
      template_id: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "",
      user_id: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "",
      template_params: {
        from_name: (form.elements.namedItem("name") as HTMLInputElement).value,
        from_email: (form.elements.namedItem("email") as HTMLInputElement).value,        company: (form.elements.namedItem("company") as HTMLInputElement).value,
        service: (form.elements.namedItem("service") as HTMLSelectElement).value,
        message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      },
    };

    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      {/* Header */}
      <section className="bg-navy text-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-cyan font-mono text-sm font-medium tracking-wide mb-3">
            GET IN TOUCH          </p>
          <h1 className="text-3xl md:text-5xl font-heading font-bold leading-tight">
            Let&apos;s build something{" "}
            <span className="bg-gradient-to-r from-electric to-cyan bg-clip-text text-transparent">
              great together
            </span>
          </h1>
          <p className="mt-4 text-slate-300 text-lg max-w-xl">
            Book a free 30-minute audit or tell us about your project.
            We&apos;ll get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              {status === "sent" ? (
                <div className="rounded-2xl bg-cyan/10 border border-cyan/30 p-10 text-center">
                  <div className="text-4xl mb-4">✅</div>
                  <h2 className="text-2xl font-heading font-bold text-navy">
                    Message Sent!
                  </h2>
                  <p className="mt-2 text-muted">
                    Thanks for reaching out. We&apos;ll get back to you within 24 hours.
                  </p>                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-electric hover:text-electric-dark font-semibold text-sm"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-navy mb-2">
                        Name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="John Doe"
                        className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-navy placeholder:text-slate-400 focus:border-electric focus:ring-2 focus:ring-electric/20 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-navy mb-2">
                        Email *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"                        required
                        placeholder="john@company.com"
                        className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-navy placeholder:text-slate-400 focus:border-electric focus:ring-2 focus:ring-electric/20 outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-navy mb-2">
                      Company
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      placeholder="Acme Inc."
                      className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-navy placeholder:text-slate-400 focus:border-electric focus:ring-2 focus:ring-electric/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-navy mb-2">
                      Service of Interest
                    </label>
                    <select
                      id="service"
                      name="service"
                      className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-navy focus:border-electric focus:ring-2 focus:ring-electric/20 outline-none transition-all bg-white"
                    >
                      <option value="">Select a service</option>
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt}>                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-navy mb-2">
                      Tell us about your project *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="What are you working on? What challenges are you facing?"
                      className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-navy placeholder:text-slate-400 focus:border-electric focus:ring-2 focus:ring-electric/20 outline-none transition-all resize-y"
                    />
                  </div>
                  {status === "error" && (
                    <p className="text-red-500 text-sm">
                      Something went wrong. Please try again or email us directly at{" "}
                      <a href="mailto:hello@cloudless.gr" className="underline">
                        hello@cloudless.gr
                      </a>
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full sm:w-auto bg-electric hover:bg-electric-dark disabled:opacity-60 text-white font-semibold px-10 py-3.5 rounded-lg transition-colors"                  >
                    {status === "sending" ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-8">
              <div className="rounded-2xl bg-slate-50 p-8">
                <h3 className="font-heading font-bold text-navy text-lg">
                  What happens next?
                </h3>
                <ol className="mt-4 space-y-4 text-sm text-slate-600">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-electric text-white text-xs font-bold flex items-center justify-center">
                      1
                    </span>
                    We review your message and get back within 24 hours.
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-electric text-white text-xs font-bold flex items-center justify-center">
                      2
                    </span>
                    Free 30-minute audit call to understand your needs.
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-electric text-white text-xs font-bold flex items-center justify-center">
                      3
                    </span>
                    Custom proposal with clear scope, timeline & pricing.
                  </li>                </ol>
              </div>

              <div className="rounded-2xl border border-slate-200 p-8">
                <h3 className="font-heading font-bold text-navy text-lg">
                  Direct Contact
                </h3>
                <div className="mt-4 space-y-3 text-sm text-slate-600">
                  <p>
                    <span className="font-medium text-navy">Email:</span>{" "}
                    <a href="mailto:hello@cloudless.gr" className="text-electric hover:underline">
                      hello@cloudless.gr
                    </a>
                  </p>
                  <p>
                    <span className="font-medium text-navy">Location:</span> Greece, EU
                  </p>
                  <p>
                    <span className="font-medium text-navy">Response time:</span> Within 24 hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}