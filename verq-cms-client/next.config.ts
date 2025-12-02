import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep all your existing config
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },

  // THIS IS THE FIX — Replace webpack with turbopack rules
  turbopack: {
    rules: {
      "*.{glsl,vs,fs,vert,frag}": {
        loaders: ["raw-loader"],
        as: "*.js",
      },
    },
  },

  // Optional: Silence the warning if you want (not needed)
  // turbopack: { ...above... },
};

export default nextConfig;