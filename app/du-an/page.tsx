import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import PageHeading from '@/components/PageHeading'
import Reveal from '@/components/Reveal'
import { ProjectCard } from '@/components/Sections'
import { brand } from '@/lib/brand'
import { projects, showroom, stats } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Dự án đã bàn giao',
  description:
    'Ảnh chụp thực tế các công trình nội thất MtT Deco đã bàn giao — căn hộ, nhà phố, biệt thự và văn phòng, kèm phạm vi thi công và phong cách của từng dự án.',
  alternates: { canonical: '/du-an' },
  openGraph: {
    type: 'website',
    title: `Dự án đã bàn giao · ${brand.name}`,
    description: 'Ảnh chụp thực tế sau khi bàn giao, không dựng 3D.',
    url: `${brand.url}/du-an`,
    images: [{ url: projects[0].image, alt: projects[0].name }],
  },
}

/** Every distinct style in the portfolio, in the order they first appear. */
const styles = [...new Set(projects.map((p) => p.style))]

export default function ProjectsPage() {
  return (
    <>
      <SiteHeader variant="solid" />

      <main>
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          <PageHeading
            eyebrow="Dự án đã bàn giao"
            title="Những căn nhà"
            accent="đã có người ở"
            lead="Ảnh dưới đây chụp sau khi bàn giao, không phải phối cảnh 3D. Bạn có thể hẹn tới xem trực tiếp một vài công trình còn trong thời gian bảo hành — chúng tôi hỏi ý chủ nhà trước."
            crumbs={[{ label: 'Dự án' }]}
          />

          <Reveal delay={120} className="mt-10 flex flex-wrap gap-2">
            {styles.map((style) => (
              <span
                key={style}
                className="rounded-full border border-ink-900/12 px-4 py-1.5 text-[12px] text-steel-600"
              >
                {style}
              </span>
            ))}
          </Reveal>
        </div>

        <section className="mt-14 bg-ink-900 py-16 lg:py-20" aria-label="Danh sách dự án">
          <div className="mx-auto grid max-w-[1600px] gap-3 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-3">
            {projects.map((p, i) => (
              <ProjectCard key={p.name} project={p} delay={(i % 3) * 90} />
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 lg:py-24">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <h2 className="font-display text-[clamp(1.75rem,3.2vw,2.5rem)] leading-[1.1] font-medium tracking-tight text-ink-900">
                  Cách chúng tôi nhận việc
                </h2>
              </Reveal>
              <Reveal delay={90}>
                <p className="mt-5 text-[15px] leading-relaxed text-steel-600">
                  Mỗi công trình do một kiến trúc sư theo từ lúc đo đạc đến lúc bàn giao, và do đội
                  thợ của xưởng thi công — không qua thầu phụ. Vì vậy mỗi năm chúng tôi chỉ nhận một
                  số lượng dự án nhất định.
                </p>
              </Reveal>
              <Reveal delay={150} className="mt-8">
                <Link
                  href="/lien-he"
                  className="inline-flex items-center gap-3 rounded-full bg-flame-500 px-8 py-4 text-[13px] font-medium tracking-[0.12em] text-white uppercase transition-colors hover:bg-flame-600"
                >
                  Đặt lịch khảo sát
                </Link>
              </Reveal>
              <Reveal delay={210} className="mt-5">
                <a
                  href={`tel:${showroom.phone.replace(/\s/g, '')}`}
                  className="text-[14px] text-steel-600 transition-colors hover:text-flame-600"
                >
                  Hoặc gọi {showroom.phone}
                </a>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-sm bg-ink-900/10 lg:grid-cols-4">
                {stats.map((s, i) => (
                  <Reveal key={s.label} delay={i * 90} className="bg-paper p-6">
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
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
