import type { MetadataRoute } from 'next'
import { brand } from '@/lib/brand'

/**
 * A static export emits this as a plain file at build time rather than
 * answering a request for it, which is exactly what we want here — the
 * contents never depend on who is asking.
 */
export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // One visitor's cart and one salesperson's quote sheet; nothing to index.
      disallow: ['/gio-hang', '/thanh-toan', '/baogia'],
    },
    sitemap: `${brand.url}/sitemap.xml`,
  }
}
