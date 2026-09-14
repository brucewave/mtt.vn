'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import AddToCartButton from './AddToCartButton'
import { formatVnd, heroSlides, type HeroSlide, type Hotspot } from '@/lib/hero-data'

/** Every hero photo is 3:2 — the cover layer is built from this ratio. */
const AR_W = 3
const AR_H = 2
const AUTOPLAY_MS = 8000

type Box = { w: number; h: number }

function parseFocus(focus: string) {
  const [fx, fy] = focus.split(' ').map((v) => parseFloat(v) / 100)
  return { fx: Number.isFinite(fx) ? fx : 0.5, fy: Number.isFinite(fy) ? fy : 0.5 }
}

/**
 * Geometry of the `object-cover` layer inside the stage. Hotspots live *inside*
 * this layer at percentage coordinates, so they stay glued to the furniture no
 * matter how the photo gets cropped.
 */
function coverBox(box: Box, focus: string) {
  const scale = Math.max(box.w / AR_W, box.h / AR_H)
  const CW = AR_W * scale
  const CH = AR_H * scale
  const { fx, fy } = parseFocus(focus)
  return { CW, CH, L: (box.w - CW) * fx, T: (box.h - CH) * fy }
}

/**
 * A portrait viewport already magnifies the photo a lot just to cover the stage
 * (a 3:2 photo on a phone is cropped ~3× wide), so the extra push-in is scaled
 * right down — otherwise the item fills the screen and reads as an abstraction.
 */
function zoomFor(spot: Hotspot, compact: boolean) {
  return compact ? 1.3 + (spot.zoom - 2.2) * 0.4 : spot.zoom
}

/**
 * Transform that pushes `spot` into the reading position while guaranteeing the
 * scaled photo still covers the stage (no bare edges creeping in).
 */
function zoomTransform(box: Box, focus: string, spot: Hotspot, compact: boolean) {
  const { CW, CH, L, T } = coverBox(box, focus)
  const z = zoomFor(spot, compact)
  // Where the item should end up on screen — left of the info card on desktop,
  // above the bottom sheet on small screens.
  const tx = compact ? 0.5 : 0.33
  const ty = compact ? 0.22 : 0.5

  const px = L + spot.x * CW
  const py = T + spot.y * CH

  let dx = tx * box.w - px
  let dy = ty * box.h - py

  // Keep the scaled layer covering the stage.
  const maxDx = -L - spot.x * CW * (1 - z)
  const minDx = box.w - L - spot.x * CW - (1 - spot.x) * CW * z
  const maxDy = -T - spot.y * CH * (1 - z)
  const minDy = box.h - T - spot.y * CH - (1 - spot.y) * CH * z

  dx = Math.min(Math.max(dx, minDx), maxDx)
  dy = Math.min(Math.max(dy, minDy), maxDy)

  const pctX = CW ? (dx / z / CW) * 100 : 0
  const pctY = CH ? (dy / z / CH) * 100 : 0

  return {
    scale: z,
    origin: `${spot.x * 100}% ${spot.y * 100}%`,
    transform: `scale(${z}) translate(${pctX.toFixed(3)}%, ${pctY.toFixed(3)}%)`,
  }
}

export default function HeroShowcase() {
  const stageRef = useRef<HTMLDivElement>(null)
  const [box, setBox] = useState<Box>({ w: 0, h: 0 })
  const [compact, setCompact] = useState(false)
  const [active, setActive] = useState(0)
  const [openSpot, setOpenSpot] = useState<string | null>(null)
  const [hintDismissed, setHintDismissed] = useState(false)
  const [progressKey, setProgressKey] = useState(0)

  const slide = heroSlides[active]
  const spot = useMemo(
    () => (openSpot ? slide.hotspots.find((h) => h.id === openSpot) ?? null : null),
    [openSpot, slide],
  )
  const spotIndex = spot ? slide.hotspots.findIndex((h) => h.id === spot.id) : -1

  /* ---------- stage measurement ---------- */
  useLayoutEffect(() => {
    const el = stageRef.current
    if (!el) return
    const measure = () => {
      setBox({ w: el.clientWidth, h: el.clientHeight })
      setCompact(window.matchMedia('(max-width: 1023px)').matches)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    window.addEventListener('orientationchange', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('orientationchange', measure)
    }
  }, [])

  /* ---------- navigation ---------- */
  const goTo = useCallback((next: number) => {
    setOpenSpot(null)
    setActive(((next % heroSlides.length) + heroSlides.length) % heroSlides.length)
    setProgressKey((k) => k + 1)
  }, [])

  const stepSpot = useCallback(
    (dir: 1 | -1) => {
      const list = slide.hotspots
      const from = list.findIndex((h) => h.id === openSpot)
      const next = (((from + dir) % list.length) + list.length) % list.length
      setOpenSpot(list[next].id)
    },
    [openSpot, slide],
  )

  const openHotspot = useCallback((id: string) => {
    setOpenSpot(id)
    setHintDismissed(true)
  }, [])

  /**
   * Which slide photos have been asked for.
   *
   * All five together are about 2 MB, and a visitor who never reaches slide 3
   * should never pay for it. Only the first is fetched with the page; the next
   * one is warmed a beat after the current slide settles, which is far longer
   * than a download takes at the autoplay interval.
   */
  const [loaded, setLoaded] = useState(() => new Set([0]))

  useEffect(() => {
    const next = (active + 1) % heroSlides.length
    if (loaded.has(next)) return

    const t = window.setTimeout(
      () => setLoaded((prev) => new Set(prev).add(next)),
      // After the crossfade, so the fetch never competes with it.
      1400,
    )
    return () => window.clearTimeout(t)
  }, [active, loaded])

  // A click on a far tab jumps past the warm-up; fetch that one immediately.
  useEffect(() => {
    setLoaded((prev) => (prev.has(active) ? prev : new Set(prev).add(active)))
  }, [active])

  /* ---------- autoplay (paused while a product is open) ---------- */
  useEffect(() => {
    if (openSpot) return
    const t = window.setTimeout(() => goTo(active + 1), AUTOPLAY_MS)
    return () => window.clearTimeout(t)
    // `progressKey` restarts the timer when the already-active tab is clicked.
  }, [active, openSpot, progressKey, goTo])

  /* ---------- keyboard ---------- */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenSpot(null)
        return
      }
      if (e.key === 'ArrowRight') {
        openSpot ? stepSpot(1) : goTo(active + 1)
      } else if (e.key === 'ArrowLeft') {
        openSpot ? stepSpot(-1) : goTo(active - 1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, openSpot, goTo, stepSpot])

  const ready = box.w > 0 && box.h > 0

  return (
    <section
      id="hero"
      className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-ink-900 text-white"
      aria-label="Không gian mẫu của MtT Deco"
    >
      <div ref={stageRef} className="absolute inset-0">
        {heroSlides.map((s, i) => {
          const isActive = i === active
          const geo = ready ? coverBox(box, s.focus) : null
          const zoomed = isActive && spot ? zoomTransform(box, s.focus, spot, compact) : null
          const currentScale = zoomed ? zoomed.scale : 1

          return (
            <div
              key={s.id}
              className="absolute inset-0 transition-opacity duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ opacity: isActive ? 1 : 0, zIndex: isActive ? 2 : 1 }}
              aria-hidden={!isActive}
            >
              <div
                className="absolute will-change-transform transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  width: geo ? geo.CW : '100%',
                  height: geo ? geo.CH : '100%',
                  left: geo ? geo.L : 0,
                  top: geo ? geo.T : 0,
                  transformOrigin: zoomed ? zoomed.origin : 'center center',
                  transform: zoomed ? zoomed.transform : isActive ? 'scale(1)' : 'scale(1.06)',
                }}
              >
                {loaded.has(i) && (
                  <Image
                    src={s.image}
                    alt={`${s.room} — ${s.project}`}
                    fill
                    // Oversized on purpose: the photo gets pushed in up to ~3.2×
                    // when a hotspot opens, so it needs headroom beyond 1×.
                    sizes="(max-width: 1024px) 300vw, 160vw"
                    priority={i === 0}
                    quality={80}
                    className="object-cover select-none"
                    draggable={false}
                  />
                )}

                {/* Hotspots — children of the cover layer, so they follow the crop */}
                {isActive &&
                  s.hotspots.map((h) => {
                    const isOpen = spot?.id === h.id
                    const dimmed = !!spot && !isOpen
                    return (
                      <button
                        key={h.id}
                        type="button"
                        onClick={() => openHotspot(h.id)}
                        aria-label={`${h.name} — ${formatVnd(h.price)}`}
                        aria-pressed={isOpen}
                        className="group absolute z-10 grid place-items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                        style={{
                          left: `${h.x * 100}%`,
                          top: `${h.y * 100}%`,
                          width: 56,
                          height: 56,
                          transform: `translate(-50%, -50%) scale(${(1 / currentScale).toFixed(4)})`,
                          opacity: dimmed ? 0 : 1,
                          pointerEvents: dimmed ? 'none' : 'auto',
                          transition: 'opacity 400ms ease, transform 900ms cubic-bezier(0.22,1,0.36,1)',
                        }}
                      >
                        <span
                          className={`absolute rounded-full bg-white/70 ${
                            isOpen ? '' : 'animate-ping-slow'
                          }`}
                          style={{ width: 18, height: 18 }}
                        />
                        <span
                          className={`absolute rounded-full border transition-all duration-300 ${
                            isOpen
                              ? 'h-11 w-11 border-flame-500 bg-flame-500/20'
                              : 'h-7 w-7 border-white/70 bg-white/10 backdrop-blur-[2px] group-hover:h-9 group-hover:w-9 group-hover:border-white'
                          }`}
                        />
                        <span
                          className={`relative rounded-full shadow-[0_0_18px_rgba(255,255,255,0.9)] transition-all duration-300 ${
                            isOpen ? 'h-3 w-3 bg-flame-500' : 'h-2 w-2 bg-white animate-breathe'
                          }`}
                        />
                        {/* Name preview on hover — desktop only */}
                        <span className="pointer-events-none absolute left-1/2 top-full hidden -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-full bg-ink-900/85 px-3 py-1.5 text-[11px] font-medium tracking-wide text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 lg:block">
                          {h.name} · {formatVnd(h.price)}
                        </span>
                      </button>
                    )
                  })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Scrims — kept above the photo, below the UI */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-ink-900/85 via-ink-900/10 to-ink-900/45" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-ink-900/55 via-transparent to-ink-900/35" />

      {/* Click-away layer while a product is open */}
      {spot && (
        <button
          type="button"
          aria-label="Đóng thông tin sản phẩm"
          onClick={() => setOpenSpot(null)}
          className="absolute inset-0 z-20 cursor-zoom-out"
          tabIndex={-1}
        />
      )}

      {/* ---------------- Rotating badge ---------------- */}
      <div className="pointer-events-none absolute left-5 top-[22%] z-30 hidden lg:block">
        <div className="relative h-[132px] w-[132px]">
          <svg viewBox="0 0 132 132" className="animate-spin-slow h-full w-full">
            <defs>
              <path
                id="mt-badge-path"
                d="M66,66 m-50,0 a50,50 0 1,1 100,0 a50,50 0 1,1 -100,0"
                fill="none"
              />
            </defs>
            <text
              fill="rgba(255,255,255,0.82)"
              fontSize="10.5"
              letterSpacing="4.6"
              style={{ textTransform: 'uppercase' }}
            >
              <textPath href="#mt-badge-path" startOffset="0">
                MtT Deco · Nội thất trọn gói · Thiết kế &amp; thi công ·
              </textPath>
            </text>
          </svg>
          <span className="absolute inset-0 grid place-items-center">
            <span className="h-[7px] w-[7px] rotate-45 bg-flame-500" />
          </span>
        </div>
      </div>

      {/* ---------------- Slide caption ---------------- */}
      <div
        className={`absolute bottom-[10.5rem] left-5 z-30 max-w-[min(560px,86vw)] transition-all duration-500 sm:left-8 lg:bottom-28 lg:left-[calc(1.25rem+180px)] ${
          spot ? 'pointer-events-none translate-y-3 opacity-0' : 'opacity-100'
        }`}
      >
        <div key={slide.id} style={{ animation: 'mt-rise 900ms cubic-bezier(0.22,1,0.36,1) both' }}>
          <p className="eyebrow flex items-center gap-3 text-white/70">
            <span className="text-flame-400">{slide.index}</span>
            <span className="h-px w-8 bg-white/40" />
            {slide.room}
          </p>
          <h1 className="mt-4 font-display text-[clamp(2.5rem,7vw,5.25rem)] leading-[0.95] font-medium tracking-tight">
            <span className="block">{slide.title}</span>
            <span className="block text-flame-400">{slide.titleAccent}</span>
          </h1>
          <p className="mt-4 line-clamp-2 max-w-lg text-[15px] leading-relaxed text-white/75 sm:line-clamp-none">
            {slide.caption}
          </p>
          <p className="mt-3 text-xs tracking-wide text-white/50">{slide.project}</p>
        </div>
      </div>

      {/* ---------------- Item rail (small screens) ----------------
          A portrait viewport crops a 3:2 photo hard, so several hotspots end up
          outside the frame. These chips keep every item one tap away. */}
      <div
        className={`absolute inset-x-0 bottom-[5.25rem] z-30 transition-opacity duration-400 lg:hidden ${
          spot ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
      >
        <div className="hide-scrollbar flex gap-2 overflow-x-auto px-5 pb-1">
          {slide.hotspots.map((h) => (
            <button
              key={h.id}
              type="button"
              onClick={() => openHotspot(h.id)}
              className="shrink-0 rounded-full border border-white/22 bg-ink-900/50 px-3.5 py-2 text-left backdrop-blur-md active:border-flame-500"
            >
              <span className="block max-w-[9.5rem] truncate text-[11px] leading-tight text-white/90">
                {h.name}
              </span>
              <span className="mt-0.5 block text-[11px] leading-tight text-flame-400">
                {formatVnd(h.price)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ---------------- Hint ---------------- */}
      {!hintDismissed && !spot && (
        <div className="absolute bottom-24 left-1/2 z-30 hidden -translate-x-1/2 lg:block">
          <span className="flex items-center gap-2.5 rounded-full border border-white/25 bg-ink-900/50 px-4 py-2 text-[11px] tracking-[0.16em] text-white/85 uppercase backdrop-blur-md">
            <span className="relative grid h-3 w-3 place-items-center">
              <span className="absolute h-3 w-3 animate-ping-slow rounded-full bg-flame-400/70" />
              <span className="h-1.5 w-1.5 rounded-full bg-flame-400" />
            </span>
            Nhấn vào đốm sáng để xem giá
          </span>
        </div>
      )}

      {/* ---------------- Room tabs + arrows ---------------- */}
      <div className="absolute inset-x-0 bottom-0 z-30 border-t border-white/12 bg-gradient-to-t from-ink-900/70 to-transparent backdrop-blur-[2px]">
        <div className="mx-auto flex max-w-[1600px] items-stretch gap-4 px-5 sm:px-8">
          <div className="hide-scrollbar flex flex-1 items-center gap-1 overflow-x-auto py-3">
            {heroSlides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => goTo(i)}
                aria-current={i === active}
                className={`group relative shrink-0 rounded-full px-4 py-2 text-[11px] tracking-[0.18em] uppercase transition-colors ${
                  i === active ? 'text-white' : 'text-white/45 hover:text-white/80'
                }`}
              >
                <span className="mr-2 text-flame-400/80">{s.index}</span>
                {s.room}
                <span
                  className={`absolute inset-x-3 -bottom-0.5 h-px origin-left bg-flame-500 transition-transform duration-300 ${
                    i === active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="hidden items-center gap-2 py-3 sm:flex">
            <button
              type="button"
              onClick={() => goTo(active - 1)}
              aria-label="Không gian trước"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/25 text-white/80 transition-colors hover:border-flame-500 hover:bg-flame-500 hover:text-white"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => goTo(active + 1)}
              aria-label="Không gian tiếp theo"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/25 text-white/80 transition-colors hover:border-flame-500 hover:bg-flame-500 hover:text-white"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* autoplay progress */}
        <div className="h-[2px] w-full bg-white/10">
          <div
            key={`${active}-${progressKey}-${openSpot ? 'hold' : 'run'}`}
            className="h-full bg-flame-500"
            style={{
              animation: openSpot
                ? 'none'
                : `mt-progress ${AUTOPLAY_MS}ms linear forwards`,
              width: openSpot ? '100%' : undefined,
              opacity: openSpot ? 0.35 : 1,
            }}
          />
        </div>
      </div>

      {/* ---------------- Scroll cue ---------------- */}
      <div className="pointer-events-none absolute bottom-28 right-6 z-30 hidden flex-col items-center gap-3 lg:flex">
        <span className="text-[10px] tracking-[0.35em] text-white/60 uppercase [writing-mode:vertical-rl]">
          Scroll
        </span>
        <span className="h-14 w-px bg-white/25">
          <span className="block h-full w-full animate-scroll-hint bg-flame-500" />
        </span>
      </div>

      {/* ---------------- Product panel ---------------- */}
      <ProductPanel
        spot={spot}
        slide={slide}
        index={spotIndex}
        total={slide.hotspots.length}
        onClose={() => setOpenSpot(null)}
        onStep={stepSpot}
      />

      <style>{`@keyframes mt-progress { from { width: 0% } to { width: 100% } }`}</style>
    </section>
  )
}

/* ------------------------------------------------------------------ */

function ProductPanel({
  spot,
  slide,
  index,
  total,
  onClose,
  onStep,
}: {
  spot: Hotspot | null
  slide: HeroSlide
  index: number
  total: number
  onClose: () => void
  onStep: (dir: 1 | -1) => void
}) {
  const open = !!spot
  return (
    <aside
      aria-hidden={!open}
      className={`absolute z-40 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
        inset-x-3 bottom-[5.5rem]
        lg:inset-x-auto lg:bottom-auto lg:right-8 lg:top-1/2 lg:w-[27rem] lg:-translate-y-1/2
        ${open ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0 lg:translate-y-[calc(-50%+1.5rem)]'}`}
    >
      {spot && (
        <div
          key={spot.id}
          className="overflow-hidden rounded-2xl border border-white/15 bg-ink-900/80 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.75)] backdrop-blur-2xl"
          style={{ animation: 'mt-rise 600ms cubic-bezier(0.22,1,0.36,1) both' }}
        >
          <div className="h-[3px] w-full bg-gradient-to-r from-flame-400 via-flame-500 to-flame-700" />

          <div className="flex items-start justify-between gap-4 px-5 pt-4 sm:px-6">
            <div>
              <p className="eyebrow text-flame-400">{spot.category}</p>
              <p className="mt-1 text-[11px] tracking-wide text-white/45">
                {slide.room} · Mã {spot.sku}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Đóng"
              className="-mr-1 -mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-white/60 hover:text-white"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="px-5 sm:px-6">
            <h2 className="mt-3 font-display text-[1.75rem] leading-tight text-white">{spot.name}</h2>

            <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-2xl font-semibold text-flame-400">{formatVnd(spot.price)}</span>
              {spot.compareAt && (
                <span className="text-sm text-white/40 line-through">{formatVnd(spot.compareAt)}</span>
              )}
              {spot.badge && (
                <span className="rounded-full bg-flame-500/15 px-2.5 py-1 text-[10px] font-medium tracking-[0.14em] text-flame-300 uppercase ring-1 ring-flame-500/30">
                  {spot.badge}
                </span>
              )}
            </div>

            <dl className="mt-4 space-y-2 border-y border-white/10 py-4 text-[13px]">
              {[
                ['Chất liệu', spot.material],
                ['Kích thước', spot.size],
                ['Hoàn thiện', spot.finish],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-4">
                  <dt className="w-[5.5rem] shrink-0 text-white/45">{k}</dt>
                  <dd className="flex-1 text-white/85">{v}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-4 hidden text-[13px] leading-relaxed text-white/65 sm:block">{spot.blurb}</p>

            <div className="mt-5 flex gap-2.5">
              <AddToCartButton
                id={spot.id}
                label="Thêm vào giỏ"
                doneLabel="Đã thêm vào giỏ ✓"
                className="flex-1 rounded-full bg-flame-500 px-5 py-3 text-center text-[13px] font-medium tracking-wide text-white transition-colors hover:bg-flame-600"
              />
              <Link
                href="/san-pham"
                className="rounded-full border border-white/25 px-5 py-3 text-[13px] font-medium tracking-wide text-white/85 transition-colors hover:border-white hover:text-white"
              >
                Xem thêm
              </Link>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-white/10 px-5 py-3 sm:px-6">
            <span className="text-[11px] tracking-[0.16em] text-white/45 uppercase">
              Món {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onStep(-1)}
                aria-label="Món trước"
                className="grid h-8 w-8 place-items-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-flame-500 hover:text-flame-400"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => onStep(1)}
                aria-label="Món tiếp theo"
                className="grid h-8 w-8 place-items-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-flame-500 hover:text-flame-400"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}
