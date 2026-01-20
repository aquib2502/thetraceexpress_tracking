/** @type {import('next').NextConfig} */
const nextConfig = {
  // Recommended for Docker and production deployments
  output: "standalone",

  reactStrictMode: true,

  // Allow images if you use <Image />
  images: {
    unoptimized: true,
  },

  // Disable experimental telemetry in build logs
  telemetry: false,

  // Production optimizations
  compress: true,

  eslint: {
    // Do not block production builds on lint errors
    ignoreDuringBuilds: true,
  },

  typescript: {
    // Do not block production builds on type errors
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
