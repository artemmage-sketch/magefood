import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        // Привʼязка домену до застосунку Mage Food: посилання QR-меню (/m/…) відкриваються одразу в застосунку
        { source: "/.well-known/apple-app-site-association", destination: "/api/aasa" },
        { source: "/apple-app-site-association", destination: "/api/aasa" },
        { source: "/.well-known/assetlinks.json", destination: "/api/assetlinks" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
