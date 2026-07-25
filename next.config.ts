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
};

export default nextConfig;
