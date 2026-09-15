import type { MetadataRoute } from 'next'
import { brand } from '@/lib/brand'
import { catalog } from '@/lib/catalog'
import { policies } from '@/lib/policies'
import { sortedPosts } from '@/lib/blog'

/**
 * Every URL worth indexing.
 *
 * The quote builder (`/baogia`), the cart and the checkout are left out
 * deliberately — they are tools for one visitor, not pages with an audience.
 */
/**
 * A static export emits this as a plain file at build time rather than
 * answering a request for it, which is exactly what we want here — the
 * contents never depend on who is asking.
 */
export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    { url: brand.url, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${brand.url}/san-pham`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${brand.url}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${brand.url}/du-an`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${brand.url}/quy-trinh`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${brand.url}/gioi-thieu`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${brand.url}/lien-he`, lastModified: now, changeFrequency: 'yearly', priority: 0.8 },
    ...catalog.map((item) => ({
      url: `${brand.url}/san-pham/${item.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...sortedPosts.map((post) => ({
      url: `${brand.url}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
    ...policies.map((policy) => ({
      url: `${brand.url}/${policy.slug}`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    })),
  ]
}
