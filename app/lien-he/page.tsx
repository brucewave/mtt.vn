import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import PageHeading from '@/components/PageHeading'
import Reveal from '@/components/Reveal'
import { ContactForm } from '@/components/Sections'
import { brand } from '@/lib/brand'
import { showroom } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Liên hệ & đặt lịch tư vấn',
  description: `Showroom ${showroom.address}. Gọi ${showroom.phone} hoặc gửi mặt bằng để nhận 2 phương án phối cảnh 3D miễn phí sau 5 ngày.`,
  alternates: { canonical: '/lien-he' },
  openGraph: {
    type: 'website',
    title: `Liên hệ · ${brand.name}`,
    description: 'Gửi mặt bằng, nhận concept sau 5 ngày. Miễn phí, không ràng buộc.',
    url: `${brand.url}/lien-he`,
  },
}

const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: `Liên hệ ${brand.name}`,
  url: `${brand.url}/lien-he`,
  mainEntity: { '@id': `${brand.url}/#store` },
}

/** The three ways people actually get in touch, in the order they prefer them. */
const channels = [
  {
    label: 'Gọi trực tiếp',
    value: showroom.phone,
    href: `tel:${showroom.phone.replace(/\s/g, '')}`,
    note: 'Nhanh nhất trong giờ mở cửa',
  },
  {
    label: 'Email',
    value: showroom.email,
    href: `mailto:${showroom.email}`,
    note: 'Gửi kèm mặt bằng hoặc ảnh hiện trạng',
  },
  {
    label: 'Ghé showroom',
    value: 'Thảo Điền, TP. Thủ Đức',
    href: '#dia-chi',
    note: 'Xem và sờ vật liệu thật',
  },
]

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <SiteHeader variant="solid" />

      <main className="mx-auto max-w-[1600px] px-5 pb-24 sm:px-8">
        <PageHeading
          eyebrow="Đặt lịch tư vấn"
          title="Gửi mặt bằng,"
          accent="nhận concept sau 5 ngày"
          lead="Miễn phí khảo sát và 2 phương án phối cảnh 3D. Không ràng buộc — nếu không hợp gu, bạn giữ lại bản vẽ."
          crumbs={[{ label: 'Liên hệ' }]}
        />

        <div className="mt-12 grid gap-px overflow-hidden rounded-sm bg-ink-900/10 sm:grid-cols-3">
          {channels.map((c, i) => (
            <Reveal key={c.label} delay={i * 90} className="bg-paper-dim/50 p-7">
              <p className="text-[11px] tracking-[0.16em] text-steel-400 uppercase">{c.label}</p>
              <a
                href={c.href}
                className="mt-3 block font-display text-[1.6rem] leading-tight text-ink-900 transition-colors hover:text-flame-600"
              >
                {c.value}
              </a>
              <p className="mt-2 text-[13px] text-steel-500">{c.note}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5" id="dia-chi">
            <Reveal>
              <h2 className="font-display text-[clamp(1.6rem,2.8vw,2.25rem)] leading-[1.1] font-medium tracking-tight text-ink-900">
                Nơi bạn có thể tìm thấy chúng tôi
              </h2>
            </Reveal>

            <div className="mt-8 space-y-6 text-[14px]">
              {[
                ['Showroom', showroom.address],
                ['Xưởng', showroom.factory],
                ['Giờ mở cửa', showroom.hours],
              ].map(([k, v], i) => (
                <Reveal key={k} delay={i * 80} className="flex gap-6 border-t border-ink-900/8 pt-5">
                  <span className="w-28 shrink-0 text-[11px] tracking-[0.16em] text-steel-400 uppercase">
                    {k}
                  </span>
                  <span className="flex-1 text-ink-800">{v}</span>
                </Reveal>
              ))}
            </div>

            <Reveal delay={260} className="mt-8">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(showroom.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 border-b border-ink-900/25 pb-2 text-[13px] tracking-[0.14em] text-ink-900 uppercase transition-colors hover:border-flame-500 hover:text-flame-600"
              >
                Mở bản đồ
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                  <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </Reveal>

            <Reveal delay={320} className="mt-10 rounded-sm bg-paper-dim/60 p-6 text-[13px] leading-relaxed text-steel-600">
              <p>
                Muốn có con số trước khi gặp? Dùng{' '}
                <Link href="/baogia" className="font-medium text-flame-600 underline underline-offset-4">
                  công cụ báo giá
                </Link>{' '}
                để tự bóc tách hạng mục, hoặc xem{' '}
                <Link href="/quy-trinh" className="font-medium text-flame-600 underline underline-offset-4">
                  quy trình sáu bước
                </Link>{' '}
                để biết mỗi giai đoạn mất bao lâu.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  )
}
