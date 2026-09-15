import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import PageHeading from '@/components/PageHeading'
import Reveal from '@/components/Reveal'
import { Testimonials } from '@/components/Sections'
import { brand, parentCompany, usps } from '@/lib/brand'
import { aboutImages, showroom, stats } from '@/lib/site-data'

export const metadata: Metadata = {
  title: `Về ${brand.name}`,
  description:
    'MtT Deco bắt đầu từ một xưởng mộc nhỏ ở Dĩ An năm 2013: tự sản xuất, tự lắp đặt, không qua trung gian. Câu chuyện, xưởng, con người và cam kết.',
  alternates: { canonical: '/gioi-thieu' },
  openGraph: {
    type: 'website',
    title: `Về ${brand.name}`,
    description: 'Tự sản xuất, tự lắp đặt, không qua trung gian.',
    url: `${brand.url}/gioi-thieu`,
    images: [{ url: aboutImages.main, alt: 'Xưởng mộc MtT Deco' }],
  },
}

/** The years that changed how the workshop works. */
const milestones = [
  { year: '2013', title: 'Xưởng mộc đầu tiên', body: 'Ba người thợ và một xưởng 120 m² ở Dĩ An, nhận đóng tủ bếp lẻ.' },
  { year: '2017', title: 'Nhận thi công trọn gói', body: 'Có tổ kiến trúc sư riêng, bắt đầu theo công trình từ bản vẽ đến bàn giao.' },
  { year: '2021', title: 'Xưởng 4.000 m²', body: 'Chuyển về KCN Sóng Thần 2, đầu tư máy CNC và buồng sơn khép kín.' },
  { year: '2024', title: 'Showroom Thảo Điền', body: 'Mở không gian mẫu để khách sờ được vật liệu thật trước khi chốt.' },
]

/** Why the pieces do not warp after a couple of damp seasons. */
const commitments = [
  {
    title: 'Gỗ nhập trực tiếp',
    body: 'Sồi và óc chó nhập từ Bắc Mỹ, tẩm sấy đạt độ ẩm 8–12% trước khi vào xưởng.',
  },
  {
    title: 'Một người chịu trách nhiệm',
    body: 'Một kiến trúc sư theo suốt công trình. Bạn không phải kể lại yêu cầu cho ba người khác nhau.',
  },
  {
    title: 'Không qua thầu phụ',
    body: 'Đội thợ của xưởng tự thi công và tự lắp đặt, nên lỗi ở đâu cũng là lỗi của chúng tôi.',
  },
]

export default function AboutPage() {
  return (
    <>
      <SiteHeader variant="solid" />

      <main className="mx-auto max-w-[1600px] px-5 pb-24 sm:px-8">
        <PageHeading
          eyebrow={`Về ${brand.name}`}
          title="Nội thất làm ra để dùng hai mươi năm,"
          accent="không phải để chụp ảnh"
          lead="MtT Deco bắt đầu từ một xưởng mộc nhỏ ở Dĩ An năm 2013. Đến nay chúng tôi vẫn giữ nguyên cách làm cũ: tự sản xuất, tự lắp đặt, không qua trung gian — nên biết chính xác từng tấm ván trong nhà bạn đến từ đâu."
          crumbs={[{ label: `Về ${brand.name}` }]}
        />

        {/* ---- Workshop ---- */}
        <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="relative">
              <Reveal className="relative aspect-4/5 overflow-hidden rounded-sm">
                <Image
                  src={aboutImages.main}
                  alt="Thợ mộc MtT Deco đang gia công chi tiết gỗ tại xưởng"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  priority
                  className="object-cover"
                />
              </Reveal>
              <Reveal
                delay={220}
                className="absolute -bottom-10 -right-6 hidden w-44 overflow-hidden rounded-sm border-4 border-paper sm:block lg:-right-10 lg:w-56"
              >
                <div className="relative aspect-square">
                  <Image
                    src={aboutImages.detail}
                    alt="Chi tiết mộng gỗ được gia công tại xưởng MtT Deco"
                    fill
                    sizes="220px"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-7 lg:pl-6">
            <div className="space-y-5 text-[15px] leading-relaxed text-steel-600">
              <Reveal delay={100}>
                <p>
                  Mỗi công trình đều do một kiến trúc sư theo từ lúc đo đạc đến lúc bàn giao. Bạn
                  không phải kể lại yêu cầu của mình cho ba người khác nhau, và cũng không phải đoán
                  xem ai đang chịu trách nhiệm khi có vấn đề.
                </p>
              </Reveal>
              <Reveal delay={160}>
                <p>
                  Gỗ sồi và óc chó nhập trực tiếp từ Bắc Mỹ, tẩm sấy đạt độ ẩm 8–12% trước khi vào
                  xưởng — đây là lý do đồ của chúng tôi không cong vênh sau vài mùa nồm.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <p>
                  Xưởng 4.000 m² tại {showroom.factory.replace('Xưởng sản xuất: ', '')} có máy CNC,
                  buồng sơn khép kín và khu tẩm sấy riêng. Khách hàng được mời tới nghiệm thu tại
                  xưởng trước khi hàng lên xe.
                </p>
              </Reveal>
            </div>

            <Reveal delay={240} className="mt-8">
              <a
                href={parentCompany.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full border border-ink-900/12 bg-paper-dim/60 py-2 pl-4 pr-3.5 text-[13px] transition-colors hover:border-flame-500"
              >
                <span className="text-steel-500">{parentCompany.label}</span>
                <span className="font-medium text-ink-900">{parentCompany.name}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-flame-500" aria-hidden>
                  <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </Reveal>

            <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-sm bg-ink-900/10 lg:grid-cols-4">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={i * 90} className="bg-paper p-5">
                  <p className="font-display text-4xl leading-none text-ink-900">
                    {s.value}
                    <span className="text-flame-600">{s.suffix}</span>
                  </p>
                  <p className="mt-3 text-[12px] leading-snug text-steel-500">{s.label}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* ---- Milestones ---- */}
        <section className="mt-28" aria-label="Chặng đường">
          <Reveal>
            <h2 className="font-display text-[clamp(1.75rem,3.2vw,2.5rem)] leading-[1.1] font-medium tracking-tight text-ink-900">
              Bốn cột mốc đổi cách chúng tôi làm
            </h2>
          </Reveal>

          <ol className="mt-10 grid gap-px overflow-hidden rounded-sm bg-ink-900/10 sm:grid-cols-2 lg:grid-cols-4">
            {milestones.map((m, i) => (
              <Reveal key={m.year} as="li" delay={i * 90} className="bg-paper p-7">
                <span className="font-display text-4xl leading-none text-flame-600">{m.year}</span>
                <h3 className="mt-5 text-[16px] font-medium text-ink-900">{m.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-steel-600">{m.body}</p>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* ---- Commitments ---- */}
        <section className="mt-24 grid gap-10 md:grid-cols-3" aria-label="Cam kết">
          {commitments.map((c, i) => (
            <Reveal key={c.title} delay={i * 90} className="border-t border-ink-900 pt-6">
              <h3 className="text-[17px] font-medium text-ink-900">{c.title}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-steel-600">{c.body}</p>
            </Reveal>
          ))}
        </section>

        <section className="mt-20 grid gap-px overflow-hidden rounded-sm bg-ink-900/10 sm:grid-cols-2 lg:grid-cols-4" aria-label="Chính sách">
          {usps.map((u, i) => (
            <Reveal key={u.title} delay={i * 80} className="bg-paper-dim/60 p-6">
              <p className="text-[14px] font-medium text-ink-900">{u.title}</p>
              <p className="mt-2 text-[12px] leading-relaxed text-steel-500">{u.note}</p>
            </Reveal>
          ))}
        </section>

        <Reveal delay={120} className="mt-16 flex flex-wrap items-center gap-6">
          <Link
            href="/lien-he"
            className="inline-flex items-center gap-3 rounded-full bg-flame-500 px-8 py-4 text-[13px] font-medium tracking-[0.12em] text-white uppercase transition-colors hover:bg-flame-600"
          >
            Ghé xưởng xem trực tiếp
          </Link>
          <Link
            href="/du-an"
            className="text-[14px] text-steel-600 underline decoration-ink-900/20 underline-offset-4 transition-colors hover:text-flame-600"
          >
            Xem dự án đã bàn giao
          </Link>
        </Reveal>
      </main>

      <Testimonials />
      <SiteFooter />
    </>
  )
}
