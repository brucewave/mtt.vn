const ONES = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín']
const SCALES = ['', ' nghìn', ' triệu', ' tỷ', ' nghìn tỷ', ' triệu tỷ']

/** Reads one 3-digit group. `full` forces the leading "không trăm" filler. */
function readGroup(n: number, full: boolean): string {
  const tram = Math.floor(n / 100)
  const chuc = Math.floor((n % 100) / 10)
  const dv = n % 10
  const out: string[] = []

  if (tram > 0 || full) out.push(`${ONES[tram]} trăm`)

  if (chuc > 1) {
    out.push(`${ONES[chuc]} mươi`)
    if (dv === 1) out.push('mốt')
    else if (dv === 4) out.push('tư')
    else if (dv === 5) out.push('lăm')
    else if (dv > 0) out.push(ONES[dv])
  } else if (chuc === 1) {
    out.push('mười')
    if (dv === 1) out.push('một')
    else if (dv === 5) out.push('lăm')
    else if (dv > 0) out.push(ONES[dv])
  } else if (dv > 0) {
    // "một trăm lẻ năm" — the filler only appears when something precedes it.
    if (tram > 0 || full) out.push('lẻ')
    out.push(ONES[dv])
  }

  return out.join(' ')
}

/**
 * Vietnamese amount in words, as Vietnamese quotes and invoices print it.
 * `docSoTien(1250000)` → "Một triệu hai trăm năm mươi nghìn đồng".
 */
export function docSoTien(amount: number): string {
  const n = Math.round(Math.abs(amount))
  if (n === 0) return 'Không đồng'

  const groups: number[] = []
  let rest = n
  while (rest > 0) {
    groups.push(rest % 1000)
    rest = Math.floor(rest / 1000)
  }

  const parts: string[] = []
  for (let i = groups.length - 1; i >= 0; i--) {
    if (groups[i] === 0) continue
    // Groups after the most significant one keep their "không trăm" filler so
    // 1_002_000 reads "một triệu không trăm lẻ hai nghìn".
    parts.push(readGroup(groups[i], i !== groups.length - 1) + SCALES[i])
  }

  const text = (amount < 0 ? 'âm ' : '') + parts.join(' ').replace(/\s+/g, ' ').trim() + ' đồng'
  return text.charAt(0).toUpperCase() + text.slice(1)
}
