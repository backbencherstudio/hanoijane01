import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://10.10.9.51:5000/api/:path*",
      },
    ];
  },
  allowedDevOrigins: ["http://10.10.9.45:3000"],
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "10.10.9.51",
        port: "9000",
        pathname: "/hanoijane/**",
      },
    ],
  },
};

export default nextConfig;
