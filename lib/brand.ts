/**
 * Brand constants.
 *
 * One place for the things that appear in metadata, structured data and the
 * chrome, so renaming the company is a single edit rather than a grep.
 */

export const brand = {
  name: 'MtT Deco',
  /** Used where the full legal entity belongs — invoices, schema, the quote sheet. */
  legal: 'CÔNG TY TNHH NỘI THẤT MtT DECO',
  tagline: 'Thiết kế & thi công nội thất trọn gói',
  description:
    'MtT Deco thiết kế và thi công nội thất trọn gói cho căn hộ, nhà phố, biệt thự và văn phòng. Tự sản xuất tại xưởng 4.000 m², bảo hành khung gỗ 5 năm, báo giá bóc tách minh bạch.',
  /**
   * Canonical origin. Vercel exposes the deployment host, but a preview URL must
   * never end up in a canonical tag or in structured data, so a real domain wins
   * whenever one is configured.
   */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_ENV === 'production' && process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'https://mtt.vn'),
  logo: '/mtt-logo.png',
  logoSquare: '/mtt-logo-square.png',
} as const

/**
 * The company this one belongs to.
 *
 * MtT is a subsidiary, and someone deciding whether to trust a small brand with
 * a 78-million-đồng order is exactly who that link is for.
 */
export const parentCompany = {
  label: 'Thành viên của',
  name: 'MT House',
  url: 'https://mthouse.vn/',
}

/** The strip of promises that closes every page. */
export const usps = [
  { title: 'Bảo hành 5 năm', note: 'Khung gỗ và cấu kiện, phụ kiện kim khí 2 năm' },
  { title: 'Giao & lắp tận nơi', note: 'Miễn phí trong bán kính 30km cho đơn từ 20 triệu' },
  { title: 'Xưởng sản xuất riêng', note: '4.000 m² tại Bình Dương, không qua trung gian' },
  { title: 'Đổi trả 7 ngày', note: 'Nếu sản phẩm lỗi từ nhà sản xuất' },
]

/** Copy for the one-off pieces section. */
export const oneOff = {
  eyebrow: 'Hàng độc bản',
  title: 'Làm một lần,',
  accent: 'không có bản thứ hai',
  lead: 'Mỗi món ở đây làm từ một tấm gỗ, một tấm da hoặc một cây vải không lặp lại. Đóng xong là dừng — chúng tôi không nhận đóng bản giống hệt, kể cả khi bạn hỏi.',
}
