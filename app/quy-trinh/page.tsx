import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import PageHeading from '@/components/PageHeading'
import Reveal from '@/components/Reveal'
import { ProcessGrid } from '@/components/Sections'
import { brand } from '@/lib/brand'
import { processSteps, showroom } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Quy trình thiết kế & thi công',
  description:
    'Sáu bước từ khảo sát đến bàn giao, tổng cộng 35–50 ngày: mốc thời gian, tiến độ thanh toán và những gì bạn nhận được ở mỗi bước.',
  alternates: { canonical: '/quy-trinh' },
  openGraph: {
    type: 'website',
    title: `Quy trình thiết kế & thi công · ${brand.name}`,
    description: 'Sáu bước, tổng cộng 35–50 ngày, ghi thẳng vào hợp đồng.',
    url: `${brand.url}/quy-trinh`,
  },
}

/** What the money looks like, stage by stage. */
const payments = [
  { when: 'Khi ký hợp đồng thiết kế', amount: '0đ', note: 'Khảo sát và 2 phương án 3D miễn phí' },
  { when: 'Khi chốt bản vẽ thi công', amount: '30%', note: 'Tiền cọc để xưởng đặt vật liệu' },
  { when: 'Khi hàng ra khỏi xưởng', amount: '60%', note: 'Sau khi bạn nghiệm thu tại xưởng' },
  { when: 'Sau khi lắp đặt & nghiệm thu', amount: '10%', note: 'Giữ lại đến khi bạn ký biên bản' },
]

/** The questions that come up in almost every first meeting. */
const faqs = [
  {
    q: 'Tôi chỉ cần đóng vài món, có nhận không?',
    a: 'Có. Không có mức đơn hàng tối thiểu. Với đơn nhỏ thì bỏ qua bước phối cảnh 3D và đi thẳng vào bản vẽ kỹ thuật, nên thời gian rút xuống còn 20–30 ngày.',
  },
  {
    q: 'Bản vẽ 3D có mất phí không nếu tôi không thi công?',
    a: 'Không. Bạn nhận 2 phương án phối cảnh và bảng vật liệu thật; nếu không hợp gu thì giữ lại bản vẽ, chúng tôi không thu phí và cũng không giữ lại quyền gì.',
  },
  {
    q: 'Nhà đang ở, thi công có bụi bẩn nhiều không?',
    a: 'Toàn bộ gia công cắt xẻ diễn ra ở xưởng. Tại nhà chỉ còn lắp ráp và bắt vít, đội lắp phủ bạt bảo vệ sàn và dọn sạch trước khi rời đi.',
  },
  {
    q: 'Chậm tiến độ thì sao?',
    a: 'Mốc thời gian trong bảng trên được ghi vào hợp đồng. Chậm do lỗi của chúng tôi thì chúng tôi chịu phạt theo đúng điều khoản đã ký.',
  },
]

export default function ProcessPage() {
  return (
    <>
      <SiteHeader variant="solid" />

      <main className="mx-auto max-w-[1600px] px-5 pb-24 sm:px-8">
        <PageHeading
          eyebrow="Quy trình"
          title="Sáu bước, tổng cộng"
          accent="35–50 ngày"
          lead="Mốc thời gian dưới đây được ghi thẳng vào hợp đồng. Chậm tiến độ do lỗi của chúng tôi, chúng tôi chịu phạt."
          crumbs={[{ label: 'Quy trình' }]}
        />

        <ProcessGrid className="mt-14" />

        {/* ---- What you hold at the end of each step ---- */}
        <section className="mt-24" aria-label="Kết quả từng bước">
          <Reveal>
            <h2 className="font-display text-[clamp(1.75rem,3.2vw,2.5rem)] leading-[1.1] font-medium tracking-tight text-ink-900">
              Sau mỗi bước bạn cầm được gì
            </h2>
          </Reveal>

          <ol className="mt-10 border-t border-ink-900">
            {processSteps.map((s, i) => (
              <Reveal
                key={s.no}
                delay={(i % 3) * 70}
                as="li"
                className="grid gap-4 border-b border-ink-900/10 py-6 md:grid-cols-12 md:items-baseline md:gap-8"
              >
                <span className="font-display text-2xl text-flame-600 md:col-span-1">{s.no}</span>
                <h3 className="text-[16px] font-medium text-ink-900 md:col-span-3">{s.title}</h3>
                <p className="text-[14px] leading-relaxed text-steel-600 md:col-span-6">{s.body}</p>
                <span className="text-[12px] tracking-[0.12em] text-steel-400 uppercase md:col-span-2 md:text-right">
                  {s.time}
                </span>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* ---- Payment schedule ---- */}
        <section className="mt-24 grid gap-14 lg:grid-cols-12 lg:gap-16" aria-label="Tiến độ thanh toán">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow flex items-center gap-3 text-flame-600">
                <span className="h-px w-8 bg-flame-500" />
                Thanh toán
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-4 font-display text-[clamp(1.75rem,3.2vw,2.5rem)] leading-[1.1] font-medium tracking-tight text-ink-900">
                Trả theo tiến độ,
                <em className="block not-italic text-flame-600">không trả trước toàn bộ</em>
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-5 text-[15px] leading-relaxed text-steel-600">
                10% cuối cùng chỉ thanh toán sau khi bạn ký biên bản nghiệm thu. Nếu còn hạng mục
                chưa đạt, khoản đó vẫn nằm lại cho tới khi xong.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <dl className="border-t border-ink-900">
              {payments.map((p, i) => (
                <Reveal
                  key={p.when}
                  delay={i * 80}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-ink-900/10 py-5"
                >
                  <div>
                    <dt className="text-[15px] font-medium text-ink-900">{p.when}</dt>
                    <dd className="mt-1 text-[13px] text-steel-500">{p.note}</dd>
                  </div>
                  <span className="font-display text-3xl text-flame-600">{p.amount}</span>
                </Reveal>
              ))}
            </dl>
          </div>
        </section>

        {/* ---- FAQ ---- */}
        <section className="mt-24" aria-label="Câu hỏi thường gặp">
          <Reveal>
            <h2 className="font-display text-[clamp(1.75rem,3.2vw,2.5rem)] leading-[1.1] font-medium tracking-tight text-ink-900">
              Câu hỏi hay gặp
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-x-16 gap-y-8 md:grid-cols-2">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={(i % 2) * 90}>
                <h3 className="text-[16px] font-medium text-ink-900">{f.q}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-steel-600">{f.a}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <Reveal delay={120} className="mt-20 flex flex-wrap items-center gap-6">
          <Link
            href="/lien-he"
            className="inline-flex items-center gap-3 rounded-full bg-flame-500 px-8 py-4 text-[13px] font-medium tracking-[0.12em] text-white uppercase transition-colors hover:bg-flame-600"
          >
            Bắt đầu từ bước 01
          </Link>
          <a
            href={`tel:${showroom.phone.replace(/\s/g, '')}`}
            className="text-[14px] text-steel-600 transition-colors hover:text-flame-600"
          >
            Hoặc gọi {showroom.phone}
          </a>
        </Reveal>
      </main>

      <SiteFooter />
    </>
  )
}
