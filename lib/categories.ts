/**
 * The filter buckets, kept apart from the catalogue itself so the header can
 * list them without downloading every product.
 */
export const categories = [
  { id: 'all', label: 'Tất cả' },
  { id: 'sofa', label: 'Sofa' },
  { id: 'ghe', label: 'Ghế' },
  { id: 'ban', label: 'Bàn' },
  { id: 'tu-ke', label: 'Tủ & kệ' },
  { id: 'bep', label: 'Bếp' },
  { id: 'phong-ngu', label: 'Phòng ngủ' },
  { id: 'den', label: 'Chiếu sáng' },
  { id: 'decor', label: 'Décor & rèm' },
] as const

/** Blog sections, used by the index filter. */
export const blogCategories = [
  { id: 'all', label: 'Tất cả' },
  { id: 'Kinh nghiệm', label: 'Kinh nghiệm' },
  { id: 'Vật liệu', label: 'Vật liệu' },
  { id: 'Chi phí', label: 'Chi phí' },
  { id: 'Phong cách', label: 'Phong cách' },
  { id: 'Bảo quản', label: 'Bảo quản' },
] as const
