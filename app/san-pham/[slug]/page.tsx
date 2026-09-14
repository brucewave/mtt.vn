import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import ProductMedia from '@/components/ProductMedia'
import ProductBuyBox from '@/components/ProductBuyBox'
import AddToCartButton from '@/components/AddToCartButton'
import Reveal from '@/components/Reveal'
import { brand } from '@/lib/brand'
import { showroom } from '@/lib/site-data'
import { catalog, formatVnd, getItemBySlug, relatedItems } from '@/lib/catalog'

export const dynamicParams = false

export function generateStaticParams() {
  return catalog.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const item = getItemBySlug(slug)

  if (!item) return {}

  const description = `${item.blurb} ${item.material}, ${item.size}. Giá ${formatVnd(item.price)} đã gồm VAT.`

  return {
    title: item.name,
    description,
    alternates: { canonical: `/san-pham/${item.slug}` },
    openGraph: {
      type: 'website',
      title: `${item.name} · ${brand.name}`,
      description,
      url: `${brand.url}/san-pham/${item.slug}`,
      images: [{ url: item.media.src, alt: item.name }],
    },
  }
}

/** One line of the specification table. */
function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap justify-between gap-4 border-b border-ink-900/8 py-3.5">
      <dt className="text-[13px] text-steel-500">{label}</dt>
      <dd className="text-right text-[14px] font-medium text-ink-900">{value}</dd>
    </div>
  )
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = getItemBySlug(slug)

  if (!item) notFound()

  const related = relatedItems(item, 4)
  const saving = item.compareAt ? item.compareAt - item.price : 0

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        '@id': `${brand.url}/san-pham/${item.slug}/#product`,
        name: item.name,
        description: item.blurb,
        sku: item.sku,
        image: item.media.src,
        category: item.category,
        material: item.material,
        brand: { '@type': 'Brand', name: brand.name },
        offers: {
          '@type': 'Offer',
          url: `${brand.url}/san-pham/${item.slug}`,
          priceCurrency: 'VND',
          price: item.price,
          availability: item.limited
            ? 'https://schema.org/LimitedAvailability'
            : 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/NewCondition',
          seller: { '@id': `${brand.url}/#store` },
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: brand.url },
          { '@type': 'ListItem', position: 2, name: 'Sản phẩm', item: `${brand.url}/san-pham` },
          {
            '@type': 'ListItem',
            position: 3,
            name: item.name,
            item: `${brand.url}/san-pham/${item.slug}`,
          },
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <SiteHeader variant="solid" />

      <main className="mx-auto max-w-[1600px] px-5 pb-24 sm:px-8">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 pt-28 text-[12px] sm:pt-32"
        >
          <Link href="/" className="text-steel-500 transition-colors hover:text-flame-600">
            Trang chủ
          </Link>
          <span className="text-steel-300">/</span>
          <Link href="/san-pham" className="text-steel-500 transition-colors hover:text-flame-600">
            Sản phẩm
          </Link>
          <span className="text-steel-300">/</span>
          <Link
            href={`/san-pham?cat=${item.categoryId}`}
            className="text-steel-500 transition-colors hover:text-flame-600"
          >
            {item.category}
          </Link>
          <span className="text-steel-300">/</span>
          <span className="text-ink-900">{item.name}</span>
        </nav>

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* ---- The picture ---- */}
          <div className="lg:col-span-7">
            <div className="relative aspect-4/3 overflow-hidden rounded-sm bg-paper-dim">
              <ProductMedia
                item={item}
                aspect={3 / 4}
                sizes="(max-width: 1024px) 100vw, 58vw"
                priority
              />
              {item.badge && (
                <span className="absolute top-5 left-5 rounded-full bg-ink-900/85 px-4 py-1.5 text-[11px] tracking-[0.14em] text-white uppercase backdrop-blur">
                  {item.badge}
                </span>
              )}
            </div>

            <p className="mt-4 text-[12px] text-steel-500">
              Ảnh chụp thực tế tại công trình đã bàn giao · {item.room}
            </p>
          </div>

          {/* ---- The buy column ---- */}
          <div className="lg:col-span-5">
            {item.limited && (
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-flame-500/30 bg-flame-50 px-4 py-1.5 text-[11px] tracking-[0.14em] text-flame-700 uppercase">
                Hàng độc bản
                {item.limitedNote && <span className="normal-case tracking-normal">· {item.limitedNote}</span>}
              </p>
            )}

            <p className="eyebrow text-flame-600">{item.category}</p>
            <h1 className="mt-3 font-display text-[clamp(2rem,3.6vw,3rem)] leading-[1.08] font-medium tracking-tight text-ink-900">
              {item.name}
            </h1>

            <p className="mt-5 text-[15px] leading-relaxed text-steel-600">{item.blurb}</p>

            <div className="mt-7 flex flex-wrap items-baseline gap-3">
              <span className="text-[2rem] font-semibold text-ink-900">{formatVnd(item.price)}</span>
              {item.compareAt && (
                <>
                  <span className="text-[16px] text-steel-400 line-through">
                    {formatVnd(item.compareAt)}
                  </span>
                  <span className="rounded-full bg-flame-50 px-3 py-1 text-[12px] font-medium text-flame-700">
                    Tiết kiệm {formatVnd(saving)}
                  </span>
                </>
              )}
            </div>
            <p className="mt-2 text-[13px] text-steel-500">
              Đã gồm VAT · Miễn phí giao lắp trong bán kính 30km cho đơn từ 20 triệu
            </p>

            <ProductBuyBox item={item} />

            {/* ---- Specifications ---- */}
            <dl className="mt-10 border-t border-ink-900">
              <Spec label="Mã sản phẩm" value={item.sku} />
              <Spec label="Chất liệu" value={item.material} />
              <Spec label="Kích thước" value={item.size} />
              <Spec label="Hoàn thiện" value={item.finish} />
              <Spec label="Không gian" value={item.room} />
            </dl>

            {item.colors.length > 0 && (
              <div className="mt-6 flex items-center gap-4">
                <span className="text-[13px] text-steel-500">Tuỳ chọn màu</span>
                <div className="flex gap-2">
                  {item.colors.map((c) => (
                    <span
                      key={c}
                      title={c}
                      style={{ backgroundColor: c }}
                      className="h-7 w-7 rounded-full border border-ink-900/10"
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 grid gap-3 rounded-sm bg-paper-dim/60 p-6 text-[13px] leading-relaxed text-steel-600">
              <p>
                <strong className="font-medium text-ink-900">Đóng theo kích thước riêng:</strong> gửi
                bản vẽ hoặc số đo thật, xưởng báo giá lại trong 24 giờ.
              </p>
              <p>
                <strong className="font-medium text-ink-900">Bảo hành:</strong> khung gỗ 5 năm, phụ
                kiện kim khí 2 năm.
              </p>
              <p>
                Cần tư vấn nhanh?{' '}
                <a
                  href={`tel:${showroom.phone.replace(/\s/g, '')}`}
                  className="font-medium text-flame-600 underline underline-offset-4"
                >
                  {showroom.phone}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* ---- Related ---- */}
        {related.length > 0 && (
          <section className="mt-24 border-t border-ink-900/10 pt-14" aria-label="Sản phẩm liên quan">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-[clamp(1.6rem,3vw,2.25rem)] font-medium tracking-tight text-ink-900">
                Có thể bạn cũng thích
              </h2>
              <Link
                href={`/san-pham?cat=${item.categoryId}`}
                className="text-[13px] tracking-[0.12em] text-flame-600 uppercase transition-colors hover:text-flame-700"
              >
                Xem cả {item.category.toLowerCase()}
              </Link>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((r, i) => (
                <Reveal key={r.id} delay={i * 70} className="group">
                  <Link
                    href={`/san-pham/${r.slug}`}
                    className="relative block aspect-4/3 overflow-hidden rounded-sm bg-paper-dim"
                  >
                    <span className="absolute inset-0 block transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]">
                      <ProductMedia
                        item={r}
                        aspect={3 / 4}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 24vw"
                      />
                    </span>
                  </Link>

                  <h3 className="mt-4 font-display text-[1.15rem] leading-snug text-ink-900">
                    <Link href={`/san-pham/${r.slug}`} className="transition-colors group-hover:text-flame-600">
                      {r.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-[12px] text-steel-500">{r.material}</p>

                  <div className="mt-3 flex items-center justify-between gap-3">
                    <span className="text-[15px] font-semibold text-ink-900">
                      {formatVnd(r.price)}
                    </span>
                    <AddToCartButton
                      id={r.id}
                      label="Thêm"
                      doneLabel="✓"
                      className="rounded-full border border-ink-900/20 px-4 py-1.5 text-[12px] text-ink-900 transition-colors hover:border-flame-500 hover:bg-flame-500 hover:text-white"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </main>

      <SiteFooter />
    </>
  )
}
