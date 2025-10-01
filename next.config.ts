import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/cart',
        destination: 'http://localhost:3001/cart',
      },
      {
        source: '/cart/:path*',
        destination: 'http://localhost:3001/cart/:path*',
      },
      {
        source: '/cart-static/:path*',
        destination: 'http://localhost:3001/cart-static/:path*',
      },
    ]
  },
};

export default nextConfig;
