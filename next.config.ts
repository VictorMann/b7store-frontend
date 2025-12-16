import type { NextConfig } from "next";
import { hostname } from "os";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost'
      }
    ]
  }
};

export default nextConfig;
