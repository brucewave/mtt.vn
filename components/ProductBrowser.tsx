'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import ProductMedia from './ProductMedia'
import AddToCartButton from './AddToCartButton'
import { catalog, type CatalogItem } from '@/lib/catalog'
import { categories } from '@/lib/categories'
import { formatVnd } from '@/lib/format'

const SORTS = [
  { id: 'featured', label: 'Nổi bật' },
  { id: 'price-asc', label: 'Giá thấp → cao' },
  { id: 'price-desc', label: 'Giá cao → thấp' },
  { id: 'name', label: 'Tên A → Z' },
] as const

const PRICE_BANDS = [
  { id: 'all', label: 'Mọi mức giá', test: () => true },
  { id: 'u5', label: 'Dưới 5 triệu', test: (p: number) => p < 5_000_000 },
  { id: '5-20', label: '5 – 20 triệu', test: (p: number) => p >= 5_000_000 && p < 20_000_000 },
  { id: '20-50', label: '20 – 50 triệu', test: (p: number) => p >= 20_000_000 && p < 50_000_000 },
  { id: 'o50', label: 'Trên 50 triệu', test: (p: number) => p >= 50_000_000 },
] as const

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')

export default function ProductBrowser() {
  // The header's search box and the category menus both land here with the
  // filter already in the URL, so the list must open on that rather than on
  // "everything" and make the visitor pick again.
  const params = useSearchParams()
  const [cat, setCat] = useState<string>(() => {
    const wanted = params.get('cat')
    return wanted && categories.some((c) => c.id === wanted) ? wanted : 'all'
  })
  const [band, setBand] = useState<string>('all')
  const [sort, setSort] = useState<string>('featured')
  const [q, setQ] = useState(() => params.get('q') ?? '')

  const results = useMemo(() => {
    const bandTest = PRICE_BANDS.find((b) => b.id === band)!.test
    const needle = norm(q.trim())

    let list = catalog.filter((i) => {
      if (cat !== 'all' && i.categoryId !== cat) return false
      if (!bandTest(i.price)) return false
      if (!needle) return true
      return norm(`${i.name} ${i.category} ${i.room} ${i.sku} ${i.material}`).includes(needle)
    })

    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price)
    else if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
    else if (sort === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name, 'vi'))

    return list
  }, [cat, band, sort, q])

  const countsByCat = useMemo(() => {
    const m: Record<string, number> = { all: catalog.length }
    for (const i of catalog) m[i.categoryId] = (m[i.categoryId] ?? 0) + 1
    return m
  }, [])

  return (
    <>
      {/* ---------- Filter bar ---------- */}
      <div className="sticky top-[68px] z-30 -mx-5 mb-10 border-y border-ink-900/8 bg-paper/90 px-5 py-3 backdrop-blur-xl sm:-mx-8 sm:px-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="hide-scrollbar -mx-1 flex gap-1 overflow-x-auto px-1">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCat(c.id)}
                aria-pressed={cat === c.id}
                className={`shrink-0 rounded-full px-4 py-2 text-[13px] whitespace-nowrap transition-colors ${
                  cat === c.id
                    ? 'bg-ink-900 text-white'
                    : 'text-steel-600 hover:bg-ink-900/6 hover:text-ink-900'
                }`}
              >
                {c.label}
                <span className={cat === c.id ? 'ml-1.5 text-white/50' : 'ml-1.5 text-steel-400'}>
                  {countsByCat[c.id] ?? 0}
                </span>
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <label className="relative">
              <span className="sr-only">Tìm sản phẩm</span>
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-steel-400"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
              </svg>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Tìm sofa, đèn, mã SP…"
                className="w-full rounded-full border border-ink-900/12 bg-white py-2 pl-9 pr-3 text-[13px] outline-none transition-colors placeholder:text-steel-400 focus:border-flame-500 sm:w-56"
              />
            </label>

            <select
              value={band}
              onChange={(e) => setBand(e.target.value)}
              aria-label="Lọc theo giá"
              className="rounded-full border border-ink-900/12 bg-white px-4 py-2 text-[13px] outline-none focus:border-flame-500"
            >
              {PRICE_BANDS.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.label}
                </option>
              ))}
            </select>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Sắp xếp"
              className="rounded-full border border-ink-900/12 bg-white px-4 py-2 text-[13px] outline-none focus:border-flame-500"
            >
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <p className="mb-6 text-[13px] text-steel-500">
        {results.length} sản phẩm
        {cat !== 'all' && ` trong "${categories.find((c) => c.id === cat)?.label}"`}
        {q.trim() && ` khớp với "${q.trim()}"`}
      </p>

      {results.length === 0 ? (
        <div className="rounded-sm border border-dashed border-ink-900/15 px-6 py-20 text-center">
          <p className="font-display text-2xl text-ink-900">Không tìm thấy sản phẩm nào</p>
          <p className="mt-2 text-[14px] text-steel-500">
            Thử bỏ bớt bộ lọc, hoặc gọi {''}
            <a href="tel:0909218218" className="text-flame-600 underline underline-offset-4">
              0909 218 218
            </a>{' '}
            để chúng tôi tìm giúp.
          </p>
          <button
            type="button"
            onClick={() => {
              setCat('all')
              setBand('all')
              setQ('')
            }}
            className="mt-6 rounded-full border border-ink-900/20 px-5 py-2.5 text-[13px] transition-colors hover:border-flame-500 hover:text-flame-600"
          >
            Xoá bộ lọc
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-3 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
          {results.map((item, i) => (
            <ProductCard key={item.id} item={item} priority={i < 4} />
          ))}
        </div>
      )}
    </>
  )
}

function ProductCard({ item, priority }: { item: CatalogItem; priority: boolean }) {
  return (
    <article className="group">
      <div className="relative aspect-3/4 overflow-hidden rounded-sm bg-paper-dim">
        <div className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]">
          <ProductMedia item={item} aspect={4 / 3} priority={priority} />
        </div>

        {item.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-flame-500 px-3 py-1 text-[10px] font-medium tracking-[0.14em] text-white uppercase">
            {item.badge}
          </span>
        )}

        <AddToCartButton
          id={item.id}
          className="absolute inset-x-3 bottom-3 translate-y-3 rounded-full bg-white/95 py-2.5 text-center text-[12px] font-medium tracking-[0.12em] text-ink-900 uppercase opacity-0 backdrop-blur transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100"
        />
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] tracking-[0.16em] text-steel-400 uppercase">{item.category}</p>
          <h3 className="mt-1.5 truncate text-[15px] font-medium text-ink-900">{item.name}</h3>
        </div>
        <div className="flex shrink-0 gap-1 pt-5">
          {item.colors.map((c) => (
            <span
              key={c}
              className="h-3 w-3 rounded-full ring-1 ring-ink-900/15"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>

      <p className="mt-1 truncate text-[12px] text-steel-500">{item.size}</p>

      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-[15px] font-semibold text-ink-900">{formatVnd(item.price)}</span>
        {item.compareAt && (
          <span className="text-[13px] text-steel-400 line-through">{formatVnd(item.compareAt)}</span>
        )}
      </div>

      <div className="mt-2 flex items-center gap-3 text-[12px]">
        <AddToCartButton
          id={item.id}
          className="text-flame-600 underline decoration-flame-600/30 underline-offset-4 transition-colors hover:decoration-flame-600 lg:hidden"
        />
        <Link
          href="/#lien-he"
          className="text-steel-500 underline decoration-ink-900/15 underline-offset-4 transition-colors hover:text-ink-900"
        >
          Hỏi tư vấn
        </Link>
      </div>
    </article>
  )
}
