import type { Metadata } from 'next'
import Link from 'next/link'
import Logo from '@/components/Logo'
import QuoteBuilder from '@/components/QuoteBuilder'

export const metadata: Metadata = {
  title: 'Lập báo giá — nội bộ',
  description: 'Công cụ lập báo giá cho khách hàng MtT Deco.',
  robots: { index: false, follow: false, nocache: true },
}

export default function QuotePage() {
  return (
    <div className="min-h-screen bg-paper-dim/50">
      <header className="no-print sticky top-0 z-40 border-b border-ink-900/10 bg-paper/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1800px] items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <div className="flex items-center gap-4">
            <Link href="/" aria-label="MtT Deco">
              <Logo className="h-7 w-auto" />
            </Link>
            <span className="hidden h-5 w-px bg-ink-900/15 sm:block" />
            <span className="hidden text-[13px] text-steel-600 sm:block">Công cụ lập báo giá</span>
          </div>
          <span className="rounded-full bg-flame-500/12 px-3 py-1 text-[11px] font-medium tracking-[0.14em] text-flame-700 uppercase ring-1 ring-flame-500/25">
            Nội bộ
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-[1800px] px-5 py-8 sm:px-8">
        <QuoteBuilder />
      </main>
    </div>
  )
}
