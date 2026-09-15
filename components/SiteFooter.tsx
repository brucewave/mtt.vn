import Link from 'next/link'
import Logo from './Logo'
import { navLinks, showroom } from '@/lib/site-data'
import { categories } from '@/lib/categories'
import { policies } from '@/lib/policies'
import { brand, parentCompany, usps } from '@/lib/brand'

const socials = [
  { label: 'Facebook', href: '#', d: 'M13.5 9H16V6h-2.5C11.6 6 10 7.6 10 9.5V11H8v3h2v7h3v-7h2.3l.7-3H13v-1.5c0-.3.2-.5.5-.5Z' },
  { label: 'Instagram', href: '#', d: 'M12 8.6a3.4 3.4 0 1 0 0 6.8 3.4 3.4 0 0 0 0-6.8Zm0-2.6c2 0 2.2 0 3 .05 1.9.08 2.8 1 2.9 2.9 0 .8.05 1 .05 3s0 2.2-.05 3c-.1 1.9-1 2.8-2.9 2.9-.8.05-1 .05-3 .05s-2.2 0-3-.05c-1.9-.1-2.8-1-2.9-2.9C6.05 14.2 6 14 6 12s0-2.2.05-3c.1-1.9 1-2.82 2.9-2.9.8-.05 1-.05 3-.05Zm5.4 1.15a.9.9 0 1 0 0 1.8.9.9 0 0 0 0-1.8Z' },
  { label: 'YouTube', href: '#', d: 'M21.5 8.5a2.5 2.5 0 0 0-1.8-1.8C18.1 6.3 12 6.3 12 6.3s-6.1 0-7.7.4A2.5 2.5 0 0 0 2.5 8.5C2.1 10.1 2.1 12 2.1 12s0 1.9.4 3.5a2.5 2.5 0 0 0 1.8 1.8c1.6.4 7.7.4 7.7.4s6.1 0 7.7-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-3.5.4-3.5s0-1.9-.4-3.5ZM10.2 15V9l5.2 3-5.2 3Z' },
  { label: 'Zalo', href: '#', d: 'M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm2.6 4.4v1.3h3L7.4 15v1.2h5.2v-1.3h-3.3l3.2-5.2V8.4H7.6Zm7.9 0v7.8h1.4V8.4h-1.4Z' },
]

const productLinks = categories
  .filter((c) => c.id !== 'all')
  .slice(0, 6)
  .map((c) => ({ label: c.label, href: `/san-pham?cat=${c.id}` }))

const serviceLinks = [
  { label: 'Thiết kế nội thất', href: '/quy-trinh' },
  { label: 'Thi công trọn gói', href: '/quy-trinh' },
  { label: 'Đóng đồ theo yêu cầu', href: '/lien-he' },
  { label: 'Dự án đã bàn giao', href: '/du-an' },
  { label: 'Hàng độc bản', href: '/#doc-ban' },
]

const supportLinks = [
  { label: 'Blog kiến thức', href: '/blog' },
  ...policies.map((p) => ({ label: p.title, href: `/${p.slug}` })),
  { label: 'Giỏ hàng', href: '/gio-hang' },
  { label: 'Liên hệ', href: '/lien-he' },
]

function Column({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-[11px] tracking-[0.2em] text-flame-400 uppercase">{title}</h3>
      <ul className="mt-5 space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="text-[14px] text-white/60 transition-colors hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function SiteFooter() {
  return (
    <>
      {/* The four promises the whole site rests on, restated where a hesitating
          visitor ends up: the bottom of the page. */}
      <section className="border-t border-ink-900/8 bg-paper-dim/50" aria-label="Cam kết">
        <div className="mx-auto grid max-w-[1600px] gap-px bg-ink-900/8 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
          {usps.map((u) => (
            <div key={u.title} className="flex items-start gap-3 bg-paper-dim/50 px-2 py-7 sm:px-5">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="mt-0.5 shrink-0 text-flame-500"
                aria-hidden
              >
                <path d="M4 12.5l5 5L20 6.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div>
                <p className="text-[14px] font-medium text-ink-900">{u.title}</p>
                <p className="mt-1 text-[12px] leading-relaxed text-steel-500">{u.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-ink-900 text-white">
        <div className="mx-auto max-w-[1600px] px-5 pt-20 pb-10 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Logo tone="light" className="h-10 w-auto" />

              <p className="mt-6 max-w-sm text-[14px] leading-relaxed text-white/55">
                Thiết kế và thi công nội thất trọn gói cho căn hộ, nhà phố, biệt thự và văn phòng.
                Tự sản xuất tại xưởng 4.000 m², bảo hành khung gỗ 5 năm.
              </p>

              <div className="mt-8 flex gap-2.5">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/18 text-white/70 transition-colors hover:border-flame-500 hover:bg-flame-500 hover:text-white"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d={s.d} />
                    </svg>
                  </a>
                ))}
              </div>

              <a
                href={parentCompany.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-[13px]"
              >
                <span className="text-white/45">{parentCompany.label}</span>
                <span className="font-medium text-white">{parentCompany.name}</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-flame-400" aria-hidden>
                  <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>

              <a
                href={`tel:${showroom.phone.replace(/\s/g, '')}`}
                className="mt-6 inline-flex items-center gap-3 rounded-full bg-flame-500 px-6 py-3 text-[13px] font-medium tracking-wide text-white transition-colors hover:bg-flame-600"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
                  <path
                    d="M4.5 5.5c0 7.2 6.8 14 14 14l1.5-3-4-2-1.7 1.7a15 15 0 0 1-6-6L10 8.5l-2-4-3.5 1Z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {showroom.phone}
              </a>
            </div>

            <div className="grid gap-10 sm:grid-cols-3 lg:col-span-5">
              <Column title="Sản phẩm" links={productLinks} />
              <Column title="Dịch vụ" links={serviceLinks} />
              <Column title="Hỗ trợ" links={supportLinks} />
            </div>

            <div className="lg:col-span-3">
              <h3 className="text-[11px] tracking-[0.2em] text-flame-400 uppercase">Liên hệ</h3>
              <div className="mt-5 space-y-4 text-[14px] text-white/60">
                <p>{showroom.address}</p>
                <p>{showroom.factory}</p>
                <p>{showroom.hours}</p>
                <a
                  href={`mailto:${showroom.email}`}
                  className="block transition-colors hover:text-white"
                >
                  {showroom.email}
                </a>
              </div>

              <h3 className="mt-8 text-[11px] tracking-[0.2em] text-flame-400 uppercase">Thanh toán</h3>
              <p className="mt-3 text-[13px] leading-relaxed text-white/55">
                Thanh toán khi nhận hàng (COD) · Chuyển khoản ngân hàng
              </p>
            </div>
          </div>

          <div className="mt-16 flex flex-col gap-5 border-t border-white/10 pt-7 text-[12px] text-white/40 md:flex-row md:items-center md:justify-between">
            <p>
              © {new Date().getFullYear()} {brand.name}. Tất cả hình ảnh công trình thuộc bản quyền
              của chúng tôi.
            </p>
            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              {navLinks.map((l) => (
                <Link key={l.href} href={l.href} className="transition-colors hover:text-white/80">
                  {l.label}
                </Link>
              ))}
              <Link href="/gio-hang" className="transition-colors hover:text-white/80">
                Giỏ hàng
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </>
  )
}
