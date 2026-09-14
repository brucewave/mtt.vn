/**
 * Formatting helpers with no data behind them.
 *
 * Deliberately their own module: client components need `formatVnd`, and
 * importing it from `catalog.ts` would ship the whole catalogue with it.
 */

export const formatVnd = (value: number) =>
  new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 0 }).format(Math.round(value)) + '₫'

/** Vietnamese-safe URL segment: drops the tone marks and folds đ to d. */
export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
