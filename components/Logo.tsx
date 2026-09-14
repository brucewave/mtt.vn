import Image from 'next/image'
import { brand } from '@/lib/brand'

type LogoProps = {
  /** `color` = logo as supplied; `light` = knocked out to white for dark surfaces. */
  tone?: 'color' | 'light'
  className?: string
  priority?: boolean
}

const W = 503
const H = 139

/**
 * The MtT Deco logotype.
 *
 * On dark surfaces the artwork is knocked out to flat white rather than
 * recoloured: the mark is a single solid shape, so `brightness(0) invert(1)`
 * gives a clean silhouette and there is no gradient left to muddy.
 */
export default function Logo({ tone = 'color', className, priority = false }: LogoProps) {
  return (
    <Image
      src={brand.logo}
      alt={brand.name}
      width={W}
      height={H}
      priority={priority}
      className={className}
      style={tone === 'light' ? { filter: 'brightness(0) invert(1)' } : undefined}
    />
  )
}
