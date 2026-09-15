const px = (id: number, slug: string, w = 1400, ext: 'jpeg' | 'png' = 'jpeg') =>
  `https://images.pexels.com/photos/${id}/${slug}.${ext}?auto=compress&cs=tinysrgb&w=${w}`

export const navLinks = [
  { label: 'Sản phẩm', href: '/san-pham' },
  { label: 'Dự án', href: '/du-an' },
  { label: 'Quy trình', href: '/quy-trinh' },
  { label: 'Blog', href: '/blog' },
  { label: 'Về MtT Deco', href: '/gioi-thieu' },
  { label: 'Liên hệ', href: '/lien-he' },
]

export const stats = [
  { value: '5', suffix: '+ năm', label: 'Thiết kế & thi công nội thất' },
  { value: '100', suffix: '+', label: 'Công trình đã bàn giao' },
  { value: '38', suffix: '', label: 'Kiến trúc sư & thợ mộc lành nghề' },
  { value: '2', suffix: '+ năm', label: 'Bảo hành khung & cấu kiện gỗ' },
]

export const categories = [
  {
    name: 'Phòng khách',
    count: 148,
    href: '/san-pham',
    image: px(12277016, 'pexels-photo-12277016'),
    span: 'lg:col-span-2 lg:row-span-2',
    blurb: 'Sofa, bàn trà, vách tivi, kệ trang trí',
  },
  {
    name: 'Phòng ngủ',
    count: 96,
    href: '/san-pham',
    image: px(8135248, 'pexels-photo-8135248'),
    span: '',
    blurb: 'Giường, tab, tủ áo, chăn ga',
  },
  {
    name: 'Phòng bếp',
    count: 74,
    href: '/san-pham',
    image: px(7214158, 'pexels-photo-7214158'),
    span: '',
    blurb: 'Tủ bếp, đảo bếp, ghế bar',
  },
  {
    name: 'Bàn ăn',
    count: 52,
    href: '/san-pham',
    image: px(27497441, 'pexels-photo-27497441'),
    span: '',
    blurb: 'Bàn ăn, ghế ăn, tủ rượu',
  },
  {
    name: 'Văn phòng',
    count: 61,
    href: '/san-pham',
    image: px(7166632, 'pexels-photo-7166632'),
    span: '',
    blurb: 'Bàn giám đốc, ghế xoay, vách ngăn',
  },
  {
    name: 'Chiếu sáng & décor',
    count: 210,
    href: '/san-pham',
    image: px(35674372, 'pexels-photo-35674372'),
    span: 'sm:col-span-2 lg:col-span-4',
    blurb: 'Đèn thả, đèn bàn, gương, thảm',
  },
]

export type Product = {
  id: string
  name: string
  category: string
  price: number
  compareAt?: number
  badge?: string
  image: string
  colors: string[]
}

export const featuredProducts: Product[] = [
  {
    id: 'p1',
    name: 'Sofa băng "Halden"',
    category: 'Sofa phòng khách',
    price: 32900000,
    compareAt: 38500000,
    badge: 'Giảm 15%',
    image: px(18810450, 'pexels-photo-18810450'),
    colors: ['#9a9490', '#3f4750', '#c9b7a3'],
  },
  {
    id: 'p2',
    name: 'Ghế thư giãn "Cocoon"',
    category: 'Ghế đơn',
    price: 12800000,
    badge: 'Mới',
    image: px(6794964, 'pexels-photo-6794964'),
    colors: ['#c8a13c', '#6f6a5c', '#2f3134'],
  },
  {
    id: 'p3',
    name: 'Ghế bành da "Rust"',
    category: 'Ghế đơn',
    price: 21500000,
    image: px(6373478, 'pexels-photo-6373478'),
    colors: ['#8b5e3c', '#3b2f2a', '#a8845f'],
  },
  {
    id: 'p4',
    name: 'Đèn bàn & tab "Nordic"',
    category: 'Chiếu sáng',
    price: 6900000,
    compareAt: 8200000,
    badge: 'Combo',
    image: px(707579, 'pexels-photo-707579'),
    colors: ['#cbbfae', '#93999f', '#1f2124'],
  },
  {
    id: 'p5',
    name: 'Ghế bành "Arc"',
    category: 'Ghế đơn',
    price: 14200000,
    image: px(8389903, 'pexels-photo-8389903'),
    colors: ['#5d6167', '#b3a897', '#20232a'],
  },
  {
    id: 'p6',
    name: 'Sofa vải "Linen White"',
    category: 'Sofa phòng khách',
    price: 27600000,
    badge: 'Bán chạy',
    image: px(3965534, 'pexels-photo-3965534'),
    colors: ['#e5e1da', '#b9a893', '#7d8288'],
  },
  {
    id: 'p7',
    name: 'Ghế đơn "Ruby"',
    category: 'Ghế đơn',
    price: 9800000,
    image: px(5662650, 'pexels-photo-5662650'),
    colors: ['#a8322c', '#c7c1bb', '#2c2c2e'],
  },
  {
    id: 'p8',
    name: 'Bộ đôi ghế & bàn "Sunroom"',
    category: 'Ghế đơn',
    price: 34500000,
    badge: 'Trọn bộ',
    image: px(36962663, 'pexels-photo-36962663'),
    colors: ['#8b7f6d', '#d5cec2', '#43403a'],
  },
]

export const projects = [
  {
    name: 'Duplex Vinhomes Central Park',
    scope: 'Trọn gói · 214 m²',
    year: '2025',
    style: 'Tân cổ điển',
    image: px(7546323, 'pexels-photo-7546323'),
  },
  {
    name: 'Nhà vườn Bảo Lộc',
    scope: 'Bếp & phòng sinh hoạt · 160 m²',
    year: '2025',
    style: 'Japandi',
    image: px(7061402, 'pexels-photo-7061402'),
  },
  {
    name: 'Penthouse The Marq',
    scope: 'Khu vực ngủ · 96 m²',
    year: '2024',
    style: 'Luxury tối giản',
    image: px(8134809, 'pexels-photo-8134809'),
  },
  {
    name: 'Căn hộ Masteri Thảo Điền',
    scope: 'Trọn gói · 78 m²',
    year: '2024',
    style: 'Scandinavian',
    image: px(6987730, 'pexels-photo-6987730'),
  },
  {
    name: 'Villa Thảo Điền',
    scope: 'Phòng khách & sảnh · 320 m²',
    year: '2023',
    style: 'Contemporary',
    image: px(16985123, 'pexels-photo-16985123'),
  },
  {
    name: 'Office Keangnam Landmark',
    scope: 'Văn phòng đại diện · 240 m²',
    year: '2023',
    style: 'Executive',
    image: px(7166630, 'pexels-photo-7166630'),
  },
]

export const processSteps = [
  {
    no: '01',
    title: 'Khảo sát & đo đạc',
    time: '1–2 ngày',
    body: 'Kiến trúc sư đến tận nơi đo hiện trạng, ghi nhận hướng nắng, vị trí điện nước và thói quen sinh hoạt của gia đình.',
  },
  {
    no: '02',
    title: 'Concept & phối cảnh 3D',
    time: '5–7 ngày',
    body: 'Bạn nhận 2 phương án phối cảnh 3D và bảng vật liệu thật. Chỉnh sửa miễn phí đến khi ưng ý.',
  },
  {
    no: '03',
    title: 'Bản vẽ kỹ thuật & báo giá',
    time: '3–5 ngày',
    body: 'Bóc tách từng cấu kiện, báo giá minh bạch theo mã sản phẩm. Không phát sinh ngoài hợp đồng.',
  },
  {
    no: '04',
    title: 'Sản xuất tại xưởng',
    time: '20–30 ngày',
    body: 'Xưởng 4.000 m² tại Bình Dương. Bạn được mời tới nghiệm thu sản phẩm mộc trước khi sơn hoàn thiện.',
  },
  {
    no: '05',
    title: 'Lắp đặt & bàn giao',
    time: '3–7 ngày',
    body: 'Đội lắp đặt phủ bạt bảo vệ sàn, thi công gọn, dọn sạch và bàn giao kèm hồ sơ bảo hành từng món.',
  },
  {
    no: '06',
    title: 'Bảo hành & chăm sóc',
    time: '5 năm',
    body: 'Bảo hành khung gỗ 5 năm, phụ kiện 2 năm. Bảo dưỡng định kỳ miễn phí trong 12 tháng đầu.',
  },
]

export const testimonials = [
  {
    quote:
      'Điều mình thích nhất là được lên xưởng nghiệm thu phần mộc trước khi sơn. Nhìn tận mắt mộng gỗ, thấy yên tâm hẳn so với chỉ xem ảnh 3D.',
    name: 'Chị Nguyễn Thu Hà',
    role: 'Duplex 214 m² · Vinhomes Central Park',
    avatar: px(1520760, 'pexels-photo-1520760', 300),
  },
  {
    quote:
      'Báo giá bóc tách theo từng mã sản phẩm nên mình biết chính xác tiền đi đâu. Kết thúc dự án đúng bằng con số ký hợp đồng, không phát sinh.',
    name: 'Anh Trần Quốc Bảo',
    role: 'Văn phòng 240 m² · Keangnam Landmark',
    avatar: px(5308640, 'pexels-photo-5308640', 300),
  },
  {
    quote:
      'Nhà mình có bé nhỏ nên yêu cầu bo hết cạnh và dùng sơn gốc nước. MtT Deco làm đúng như vậy và còn tự đề xuất thêm chốt an toàn cho ngăn kéo.',
    name: 'Chị Lê Minh Châu',
    role: 'Căn hộ 78 m² · Masteri Thảo Điền',
    avatar: px(14587417, 'pexels-photo-14587417', 300),
  },
  {
    quote:
      'Đội lắp đặt phủ bạt kín sàn, làm xong hút bụi sạch sẽ mới về. Chi tiết nhỏ nhưng nói lên cách một đơn vị tôn trọng nhà của khách.',
    name: 'Anh Phạm Hoàng Nam',
    role: 'Nhà vườn 160 m² · Bảo Lộc',
    avatar: px(33815738, 'pexels-photo-33815738', 300),
  },
]

export const aboutImages = {
  main: px(7480729, 'pexels-photo-7480729', 1200),
  detail: px(5711767, 'pexels-photo-5711767', 900),
}

export const showroom = {
  address: '218 Nguyễn Văn Hưởng, Thảo Điền, TP. Thủ Đức, TP.HCM',
  factory: 'Xưởng sản xuất: KCN Sóng Thần 2, Dĩ An, Bình Dương',
  phone: '0909 218 218',
  email: 'xinchao@mtt.vn',
  hours: 'Thứ 2 – Chủ nhật · 08:30 – 20:00',
}
