/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Only needed if your images are remote URLs. Replace with your host.
    remotePatterns: [{ protocol: "https", hostname: "images.example.com" }],
  },
};

export default nextConfig;