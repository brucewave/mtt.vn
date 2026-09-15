/**
 * Image loader for the static export.
 *
 * A static build has no Next.js image optimiser behind it, so the resizing has
 * to be done by whoever serves the file. Every remote photo here comes from
 * Pexels, which resizes on its own CDN through the `w=` query parameter — so
 * asking it for the width the layout actually needs keeps the responsive
 * srcset working. Without this, `images.unoptimized` would hand every card the
 * full 2400px original.
 *
 * Files under `public/` are returned untouched: there is nothing to resize them
 * with, and they are small and fixed-size already.
 */
export default function pexelsLoader({ src, width }: { src: string; width: number }) {
  if (!src.startsWith('http')) return src

  return src.includes('w=')
    ? src.replace(/([?&])w=\d+/, `$1w=${width}`)
    : `${src}${src.includes('?') ? '&' : '?'}w=${width}`
}
