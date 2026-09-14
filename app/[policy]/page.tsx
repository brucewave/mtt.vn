import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import PageHeading from '@/components/PageHeading'
import { brand } from '@/lib/brand'
import { showroom } from '@/lib/site-data'
import { getPolicy, policies } from '@/lib/policies'

export const dynamicParams = false

export function generateStaticParams() {
  return policies.map((p) => ({ policy: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ policy: string }>
}): Promise<Metadata> {
  const { policy } = await params
  const found = getPolicy(policy)

  if (!found) return {}

  return {
    title: found.title,
    description: found.lead,
    alternates: { canonical: `/${found.slug}` },
    openGraph: {
      type: 'article',
      title: `${found.title} · ${brand.name}`,
      description: found.lead,
      url: `${brand.url}/${found.slug}`,
    },
  }
}

export default async function PolicyPage({ params }: { params: Promise<{ policy: string }> }) {
  const { policy } = await params
  const found = getPolicy(policy)

  if (!found) notFound()

  const others = policies.filter((p) => p.slug !== found.slug)

  return (
    <>
      <SiteHeader variant="solid" />

      <main className="mx-auto max-w-[1600px] px-5 pb-24 sm:px-8">
        <PageHeading
          eyebrow="Chính sách"
          title={found.title}
          lead={found.lead}
          crumbs={[{ label: found.title }]}
        />

        <div className="mt-14 grid gap-14 lg:grid-cols-12">
          <div className="article lg:col-span-8">
            <ul>
              {found.body.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>

            <div className="article-note">
              <p className="article-note-title">Cần hỗ trợ</p>
              <p>
                Gọi{' '}
                <a
                  href={`tel:${showroom.phone.replace(/\s/g, '')}`}
                  className="font-medium text-flame-700 underline underline-offset-4"
                >
                  {showroom.phone}
                </a>{' '}
                hoặc gửi email tới{' '}
                <a
                  href={`mailto:${showroom.email}`}
                  className="font-medium text-flame-700 underline underline-offset-4"
                >
                  {showroom.email}
                </a>
                . Showroom mở cửa {showroom.hours.toLowerCase()}.
              </p>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <h2 className="text-[11px] tracking-[0.2em] text-flame-600 uppercase">
              Các chính sách khác
            </h2>
            <ul className="mt-5 space-y-1 border-t border-ink-900/10">
              {others.map((p) => (
                <li key={p.slug} className="border-b border-ink-900/10">
                  <Link
                    href={`/${p.slug}`}
                    className="block py-4 text-[15px] text-ink-900 transition-colors hover:text-flame-600"
                  >
                    {p.title}
                    <span className="mt-1 block text-[13px] text-steel-500">{p.lead}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </main>

      <SiteFooter />
    </>
  )
}
