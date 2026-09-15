/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,

  /**
   * Static HTML, not a Node server.
   *
   * Every route in this app prerenders — there are no route handlers, no
   * server actions and no revalidation — so the build can emit plain files
   * that any web server can hand out, cPanel included. `next start` is not
   * used; `npm run build` produces `out/`.
   */
  output: 'export',

  images: {
    // No optimiser behind a static export: Pexels resizes its own files.
    loader: 'custom',
    loaderFile: './lib/image-loader.ts',
    // 3840 is here for the hero: opening a hotspot pushes the photo in ~3×.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3840],
  },
}

export default nextConfig
