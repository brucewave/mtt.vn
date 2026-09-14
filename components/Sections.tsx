import Image from 'next/image'
import Link from 'next/link'
import Reveal from './Reveal'
import AddToCartButton from './AddToCartButton'
import ProductMedia from './ProductMedia'
import {
  aboutImages,
  categories,
  processSteps,
  projects,
  showroom,
  stats,
  testimonials,
} from '@/lib/site-data'
import { catalog, formatVnd, oneOffItems } from '@/lib/catalog'
import { oneOff, parentCompany } from '@/lib/brand'

/** The eight catalogue pieces that have a dedicated product photo. */
const featured = catalog.filter((i) => i.id.startsWith('st-'))

/* ------------------------------------------------------------------ */
/* Shared bits                                                         */
/* ------------------------------------------------------------------ */

function SectionHead({
  eyebrow,
  title,
  accent,
  lead,
  align = 'left',
  action,
}: {
  eyebrow: string
  title: string
  accent?: string
  lead?: string
  align?: 'left' | 'center'
  action?: { label: string; href: string }
}) {
  return (
    <div
      className={`flex flex-col gap-6 ${
        align === 'center'
          ? 'items-center text-center'
          : 'md:flex-row md:items-end md:justify-between'
      }`}
    >
      <div className={align === 'center' ? 'max-w-2xl' : 'max-w-2xl'}>
        <Reveal>
          <p className="eyebrow flex items-center gap-3 text-flame-600">
            <span className="h-px w-8 bg-flame-500" />
            {eyebrow}
          </p>
        </Reveal>
        <Reveal delay={80}>
          {/* The accent is its own line rather than an inline run: inline it
              wraps wherever the column happens to end. */}
          <h2 className="mt-4 font-display text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.08] font-medium tracking-tight text-balance text-ink-900">
            <span className="block">{title}</span>
            {accent && <em className="block not-italic text-flame-600">{accent}</em>}
          </h2>
        </Reveal>
        {lead && (
          <Reveal delay={140}>
            <p className="mt-5 text-[15px] leading-relaxed text-steel-600">{lead}</p>
          </Reveal>
        )}
      </div>
      {action && (
        <Reveal delay={200} className="shrink-0">
          <a
            href={action.href}
            className="group inline-flex items-center gap-3 border-b border-ink-900/25 pb-2 text-[13px] tracking-[0.14em] text-ink-900 uppercase transition-colors hover:border-flame-500 hover:text-flame-600"
          >
            {action.label}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </Reveal>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Marquee                                                             */
/* ------------------------------------------------------------------ */

export function Marquee() {
  const items = [
    'Thiết kế 3D miễn phí',
    'Xưởng sản xuất 4.000 m²',
    'Bảo hành khung gỗ 5 năm',
    'Gỗ sồi & óc chó nhập khẩu',
    'Báo giá bóc tách minh bạch',
    'Giao lắp toàn quốc',
  ]
  const row = [...items, ...items]

  return (
    <div className="overflow-hidden border-y border-ink-900/8 bg-ink-900 py-4 text-white">
      <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap will-change-transform">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 text-[12px] tracking-[0.22em] uppercase">
            <span className="text-white/80">{t}</span>
            <span className="h-1.5 w-1.5 rotate-45 bg-flame-500" />
          </span>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export function AboutSection() {
  return (
    <section id="gioi-thieu" className="mx-auto max-w-[1600px] px-5 py-24 sm:px-8 lg:py-32">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="relative">
            <Reveal className="relative aspect-4/5 overflow-hidden rounded-sm">
              <Image
                src={aboutImages.main}
                alt="Thợ mộc MtT Deco đang gia công chi tiết gỗ tại xưởng"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
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
          <SectionHead
            eyebrow="Về MtT Deco"
            title="Nội thất làm ra để dùng hai mươi năm,"
            accent="không phải để chụp ảnh"
            lead="MtT Deco bắt đầu từ một xưởng mộc nhỏ ở Dĩ An năm 2013. Đến nay chúng tôi vẫn giữ nguyên cách làm cũ: tự sản xuất, tự lắp đặt, không qua trung gian — nên biết chính xác từng tấm ván trong nhà bạn đến từ đâu."
          />

          <div className="mt-10 space-y-5 text-[15px] leading-relaxed text-steel-600">
            <Reveal delay={100}>
              <p>
                Mỗi công trình đều do một kiến trúc sư theo từ lúc đo đạc đến lúc bàn giao. Bạn không
                phải kể lại yêu cầu của mình cho ba người khác nhau, và cũng không phải đoán xem ai
                đang chịu trách nhiệm khi có vấn đề.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <p>
                Gỗ sồi và óc chó nhập trực tiếp từ Bắc Mỹ, tẩm sấy đạt độ ẩm 8–12% trước khi vào
                xưởng — đây là lý do đồ của chúng tôi không cong vênh sau vài mùa nồm.
              </p>
            </Reveal>
          </div>

          <Reveal delay={220} className="mt-8">
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
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Categories                                                          */
/* ------------------------------------------------------------------ */

export function CategoryGrid() {
  return (
    <section id="danh-muc" className="bg-paper-dim/60 py-24 lg:py-32">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <SectionHead
          eyebrow="Danh mục"
          title="Chọn theo"
          accent="không gian"
          lead="641 sản phẩm đang có sẵn mẫu tại showroom Thảo Điền. Mọi món đều nhận đóng theo kích thước thật của nhà bạn."
          action={{ label: 'Xem toàn bộ sản phẩm', href: '/san-pham' }}
        />

        <div className="mt-14 grid auto-rows-[220px] grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c, i) => (
            <Reveal
              key={c.name}
              delay={i * 70}
              className={`group relative overflow-hidden rounded-sm ${c.span}`}
            >
              <a href={c.href} className="absolute inset-0 block">
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/20 to-transparent transition-opacity duration-500 group-hover:from-ink-900/90" />
                <span className="absolute inset-x-0 bottom-0 p-5">
                  <span className="flex items-end justify-between gap-3">
                    <span>
                      <span className="block font-display text-2xl text-white">{c.name}</span>
                      <span className="mt-1 block text-[12px] text-white/65">{c.blurb}</span>
                    </span>
                    <span className="shrink-0 rounded-full border border-white/30 px-2.5 py-1 text-[11px] text-white/80">
                      {c.count}
                    </span>
                  </span>
                  <span className="mt-4 flex items-center gap-2 text-[11px] tracking-[0.18em] text-flame-400 uppercase opacity-0 transition-all duration-400 group-hover:opacity-100">
                    Khám phá
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Featured products                                                   */
/* ------------------------------------------------------------------ */

export function FeaturedProducts() {
  return (
    <section className="mx-auto max-w-[1600px] px-5 py-24 sm:px-8 lg:py-32">
      <SectionHead
        eyebrow="Sản phẩm nổi bật"
        title="Đang được đặt"
        accent="nhiều nhất"
        lead="Giá niêm yết đã gồm VAT, vận chuyển và lắp đặt trong bán kính 30km từ showroom."
        action={{ label: 'Xem tất cả sản phẩm', href: '/san-pham' }}
      />

      <div className="mt-14 grid grid-cols-2 gap-x-3 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
        {featured.map((p, i) => (
          <Reveal key={p.id} delay={(i % 4) * 80} className="group">
            <Link href="/san-pham" className="block">
              <div className="relative aspect-3/4 overflow-hidden rounded-sm bg-paper-dim">
                <div className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]">
                  <ProductMedia item={p} aspect={4 / 3} sizes="(max-width: 1024px) 50vw, 24vw" />
                </div>
                {p.badge && (
                  <span className="absolute left-3 top-3 rounded-full bg-flame-500 px-3 py-1 text-[10px] font-medium tracking-[0.14em] text-white uppercase">
                    {p.badge}
                  </span>
                )}
                <AddToCartButton
                  id={p.id}
                  className="absolute inset-x-3 bottom-3 translate-y-3 rounded-full bg-white/95 py-2.5 text-center text-[12px] font-medium tracking-[0.12em] text-ink-900 uppercase opacity-0 backdrop-blur transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100"
                />
              </div>

              <div className="mt-4 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[11px] tracking-[0.16em] text-steel-400 uppercase">{p.category}</p>
                  <h3 className="mt-1.5 truncate text-[15px] font-medium text-ink-900">{p.name}</h3>
                </div>
                <div className="flex shrink-0 gap-1 pt-5">
                  {p.colors.map((c) => (
                    <span
                      key={c}
                      className="h-3 w-3 rounded-full ring-1 ring-ink-900/15"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-[15px] font-semibold text-ink-900">{formatVnd(p.price)}</span>
                {p.compareAt && (
                  <span className="text-[13px] text-steel-400 line-through">{formatVnd(p.compareAt)}</span>
                )}
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export function ProjectsSection() {
  return (
    <section id="du-an" className="bg-ink-900 py-24 text-white lg:py-32">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <p className="eyebrow flex items-center gap-3 text-flame-400">
                <span className="h-px w-8 bg-flame-500" />
                Dự án đã bàn giao
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-4 font-display text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.05] font-medium tracking-tight">
                Những căn nhà <em className="not-italic text-flame-400">đã có người ở</em>
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-5 text-[15px] leading-relaxed text-white/60">
                Ảnh chụp thực tế sau khi bàn giao, không dựng 3D. Bạn có thể hẹn tới xem trực tiếp
                một vài công trình còn trong thời gian bảo hành.
              </p>
            </Reveal>
          </div>
          <Reveal delay={200} className="shrink-0">
            <a
              href="#lien-he"
              className="group inline-flex items-center gap-3 border-b border-white/25 pb-2 text-[13px] tracking-[0.14em] uppercase transition-colors hover:border-flame-500 hover:text-flame-400"
            >
              Xem hồ sơ năng lực
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={(i % 3) * 90} className="group relative overflow-hidden rounded-sm">
              <div className="relative aspect-4/3">
                <Image
                  src={p.image}
                  alt={`${p.name} — ${p.scope}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/25 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="flex items-center gap-2 text-[11px] tracking-[0.16em] text-white/55 uppercase">
                  <span>{p.year}</span>
                  <span className="h-1 w-1 rounded-full bg-flame-500" />
                  <span>{p.style}</span>
                </div>
                <h3 className="mt-2 font-display text-xl text-white">{p.name}</h3>
                <p className="mt-1 text-[13px] text-white/60">{p.scope}</p>
              </div>
              <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/30 text-white opacity-0 transition-all duration-400 group-hover:opacity-100">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Process                                                             */
/* ------------------------------------------------------------------ */

export function ProcessSection() {
  return (
    <section id="quy-trinh" className="mx-auto max-w-[1600px] px-5 py-24 sm:px-8 lg:py-32">
      <SectionHead
        eyebrow="Quy trình"
        title="Sáu bước, tổng cộng"
        accent="35–50 ngày"
        lead="Mốc thời gian dưới đây được ghi thẳng vào hợp đồng. Chậm tiến độ do lỗi của chúng tôi, chúng tôi chịu phạt."
      />

      <div className="mt-14 grid gap-px overflow-hidden rounded-sm bg-ink-900/10 sm:grid-cols-2 lg:grid-cols-3">
        {processSteps.map((s, i) => (
          <Reveal
            key={s.no}
            delay={(i % 3) * 90}
            className="group relative bg-paper p-7 transition-colors duration-500 hover:bg-ink-900"
          >
            <div className="flex items-baseline justify-between">
              <span className="font-display text-5xl leading-none text-ink-900/12 transition-colors duration-500 group-hover:text-flame-500/60">
                {s.no}
              </span>
              <span className="rounded-full border border-ink-900/12 px-3 py-1 text-[11px] tracking-wide text-steel-500 transition-colors duration-500 group-hover:border-white/25 group-hover:text-white/70">
                {s.time}
              </span>
            </div>
            <h3 className="mt-6 text-lg font-medium text-ink-900 transition-colors duration-500 group-hover:text-white">
              {s.title}
            </h3>
            <p className="mt-3 text-[14px] leading-relaxed text-steel-600 transition-colors duration-500 group-hover:text-white/65">
              {s.body}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Testimonials                                                        */
/* ------------------------------------------------------------------ */

export function Testimonials() {
  return (
    <section className="bg-paper-dim/60 py-24 lg:py-32">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <SectionHead
          eyebrow="Khách hàng nói gì"
          title="Nhận xét từ những người"
          accent="đã ở trong đó"
          align="center"
        />

        <div className="mt-14 grid gap-3 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal
              key={t.name}
              delay={(i % 2) * 100}
              className="flex flex-col justify-between rounded-sm border border-ink-900/8 bg-paper p-7"
            >
              <div>
                <svg width="30" height="24" viewBox="0 0 30 24" className="text-flame-500/25" fill="currentColor">
                  <path d="M0 24V13.2C0 5.9 4.3 1.1 12 0v4.9C7.8 5.9 5.7 8.2 5.7 11.4h5.1V24H0Zm18.5 0V13.2c0-7.3 4.3-12.1 12-13.2v4.9c-4.2 1-6.3 3.3-6.3 6.5h5.1V24H18.5Z" />
                </svg>
                <p className="mt-5 text-[15px] leading-relaxed text-ink-800">{t.quote}</p>
              </div>
              <div className="mt-7 flex items-center gap-4 border-t border-ink-900/8 pt-5">
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
                  <Image src={t.avatar} alt={t.name} fill sizes="44px" className="object-cover" />
                </div>
                <div>
                  <p className="text-[14px] font-medium text-ink-900">{t.name}</p>
                  <p className="text-[12px] text-steel-500">{t.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

export function ContactSection() {
  const inputCls =
    'w-full border-b border-ink-900/15 bg-transparent py-3 text-[15px] text-ink-900 outline-none transition-colors placeholder:text-steel-400 focus:border-flame-500'

  return (
    <section id="lien-he" className="mx-auto max-w-[1600px] px-5 py-24 sm:px-8 lg:py-32">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <SectionHead
            eyebrow="Đặt lịch tư vấn"
            title="Gửi mặt bằng,"
            accent="nhận concept sau 5 ngày"
            lead="Miễn phí khảo sát và 2 phương án phối cảnh 3D. Không ràng buộc — nếu không hợp gu, bạn giữ lại bản vẽ."
          />

          <div className="mt-12 space-y-6 text-[14px]">
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
            <Reveal delay={260} className="flex flex-wrap gap-6 border-t border-ink-900/8 pt-6">
              <a
                href={`tel:${showroom.phone.replace(/\s/g, '')}`}
                className="font-display text-3xl text-ink-900 transition-colors hover:text-flame-600"
              >
                {showroom.phone}
              </a>
              <a
                href={`mailto:${showroom.email}`}
                className="self-end text-[14px] text-steel-600 underline decoration-ink-900/20 underline-offset-4 transition-colors hover:text-flame-600"
              >
                {showroom.email}
              </a>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={120} className="rounded-sm border border-ink-900/8 bg-paper-dim/50 p-7 sm:p-10">
            <form className="grid gap-7 sm:grid-cols-2">
              <label className="block">
                <span className="text-[11px] tracking-[0.16em] text-steel-500 uppercase">Họ và tên</span>
                <input className={inputCls} name="name" placeholder="Nguyễn Văn A" required />
              </label>
              <label className="block">
                <span className="text-[11px] tracking-[0.16em] text-steel-500 uppercase">Số điện thoại</span>
                <input className={inputCls} name="phone" type="tel" placeholder="0909 000 000" required />
              </label>
              <label className="block">
                <span className="text-[11px] tracking-[0.16em] text-steel-500 uppercase">Loại hình</span>
                <select className={`${inputCls} appearance-none`} name="type" defaultValue="canho">
                  <option value="canho">Căn hộ</option>
                  <option value="nhapho">Nhà phố</option>
                  <option value="villa">Biệt thự</option>
                  <option value="vanphong">Văn phòng</option>
                  <option value="khac">Khác</option>
                </select>
              </label>
              <label className="block">
                <span className="text-[11px] tracking-[0.16em] text-steel-500 uppercase">Diện tích (m²)</span>
                <input className={inputCls} name="area" type="number" min={10} placeholder="78" />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-[11px] tracking-[0.16em] text-steel-500 uppercase">
                  Ngân sách dự kiến
                </span>
                <select className={`${inputCls} appearance-none`} name="budget" defaultValue="300-600">
                  <option value="duoi-300">Dưới 300 triệu</option>
                  <option value="300-600">300 – 600 triệu</option>
                  <option value="600-1000">600 triệu – 1 tỷ</option>
                  <option value="tren-1000">Trên 1 tỷ</option>
                </select>
              </label>
              <label className="block sm:col-span-2">
                <span className="text-[11px] tracking-[0.16em] text-steel-500 uppercase">
                  Mô tả mong muốn
                </span>
                <textarea
                  className={`${inputCls} min-h-24 resize-y`}
                  name="message"
                  placeholder="Nhà 2 phòng ngủ, thích tông gỗ sáng, cần nhiều chỗ cất đồ…"
                />
              </label>

              <div className="sm:col-span-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-xs text-[12px] leading-relaxed text-steel-500">
                  Chúng tôi gọi lại trong vòng 4 giờ làm việc. Thông tin của bạn không được chia sẻ
                  cho bên thứ ba.
                </p>
                <button
                  type="submit"
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-flame-500 px-8 py-4 text-[13px] font-medium tracking-[0.12em] text-white uppercase transition-colors hover:bg-flame-600"
                >
                  Gửi yêu cầu
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Hàng độc bản                                                        */
/* ------------------------------------------------------------------ */

/** How far each card hangs below the top line, in the gallery stagger. */
const ONE_OFF_OFFSETS = ['', 'lg:mt-20', 'lg:mt-10']

/**
 * The pieces made once and not repeated.
 *
 * Deliberately unlike anything else on the page: hung like plates in a gallery,
 * numbered, framed with corner ticks and staggered off the baseline, because a
 * one-off piece should not sit in the same four-across grid as stock items.
 */
export function OneOffSection() {
  const items = oneOffItems.slice(0, 3)

  if (items.length === 0) return null

  return (
    <section
      id="doc-ban"
      aria-label={oneOff.eyebrow}
      className="relative overflow-hidden bg-ink-900 py-24 text-white lg:py-36"
    >
      {/* Two warm washes and a hairline grid: the room the pieces hang in. */}
      <span
        aria-hidden
        className="pointer-events-none absolute -left-40 top-10 h-[36rem] w-[36rem] rounded-full bg-flame-700/20 blur-[130px]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-0 h-[30rem] w-[30rem] rounded-full bg-flame-500/10 blur-[130px]"
      />
      <span aria-hidden className="mt-oneoff-grid pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8">
        {/* A plaque rule rather than the usual eyebrow row. */}
        <Reveal className="mt-oneoff-rule">
          <span className="mt-oneoff-mark" aria-hidden />
          <span className="eyebrow text-flame-300">{oneOff.eyebrow}</span>
          <span className="mt-oneoff-mark" aria-hidden />
        </Reveal>

        <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal delay={80} className="max-w-2xl">
            <h2 className="font-display text-[clamp(2.25rem,4.8vw,3.75rem)] leading-[1.05] font-medium tracking-tight text-balance">
              <span className="block">{oneOff.title}</span>
              <em className="block not-italic text-flame-400">{oneOff.accent}</em>
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-white/60">{oneOff.lead}</p>
          </Reveal>

          <Reveal delay={200} className="shrink-0">
            <a
              href={`tel:${showroom.phone.replace(/\s/g, '')}`}
              className="group inline-flex items-center gap-3 border-b border-white/25 pb-2 text-[13px] tracking-[0.14em] uppercase transition-colors hover:border-flame-500 hover:text-flame-400"
            >
              Hỏi giữ món
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              >
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-8">
          {items.map((item, i) => (
            <Reveal
              key={item.id}
              delay={i * 110}
              className={`mt-oneoff-card group ${ONE_OFF_OFFSETS[i] ?? ''}`}
            >
              {/* The catalogue number, set like a plate caption. */}
              <div className="flex items-end justify-between gap-4 border-b border-white/12 pb-3">
                <span className="mt-oneoff-index">{String(i + 1).padStart(2, '0')}</span>
                {item.limitedNote && <span className="mt-oneoff-note">{item.limitedNote}</span>}
              </div>

              <Link href={`/san-pham/${item.slug}`} className="mt-oneoff-frame mt-5 block">
                <span className="mt-oneoff-tick mt-oneoff-tick-tl" aria-hidden />
                <span className="mt-oneoff-tick mt-oneoff-tick-tr" aria-hidden />
                <span className="mt-oneoff-tick mt-oneoff-tick-bl" aria-hidden />
                <span className="mt-oneoff-tick mt-oneoff-tick-br" aria-hidden />

                <span className="relative block aspect-4/5 overflow-hidden bg-ink-800">
                  <span className="absolute inset-0 block transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]">
                    <ProductMedia item={item} aspect={5 / 4} sizes="(max-width: 640px) 100vw, 33vw" />
                  </span>
                  <span className="mt-oneoff-sheen" aria-hidden />
                </span>
              </Link>

              <div className="mt-5">
                <h3 className="font-display text-[1.55rem] leading-snug text-white transition-colors group-hover:text-flame-200">
                  <Link href={`/san-pham/${item.slug}`}>{item.name}</Link>
                </h3>

                <p className="mt-2 text-[13px] leading-relaxed text-white/50">
                  {[item.material, item.finish].filter(Boolean).join(' · ')}
                </p>
                <p className="mt-1 text-[12px] text-white/35">{item.size}</p>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="text-[1.35rem] font-semibold text-white">
                      {formatVnd(item.price)}
                    </span>
                    {item.compareAt && (
                      <span className="text-[13px] text-white/35 line-through">
                        {formatVnd(item.compareAt)}
                      </span>
                    )}
                  </div>

                  <AddToCartButton
                    id={item.id}
                    className="shrink-0 rounded-full bg-flame-500 px-5 py-2.5 text-[13px] font-medium tracking-wide text-white transition-colors hover:bg-flame-600"
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
