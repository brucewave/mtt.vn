import type { MetadataRoute } from 'next'
import { brand } from '@/lib/brand'

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
