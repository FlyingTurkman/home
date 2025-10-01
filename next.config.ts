import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  env: {
    cartDomain: process.env.cartDomain
  },
  async rewrites() {
    return [
      {
        source: '/cart',
        destination: `${process.env.cartDomain}/cart`,
      },
      {
        source: '/cart/:path*',
        destination: `${process.env.cartDomain}/cart/:path*`,
      },
      {
        source: '/cart-static/:path*',
        destination: `${process.env.cartDomain}/cart-static/:path*`,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/api/cartApi/:path*',
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Token" }
        ]
      }
    ]
  }
};

export default nextConfig;
