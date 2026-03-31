import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-navy text-slate-400">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="text-white text-lg font-heading font-bold">
              cloudless<span className="text-electric">.gr</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed">
              Clear skies. Zero friction.<br />
              Cloud architecture, serverless, data analytics &amp; AI marketing for startups and SMBs.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Navigate</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-electric transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-electric transition-colors">Services</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-electric transition-colors">Blog</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-electric transition-colors">Contact</Link>              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Get in Touch</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:hello@cloudless.gr"
                  className="hover:text-electric transition-colors"
                >
                  hello@cloudless.gr
                </a>
              </li>
              <li>Greece, EU</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-700 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p>&copy; {new Date().getFullYear()} Cloudless. All rights reserved.</p>
          <p className="font-mono text-slate-500">Built with Next.js &amp; deployed on AWS</p>
        </div>
      </div>
    </footer>
  );
}