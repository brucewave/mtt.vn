import Link from 'next/link'

/** Shared masthead for the inner pages (listing, cart, checkout). */
export default function PageHeading({
  eyebrow,
  title,
  accent,
  lead,
  crumbs = [],
}: {
  eyebrow: string
  title: string
  accent?: string
  lead?: string
  crumbs?: { label: string; href?: string }[]
}) {
  return (
    <div className="pt-28 sm:pt-32">
      {crumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-[12px]">
          <Link href="/" className="text-steel-500 transition-colors hover:text-flame-600">
            Trang chủ
          </Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-2">
              <span className="text-steel-300">/</span>
              {c.href ? (
                <Link href={c.href} className="text-steel-500 transition-colors hover:text-flame-600">
                  {c.label}
                </Link>
              ) : (
                <span className="text-ink-900">{c.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}

      <p className="eyebrow flex items-center gap-3 text-flame-600">
        <span className="h-px w-8 bg-flame-500" />
        {eyebrow}
      </p>
      {/* Balanced so an accent of two or three words does not leave a single
          syllable stranded on its own line. */}
      <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.03] font-medium tracking-tight text-balance text-ink-900">
        {title} {accent && <em className="not-italic text-flame-600">{accent}</em>}
      </h1>
      {lead && <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-steel-600">{lead}</p>}
    </div>
  )
}
