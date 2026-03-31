"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <nav className="mx-auto max-w-6xl px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <CloudIcon />
          <span className="text-xl font-heading font-bold text-navy tracking-tight">
            cloudless<span className="text-electric">.gr</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-electric transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="bg-electric hover:bg-electric-dark text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
          >
            Get a Free Audit
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 text-navy"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          ) : (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>
      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white border-t border-slate-200 px-6 overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-64 py-4 opacity-100" : "max-h-0 py-0 opacity-0"
        }`}
      >
        <div className="space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-sm font-medium text-slate-600 hover:text-electric py-2"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="block bg-electric text-white text-sm font-semibold px-5 py-2.5 rounded-lg text-center mt-2"
            onClick={() => setMobileOpen(false)}
          >
            Get a Free Audit
          </Link>
        </div>
      </div>
    </header>
  );
}

function CloudIcon() {
  return (
    <svg      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 24h16a6 6 0 001.2-11.876A8 8 0 009.126 14.29 5 5 0 008 24z"
        fill="#3B82F6"
        opacity="0.15"
      />
      <path
        d="M8 24h16a6 6 0 001.2-11.876A8 8 0 009.126 14.29 5 5 0 008 24z"
        stroke="#3B82F6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}