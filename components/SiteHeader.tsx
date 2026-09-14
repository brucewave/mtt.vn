'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import Logo from './Logo'
import { navLinks, showroom } from '@/lib/site-data'
import { categories } from '@/lib/categories'
import { useCart } from '@/lib/cart'

/** The category list the "Sản phẩm" dropdown hangs off, minus the "all" pill. */
const productCategories = categories.filter((c) => c.id !== 'all')

export default function SiteHeader({
  variant = 'overlay',
}: {
  /** `overlay` floats over the hero; `solid` is for the inner pages. */
  variant?: 'overlay' | 'solid'
}) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const searchInput = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const { count, ready } = useCart()

  const solid = variant === 'solid' || scrolled

  useEffect(() => {
    if (variant === 'solid') return
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.72)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [variant])

  // Both overlays lock the page; whichever is open owns the scroll.
  useEffect(() => {
    const locked = menuOpen || searchOpen
    document.body.style.overflow = locked ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen, searchOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setMenuOpen(false)
      setSearchOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Focus lands after the panel has slid in, not while it is still moving.
  useEffect(() => {
    if (!searchOpen) return
    const t = window.setTimeout(() => searchInput.current?.focus(), 220)
    return () => window.clearTimeout(t)
  }, [searchOpen])

  const badge = ready && count > 0 ? count : null

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const q = query.trim()
    router.push(q ? `/san-pham?q=${encodeURIComponent(q)}` : '/san-pham')
    setSearchOpen(false)
  }

  const roundBtn = solid
    ? 'border-ink-900/15 text-ink-900 hover:border-flame-500 hover:text-flame-600'
    : 'border-white/30 text-white hover:border-white'

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          solid
            ? 'border-b border-ink-900/8 bg-paper/85 backdrop-blur-xl'
            : 'border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-5 py-4 sm:px-8">
          <Link href="/" aria-label={`${'MtT Deco'} — về trang chủ`} className="shrink-0">
            <Logo tone={solid ? 'color' : 'light'} priority className="h-8 w-auto sm:h-9" />
          </Link>

          <nav className="hidden lg:block" aria-label="Menu chính">
            <ul className="flex items-center gap-1">
              {navLinks.map((l) => {
                const hasMenu = l.href === '/san-pham'
                return (
                  <li key={l.href} className="group relative">
                    <Link
                      href={l.href}
                      className={`relative flex items-center gap-1.5 px-4 py-2 text-[13px] tracking-wide transition-colors ${
                        solid ? 'text-ink-700 hover:text-ink-900' : 'text-white/75 hover:text-white'
                      }`}
                    >
                      {l.label}
                      {hasMenu && (
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          className="opacity-50 transition-transform duration-300 group-hover:translate-y-0.5"
                          aria-hidden
                        >
                          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                      <span className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-flame-500 transition-transform duration-300 group-hover:scale-x-100" />
                    </Link>

                    {/* Always painted on paper: a translucent panel over the hero
                        photograph is unreadable. */}
                    {hasMenu && (
                      <div className="invisible absolute left-0 top-full z-10 min-w-56 translate-y-2 rounded-sm border border-ink-900/8 bg-paper p-2 opacity-0 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.28)] transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                        {productCategories.map((c) => (
                          <Link
                            key={c.id}
                            href={`/san-pham?cat=${c.id}`}
                            className="block rounded-sm px-3 py-2 text-[13px] text-steel-600 transition-colors hover:bg-ink-900/5 hover:text-flame-600"
                          >
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Tìm sản phẩm"
              aria-expanded={searchOpen}
              className={`grid h-10 w-10 place-items-center rounded-full border transition-colors ${roundBtn}`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
              </svg>
            </button>

            <a
              href={`tel:${showroom.phone.replace(/\s/g, '')}`}
              className={`hidden text-[13px] tracking-wide transition-colors xl:block ${
                solid ? 'text-ink-700 hover:text-flame-600' : 'text-white/80 hover:text-white'
              }`}
            >
              {showroom.phone}
            </a>

            <Link
              href="/gio-hang"
              aria-label={badge ? `Giỏ hàng, ${badge} món` : 'Giỏ hàng'}
              className={`relative grid h-10 w-10 place-items-center rounded-full border transition-colors ${roundBtn}`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M6 7h12l-1 12H7L6 7Zm3 0a3 3 0 0 1 6 0" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {badge && (
                <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-flame-500 px-1 text-[10px] font-semibold text-white">
                  {badge}
                </span>
              )}
            </Link>

            <Link
              href="/#lien-he"
              className="hidden rounded-full bg-flame-500 px-5 py-2.5 text-[13px] font-medium tracking-wide text-white transition-colors hover:bg-flame-600 md:block"
            >
              Đặt lịch tư vấn
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Mở menu"
              className={`grid h-10 w-10 place-items-center rounded-full border transition-colors lg:hidden ${roundBtn}`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ---------------- Search ---------------- */}
      <div
        className={`fixed inset-0 z-[70] ${searchOpen ? '' : 'pointer-events-none invisible'}`}
        aria-hidden={!searchOpen}
      >
        <div
          onClick={() => setSearchOpen(false)}
          className={`absolute inset-0 bg-ink-900/55 backdrop-blur-sm transition-opacity duration-400 ${
            searchOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div
          className={`absolute inset-x-0 top-0 bg-paper shadow-[0_30px_60px_-25px_rgba(0,0,0,0.4)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            searchOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Tìm sản phẩm"
        >
          <div className="mx-auto max-w-[1000px] px-5 py-8 sm:px-8 sm:py-12">
            <div className="flex items-start justify-between gap-6">
              <p className="eyebrow text-flame-600">Tìm sản phẩm</p>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                aria-label="Đóng tìm kiếm"
                className="grid h-10 w-10 place-items-center rounded-full border border-ink-900/15 text-ink-900 transition-colors hover:border-flame-500 hover:text-flame-600"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <form
              onSubmit={submit}
              className="mt-5 flex items-center gap-3 border-b-2 border-ink-900/15 pb-3 focus-within:border-flame-500"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="shrink-0 text-steel-400">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
              </svg>
              <input
                ref={searchInput}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoComplete="off"
                placeholder="Sofa, đèn thả, tủ bếp, mã SP…"
                className="w-full border-0 bg-transparent p-0 font-display text-[clamp(1.5rem,3vw,2.25rem)] text-ink-900 outline-none placeholder:text-steel-300"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-flame-500 px-5 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-flame-600"
              >
                Tìm
              </button>
            </form>

            <p className="mt-3 text-[12px] text-steel-500">
              Gõ không dấu cũng được — “ban an” vẫn ra “Bàn ăn”.
            </p>

            <div className="mt-8">
              <p className="text-[11px] tracking-[0.16em] text-steel-400 uppercase">Danh mục</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {productCategories.map((c) => (
                  <Link
                    key={c.id}
                    href={`/san-pham?cat=${c.id}`}
                    onClick={() => setSearchOpen(false)}
                    className="rounded-full border border-ink-900/12 px-4 py-2 text-[13px] text-steel-600 transition-colors hover:border-flame-500 hover:text-flame-600"
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- Mobile drawer ---------------- */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden ${menuOpen ? '' : 'pointer-events-none invisible'}`}
        aria-hidden={!menuOpen}
      >
        <div
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-ink-900/60 backdrop-blur-sm transition-opacity duration-400 ${
            menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div
          className={`absolute inset-y-0 right-0 flex w-[86%] max-w-sm flex-col overflow-y-auto bg-paper px-6 py-5 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between">
            <Logo className="h-8 w-auto" />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Đóng menu"
              className="grid h-10 w-10 place-items-center rounded-full border border-ink-900/15 text-ink-900"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <nav className="mt-8 flex flex-col">
            {navLinks.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-ink-900/8 py-4 font-display text-2xl text-ink-900"
              >
                <span className="mr-3 align-super text-xs text-flame-500">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {l.label}
              </Link>
            ))}
            <Link
              href="/gio-hang"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between border-b border-ink-900/8 py-4 font-display text-2xl text-ink-900"
            >
              <span>
                <span className="mr-3 align-super text-xs text-flame-500">
                  {String(navLinks.length + 1).padStart(2, '0')}
                </span>
                Giỏ hàng
              </span>
              {badge && (
                <span className="grid h-6 min-w-6 place-items-center rounded-full bg-flame-500 px-1.5 text-[11px] font-semibold text-white">
                  {badge}
                </span>
              )}
            </Link>
          </nav>

          <div className="mt-7">
            <p className="text-[11px] tracking-[0.16em] text-steel-400 uppercase">Danh mục</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {productCategories.map((c) => (
                <Link
                  key={c.id}
                  href={`/san-pham?cat=${c.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-full border border-ink-900/12 px-3 py-1.5 text-[12px] text-steel-600"
                >
                  {c.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-auto space-y-2 pt-8 text-sm text-steel-600">
            <a
              href={`tel:${showroom.phone.replace(/\s/g, '')}`}
              className="block text-lg font-medium text-ink-900"
            >
              {showroom.phone}
            </a>
            <p>{showroom.address}</p>
            <p>{showroom.hours}</p>
          </div>
        </div>
      </div>
    </>
  )
}
