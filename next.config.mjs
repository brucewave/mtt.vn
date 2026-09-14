/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.pexels.com', pathname: '/**' },
    ],
    formats: ['image/avif', 'image/webp'],
    // The hero passes quality={80}; unlisted values are silently clamped to 75.
    qualities: [75, 80],
    // 3840 is here for the hero: opening a hotspot pushes the photo in ~3×.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3840],
  },
}

export default nextConfig
