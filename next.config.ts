import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Removed "output: export" to enable API routes and SSR for e-store
  turbopack: {
    root: ".",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.stripe.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;