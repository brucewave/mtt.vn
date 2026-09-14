import type { Metadata, Viewport } from 'next'
import { Be_Vietnam_Pro, Michroma, Playfair_Display } from 'next/font/google'
import { CartProvider } from '@/lib/cart'
import SmoothScroll from '@/components/SmoothScroll'
import { brand } from '@/lib/brand'
import { showroom } from '@/lib/site-data'
import './globals.css'

const beVietnam = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-be-vietnam',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600'],
  variable: '--font-playfair',
  display: 'swap',
})

const michroma = Michroma({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-michroma',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: {
    default: `${brand.name} — ${brand.tagline}`,
    template: `%s · ${brand.name}`,
  },
  description: brand.description,
  keywords: [
    'nội thất',
    'thiết kế nội thất',
    'thi công nội thất trọn gói',
    'nội thất căn hộ',
    brand.name,
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    siteName: brand.name,
    url: brand.url,
    title: `${brand.name} — ${brand.tagline}`,
    description:
      'Khám phá không gian mẫu tương tác: nhấn vào từng món nội thất để xem giá, chất liệu và kích thước thật.',
    images: [{ url: brand.logo, width: 503, height: 139, alt: brand.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${brand.name} — ${brand.tagline}`,
    description: brand.description,
    images: [brand.logo],
  },
  robots: { index: true, follow: true },
}

/**
 * The store itself, declared once at the root so every page inherits it.
 * Product and Article pages add their own node; search engines merge them by
 * the shared `@id`.
 */
const storeSchema = {
  '@context': 'https://schema.org',
  '@type': 'FurnitureStore',
  '@id': `${brand.url}/#store`,
  name: brand.name,
  legalName: brand.legal,
  description: brand.description,
  url: brand.url,
  logo: `${brand.url}${brand.logo}`,
  image: `${brand.url}${brand.logo}`,
  telephone: showroom.phone,
  email: showroom.email,
  address: { '@type': 'PostalAddress', streetAddress: showroom.address, addressCountry: 'VN' },
  priceRange: '₫₫',
  openingHours: 'Mo-Su 08:00-20:00',
  areaServed: 'VN',
}

export const viewport: Viewport = {
  themeColor: '#0b0b0c',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="vi"
      className={`${beVietnam.variable} ${playfair.variable} ${michroma.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(storeSchema) }}
        />
        <SmoothScroll />
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
