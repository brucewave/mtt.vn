import Image from 'next/image'
import { cropGeometry, SOURCE_ASPECT, type CatalogItem } from '@/lib/catalog'

/**
 * A crop shows only 1/zoom of the photo's width, so the photo has to be laid
 * out that many times wider than the box it peeks through — and `sizes` has to
 * say so, or the optimiser serves a picture that goes soft once magnified.
 */
function scaleSizes(sizes: string, zoom: number) {
  return sizes.replace(/(\d+(?:\.\d+)?)vw/g, (_, n) => `${Math.min(300, Number(n) * zoom)}vw`)
}

/**
 * Renders a catalogue item's picture. Items lifted out of a hero scene have no
 * cut-out photo of their own, so they're shown as a crop of the room shot they
 * actually live in — `aspect` is the box's height ÷ width.
 */
export default function ProductMedia({
  item,
  aspect,
  sizes = '(max-width: 768px) 50vw, 25vw',
  className = '',
  priority = false,
}: {
  item: CatalogItem
  aspect: number
  sizes?: string
  className?: string
  priority?: boolean
}) {
  const crop = cropGeometry(item, aspect)

  if (crop) {
    return (
      <Image
        src={item.media.src}
        alt={item.name}
        width={1600}
        height={Math.round(1600 * SOURCE_ASPECT)}
        sizes={scaleSizes(sizes, crop.zoom)}
        priority={priority}
        style={{
          width: `${crop.width.toFixed(2)}%`,
          height: 'auto',
          maxWidth: 'none',
          left: `${crop.left.toFixed(2)}%`,
          top: `${crop.top.toFixed(2)}%`,
        }}
        className={`absolute ${className}`}
      />
    )
  }

  return (
    <Image
      src={item.media.src}
      alt={item.name}
      fill
      sizes={sizes}
      priority={priority}
      className={`object-cover ${className}`}
    />
  )
}
