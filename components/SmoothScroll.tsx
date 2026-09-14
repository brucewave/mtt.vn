'use client'

import { useEffect } from 'react'

/**
 * How much of the remaining distance to cover each frame.
 *
 * Lower is a longer glide. At 0.09 a single wheel notch takes roughly
 * three-quarters of a second to settle — enough to read as deliberate rather
 * than as lag.
 */
const EASE = 0.09
/** Below this the animation has visually arrived. */
const SETTLE = 0.4

/**
 * Eased page scrolling.
 *
 * Drives the real `window.scrollTo` rather than transforming a wrapper, which
 * is what most smooth-scroll libraries do. Keeping the browser's own scroll
 * position means `position: sticky` (the filter bar), anchor links, the fixed
 * header and browser find-in-page all keep working — a transformed wrapper
 * breaks every one of them.
 *
 * Off on touch (where the OS already has momentum), off for anyone who asked
 * for reduced motion, and off while an overlay has the page locked.
 */
export default function SmoothScroll() {
  useEffect(() => {
    // A phone or trackpad-less tablet already scrolls with momentum; adding
    // ours on top just makes it feel laggy.
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const doc = document
    const root = doc.documentElement

    let target = window.scrollY
    let current = window.scrollY
    let running = false
    let limit = 0

    const measure = () => {
      limit = Math.max(0, root.scrollHeight - window.innerHeight)
    }

    measure()

    // The CSS smooth behaviour would ease our own scrollTo calls a second time.
    root.classList.add('mt-smooth')

    const clamp = (v: number) => Math.max(0, Math.min(v, limit))

    const tick = () => {
      const diff = target - current

      if (Math.abs(diff) < SETTLE) {
        current = target
        window.scrollTo(0, current)
        running = false
        return
      }

      current += diff * EASE
      window.scrollTo(0, current)
      window.requestAnimationFrame(tick)
    }

    const start = () => {
      if (!running) {
        running = true
        window.requestAnimationFrame(tick)
      }
    }

    /**
     * Is the pointer over something that scrolls on its own — the category chip
     * row, a wide table, the hero's product rail?
     */
    const overScroller = (node: Node | null) => {
      while (node && node !== doc.body && node !== root) {
        if (node.nodeType === 1) {
          const el = node as Element
          const style = window.getComputedStyle(el)

          if (
            el.scrollHeight > el.clientHeight + 1 &&
            (style.overflowY === 'auto' || style.overflowY === 'scroll')
          ) {
            return true
          }

          if (
            el.scrollWidth > el.clientWidth + 1 &&
            (style.overflowX === 'auto' || style.overflowX === 'scroll')
          ) {
            return true
          }
        }

        node = node.parentNode
      }

      return false
    }

    const onWheel = (e: WheelEvent) => {
      // Pinch-zoom, and anything already claimed.
      if (e.ctrlKey || e.defaultPrevented) return
      // The drawer and the search overlay lock the page while open.
      if (doc.body.style.overflow === 'hidden') return
      if (overScroller(e.target as Node)) return

      e.preventDefault()

      // deltaMode 1 is lines, 2 is pages; normalise both to pixels.
      let delta = e.deltaY
      if (e.deltaMode === 1) delta *= 16
      else if (e.deltaMode === 2) delta *= window.innerHeight

      measure()
      target = clamp(target + delta)
      start()
    }

    // Anything that moves the page some other way — the scrollbar, the
    // keyboard, a route change — becomes the new starting point.
    const onScroll = () => {
      if (!running) {
        target = window.scrollY
        current = window.scrollY
      }
    }

    const headerOffset = () => (doc.querySelector('header')?.offsetHeight ?? 0) + 16

    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a[href*="#"]') as HTMLAnchorElement | null
      if (!link || link.target === '_blank') return

      const url = new URL(link.href, window.location.href)
      // Only links pointing at a fragment of the page we are already on.
      if (url.pathname !== window.location.pathname || url.origin !== window.location.origin) return

      const id = url.hash.slice(1)
      if (!id) return

      const node = doc.getElementById(id)
      if (!node) return

      e.preventDefault()
      measure()
      target = clamp(window.scrollY + node.getBoundingClientRect().top - headerOffset())
      start()

      // Keep the address bar and the back button honest.
      window.history.pushState(null, '', url.hash)
    }

    // Images and lazy sections change the page height as they arrive.
    const observer = new ResizeObserver(measure)
    observer.observe(doc.body)

    window.addEventListener('resize', measure)
    doc.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('scroll', onScroll, { passive: true })
    doc.addEventListener('click', onClick)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
      doc.removeEventListener('wheel', onWheel)
      window.removeEventListener('scroll', onScroll)
      doc.removeEventListener('click', onClick)
      root.classList.remove('mt-smooth')
    }
  }, [])

  return null
}
