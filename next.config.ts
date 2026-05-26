import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // @ts-ignore - turbopack might not be fully typed in the installed type definitions
  turbopack: {
    root: path.resolve(process.cwd()),
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
