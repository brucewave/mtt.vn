import { heroSlides } from './hero-data'
import { categories } from './categories'
import { slugify } from './format'

export type Media = {
  src: string
  /**
   * When present, the image is a *crop* of a wider room photo taken around this
   * normalised point — the same coordinates the hero hotspots use. Lets a piece
   * of furniture be shown from a real interior shot instead of a stock cut-out.
   */
  x?: number
  y?: number
  /** How tight the crop is. Larger = closer in. */
  zoom?: number
}

export type CatalogItem = {
  id: string
  /** URL segment, derived from the name so product links read in Vietnamese. */
  slug: string
  /** A one-off piece — shown in its own section and never made twice. */
  limited?: boolean
  limitedNote?: string
  name: string
  category: string
  categoryId: string
  room: string
  sku: string
  price: number
  compareAt?: number
  badge?: string
  material: string
  size: string
  finish: string
  blurb: string
  media: Media
  colors: string[]
}

export { categories } from './categories'

/** Hero hotspot categories → the filter buckets used on the listing page. */
const CATEGORY_MAP: Record<string, string> = {
  'Sofa phòng khách': 'sofa',
  'Sofa tiếp khách': 'sofa',
  'Ghế bar': 'ghe',
  'Ghế đơn': 'ghe',
  'Ghế làm việc': 'ghe',
  'Ghế ăn': 'ghe',
  'Bàn trà · Đôn': 'ban',
  'Bàn làm việc': 'ban',
  'Bàn ăn': 'ban',
  'Tủ · Kệ': 'tu-ke',
  'Tủ bếp': 'tu-ke',
  'Kệ trang trí': 'tu-ke',
  'Vách trang trí': 'tu-ke',
  'Đảo bếp': 'bep',
  'Quầy bar · Bếp': 'bep',
  'Giường ngủ': 'phong-ngu',
  'Tab · Tủ đầu giường': 'phong-ngu',
  'Chăn ga gối': 'phong-ngu',
  'Chiếu sáng': 'den',
  'Chiếu sáng trang trí': 'den',
  'Gương · Trang trí': 'decor',
  'Phụ kiện trang trí': 'decor',
  'Rèm cửa': 'decor',
}

/** Room photos are requested smaller for crops — a card never needs 3840px. */
const cropSrc = (src: string) => src.replace(/w=\d+/, 'w=2400')

const PALETTES: Record<string, string[]> = {
  sofa: ['#6b4a3a', '#2f3b4a', '#c9bba8'],
  ghe: ['#2b2b2e', '#8a5a3b', '#b8b2a8'],
  ban: ['#8a6a44', '#1f2124', '#e3ded6'],
  'tu-ke': ['#3a2f28', '#d8d2c8', '#8f979f'],
  bep: ['#1f2124', '#a9855a', '#e6e2dc'],
  'phong-ngu': ['#cdbca8', '#8f8074', '#3b4250'],
  den: ['#d8b467', '#f2efe9', '#26282b'],
  decor: ['#b9764a', '#dad3c7', '#4e5357'],
}

/** The shape before the derived fields are attached. */
type CatalogSource = Omit<CatalogItem, 'slug' | 'limited' | 'limitedNote'>

/**
 * The pieces made once and not repeated, with the line each one carries.
 *
 * Kept as data rather than a flag on the item so the note and the flag can
 * never drift apart.
 */
const ONE_OFF: Record<string, string> = {
  'lv-sofa': 'Duy nhất 01 bản · cây nhung Ý cuối',
  'lv-chandelier': 'Duy nhất 01 bản · không nhập lại',
  'st-rust': 'Duy nhất 01 bản · một tấm da bò',
}

/** Every hero hotspot is a real, spec'd product — reuse it as catalog stock. */
const fromHero: CatalogSource[] = heroSlides.flatMap((slide) =>
  slide.hotspots.map((h) => {
    const categoryId = CATEGORY_MAP[h.category] ?? 'decor'
    return {
      id: h.id,
      name: h.name,
      category: h.category,
      categoryId,
      room: slide.room,
      sku: h.sku,
      price: h.price,
      compareAt: h.compareAt,
      badge: h.badge,
      material: h.material,
      size: h.size,
      finish: h.finish,
      blurb: h.blurb,
      media: {
        src: cropSrc(slide.image),
        x: h.x,
        y: h.y,
        // A product card is a tall box, so it needs a tighter crop than the
        // wide hero push-in that the same number drives there.
        zoom: Math.min(6, Math.max(3.6, h.zoom * 1.7)),
      },
      colors: PALETTES[categoryId] ?? PALETTES.decor,
    }
  }),
)

const px = (id: number, slug: string, w = 1400) =>
  `https://images.pexels.com/photos/${id}/${slug}.jpeg?auto=compress&cs=tinysrgb&w=${w}`

/** Catalogue-only pieces that don't appear in any hero scene. */
const standalone: CatalogSource[] = [
  {
    id: 'st-halden',
    name: 'Sofa băng "Halden"',
    category: 'Sofa phòng khách',
    categoryId: 'sofa',
    room: 'Phòng khách',
    sku: 'MT-SF-3120',
    price: 32900000,
    compareAt: 38500000,
    badge: 'Giảm 15%',
    material: 'Vải bố Bỉ chống bám bẩn · Khung gỗ sồi',
    size: 'D2200 × R900 × C820 mm',
    finish: 'Xám khói / chân gỗ tần bì',
    blurb:
      'Vải bố Bỉ xử lý chống thấm, nước đổ lên gạt đi được trước khi kịp ngấm. Đệm tháo rời giặt riêng từng tấm.',
    media: { src: px(18810450, 'pexels-photo-18810450') },
    colors: ['#9a9490', '#3f4750', '#c9b7a3'],
  },
  {
    id: 'st-cocoon',
    name: 'Ghế thư giãn "Cocoon"',
    category: 'Ghế đơn',
    categoryId: 'ghe',
    room: 'Phòng khách',
    sku: 'MT-GD-0470',
    price: 12800000,
    badge: 'Mới',
    material: 'Nhựa composite đúc · Nệm nỉ · Chân thép mạ',
    size: 'D780 × R720 × C900 mm',
    finish: 'Vàng mustard / đen',
    blurb:
      'Lòng ghế đúc liền ôm trọn lưng và hông, ngồi đọc sách hàng giờ không mỏi. Xoay 360° trên trục bi.',
    media: { src: px(6794964, 'pexels-photo-6794964') },
    colors: ['#c8a13c', '#6f6a5c', '#2f3134'],
  },
  {
    id: 'st-rust',
    name: 'Ghế bành da "Rust"',
    category: 'Ghế đơn',
    categoryId: 'ghe',
    room: 'Phòng khách',
    sku: 'MT-GD-0512',
    price: 21500000,
    material: 'Da bò thật full-grain · Khung thép sơn tĩnh điện',
    size: 'D700 × R800 × C760 mm',
    finish: 'Nâu cognac',
    blurb:
      'Da full-grain để mộc, càng dùng càng lên patina. Khung thép hàn liền, chịu tải 150kg.',
    media: { src: px(6373478, 'pexels-photo-6373478') },
    colors: ['#8b5e3c', '#3b2f2a', '#a8845f'],
  },
  {
    id: 'st-nordic',
    name: 'Combo đèn bàn & tab "Nordic"',
    category: 'Chiếu sáng',
    categoryId: 'den',
    room: 'Phòng ngủ',
    sku: 'MT-CB-0210',
    price: 6900000,
    compareAt: 8200000,
    badge: 'Combo',
    material: 'Gỗ tần bì tự nhiên · Chụp vải lanh',
    size: 'Tab D450 × R400 × C520 mm · đèn C480 mm',
    finish: 'Gỗ sáng / chụp trắng ngà',
    blurb:
      'Mua theo bộ rẻ hơn 16% so với mua lẻ. Tab có một ngăn kéo và một hộc mở, đủ cho sách và đồ cá nhân.',
    media: { src: px(707579, 'pexels-photo-707579') },
    colors: ['#cbbfae', '#93999f', '#1f2124'],
  },
  {
    id: 'st-arc',
    name: 'Ghế bành "Arc"',
    category: 'Ghế đơn',
    categoryId: 'ghe',
    room: 'Phòng khách',
    sku: 'MT-GD-0620',
    price: 14200000,
    material: 'Khung gỗ óc chó · Nệm nỉ bọc rời',
    size: 'D680 × R760 × C740 mm',
    finish: 'Óc chó / nệm xám',
    blurb:
      'Tay vịn vát mỏng dần về phía trước, nhìn nhẹ nhưng vẫn chắc. Nệm bọc rời, thay vỏ được sau vài năm.',
    media: { src: px(8389903, 'pexels-photo-8389903') },
    colors: ['#5d6167', '#b3a897', '#20232a'],
  },
  {
    id: 'st-linen',
    name: 'Sofa vải "Linen White"',
    category: 'Sofa phòng khách',
    categoryId: 'sofa',
    room: 'Phòng khách',
    sku: 'MT-SF-3340',
    price: 27600000,
    badge: 'Bán chạy',
    material: 'Vải lanh pha cotton · Khung gỗ dầu tẩm sấy',
    size: 'D1900 × R850 × C780 mm',
    finish: 'Trắng ngà',
    blurb:
      'Tông trắng ngà hợp căn hộ nhỏ vì không "ăn" diện tích thị giác. Vỏ bọc tháo giặt máy ở chế độ nhẹ.',
    media: { src: px(3965534, 'pexels-photo-3965534') },
    colors: ['#e5e1da', '#b9a893', '#7d8288'],
  },
  {
    id: 'st-ruby',
    name: 'Ghế đơn "Ruby"',
    category: 'Ghế đơn',
    categoryId: 'ghe',
    room: 'Phòng khách',
    sku: 'MT-GD-0705',
    price: 9800000,
    material: 'Nhung tăm · Mút D30 · Chân gỗ giấu',
    size: 'D720 × R680 × C700 mm',
    finish: 'Đỏ rượu vang',
    blurb:
      'Một điểm nhấn màu cho phòng khách trung tính. Phom bo tròn không góc cạnh, an toàn cho nhà có trẻ nhỏ.',
    media: { src: px(5662650, 'pexels-photo-5662650') },
    colors: ['#a8322c', '#c7c1bb', '#2c2c2e'],
  },
  {
    id: 'st-sunroom',
    name: 'Bộ đôi ghế & bàn "Sunroom"',
    category: 'Ghế đơn',
    categoryId: 'ghe',
    room: 'Phòng khách',
    sku: 'MT-CB-0840',
    price: 34500000,
    badge: 'Trọn bộ',
    material: 'Khung thép sơn tĩnh điện · Nệm nỉ · Mặt bàn gỗ',
    size: 'Bộ 2 ghế D680 + bàn Ø550 mm',
    finish: 'Cam đất / khung đen',
    blurb:
      'Bộ góc đọc sách cạnh cửa sổ. Nệm dùng vải chống phai màu, không bạc dù đặt chỗ nắng chiếu trực tiếp.',
    media: { src: px(36962663, 'pexels-photo-36962663') },
    colors: ['#8b7f6d', '#d5cec2', '#43403a'],
  },
]

export const catalog: CatalogItem[] = [...fromHero, ...standalone].map((item) => ({
  ...item,
  slug: slugify(item.name),
  ...(ONE_OFF[item.id] ? { limited: true, limitedNote: ONE_OFF[item.id] } : {}),
}))

export const catalogById = new Map(catalog.map((i) => [i.id, i]))
export const catalogBySlug = new Map(catalog.map((i) => [i.slug, i]))

export const getItem = (id: string) => catalogById.get(id)
export const getItemBySlug = (slug: string) => catalogBySlug.get(slug)

/** The one-off pieces, newest first, for the section on the front page. */
export const oneOffItems = catalog.filter((i) => i.limited)

/**
 * Pieces worth showing next to `item` — same category first, then the same
 * room, so a sofa page does not recommend a table lamp.
 */
export const relatedItems = (item: CatalogItem, limit = 4) =>
  catalog
    .filter((i) => i.id !== item.id)
    .map((i) => ({
      item: i,
      score: (i.categoryId === item.categoryId ? 2 : 0) + (i.room === item.room ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.item)

/** The aspect ratio (height ÷ width) every source room photo is shot at. */
export const SOURCE_ASPECT = 2 / 3

/**
 * Where to hang a crop-type photo inside a box of the given aspect ratio
 * (height ÷ width), as percentages of *that box*.
 *
 * Derived from the background-position percentage rule — an image point at
 * fraction f lands at container fraction p when `p = (0.5 − f·Z) / (1 − Z)` —
 * then converted from `background-size`/`background-position` into an oversized
 * child element, so the photo can go through `next/image` instead of being
 * hotlinked at full size by a CSS `url()`. Returns null for plain photos.
 */
export function cropGeometry(item: CatalogItem, aspect: number, override?: number) {
  const { x, y } = item.media
  if (x === undefined || y === undefined) return null

  const zoom = override ?? item.media.zoom ?? 3
  const clamp = (v: number) => Math.max(0, Math.min(100, v))
  const px = clamp((100 * (0.5 - x * zoom)) / (1 - zoom))
  const py = clamp(
    (100 * (aspect / 2 - y * zoom * SOURCE_ASPECT)) / (aspect - zoom * SOURCE_ASPECT),
  )

  return {
    zoom,
    /** Child width, as a percentage of the box. */
    width: zoom * 100,
    /** Offsets are negative — the photo overhangs the box on both axes. */
    left: px * (1 - zoom),
    top: (py * (aspect - zoom * SOURCE_ASPECT)) / aspect,
  }
}

export { formatVnd, slugify } from './format'
