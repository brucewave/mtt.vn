/**
 * Hero showcase data.
 *
 * Every `x` / `y` below is a normalised coordinate (0 → 1) measured against the
 * slide photo itself, so a hotspot sits on the real piece of furniture no matter
 * how the image is cropped by `object-cover`. Coordinates were read off the
 * source photos directly — do not "tidy" them into round numbers.
 */

export type Hotspot = {
  id: string
  /** 0 = left edge of the photo, 1 = right edge */
  x: number
  /** 0 = top edge of the photo, 1 = bottom edge */
  y: number
  /** How far to push in when this hotspot is opened */
  zoom: number
  name: string
  category: string
  sku: string
  price: number
  compareAt?: number
  badge?: string
  material: string
  size: string
  finish: string
  blurb: string
}

export type HeroSlide = {
  id: string
  index: string
  room: string
  title: string
  titleAccent: string
  caption: string
  project: string
  image: string
  /** object-position for the wide crop, tuned per photo */
  focus: string
  hotspots: Hotspot[]
}

const px = (id: number, slug: string, w = 3840) =>
  `https://images.pexels.com/photos/${id}/${slug}.jpeg?auto=compress&cs=tinysrgb&w=${w}`

export const heroSlides: HeroSlide[] = [
  {
    id: 'living',
    index: '01',
    room: 'Phòng khách',
    title: 'Phòng khách',
    titleAccent: 'Sang trọng',
    caption:
      'Bộ sofa tân cổ điển bọc nhung, đèn chùm pha lê và tủ vân đá tự nhiên — một không gian tiếp khách cân đối giữa ấm áp và quyền lực.',
    project: 'Căn hộ Duplex · Vinhomes Central Park, TP.HCM',
    image: px(8135492, 'pexels-photo-8135492'),
    focus: '50% 55%',
    hotspots: [
      {
        id: 'lv-sofa',
        x: 0.455,
        y: 0.6,
        zoom: 2.4,
        name: 'Sofa góc Chesterfield "Milano"',
        category: 'Sofa phòng khách',
        sku: 'MT-SF-2140',
        price: 78500000,
        compareAt: 94000000,
        badge: 'Bán chạy',
        material: 'Khung gỗ sồi Mỹ · Nhung Ý cao cấp',
        size: 'D3200 × R2100 × C780 mm',
        finish: 'Nâu cà phê / rút khuy thủ công',
        blurb:
          'Đường rút khuy kim cương làm hoàn toàn bằng tay, mất trung bình 46 giờ cho mỗi bộ. Đệm mút D40 kết hợp lông vũ, giữ form sau 10 năm sử dụng.',
      },
      {
        id: 'lv-ottoman',
        x: 0.477,
        y: 0.668,
        zoom: 2.9,
        name: 'Đôn bàn trà "Milano Cube"',
        category: 'Bàn trà · Đôn',
        sku: 'MT-BT-0885',
        price: 12400000,
        material: 'Nhung Ý · Mặt kính cường lực 10mm',
        size: 'D900 × R900 × C420 mm',
        finish: 'Đồng bộ tông sofa Milano',
        blurb:
          'Mặt kính rời có thể tháo ra để biến đôn thành ghế ngồi phụ khi nhà có khách. Chân giấu bánh xe êm, di chuyển không xước sàn.',
      },
      {
        id: 'lv-chandelier',
        x: 0.752,
        y: 0.148,
        zoom: 3,
        name: 'Đèn chùm pha lê "Aurora 12"',
        category: 'Chiếu sáng trang trí',
        sku: 'MT-DC-1210',
        price: 34900000,
        badge: 'Nhập khẩu',
        material: 'Pha lê K9 · Khung mạ vàng 18K',
        size: 'Ø900 × C1100 mm · 12 bóng E14',
        finish: 'Vàng champagne',
        blurb:
          '1.248 viên pha lê K9 cắt 30 mặt, treo tay từng viên. Đi kèm dimmer 3 chế độ ánh sáng: tiếp khách, thư giãn và tiệc tối.',
      },
      {
        id: 'lv-tv',
        x: 0.126,
        y: 0.425,
        zoom: 3,
        name: 'Vách tivi gỗ óc chó "Noir"',
        category: 'Vách trang trí',
        sku: 'MT-VT-3300',
        price: 46000000,
        material: 'Gỗ óc chó Bắc Mỹ · Da microfiber',
        size: 'D3600 × C2700 mm (đóng theo kích thước thật)',
        finish: 'Vân dọc, phủ PU mờ 15%',
        blurb:
          'Hệ vách âm tường giấu toàn bộ dây nguồn và thiết bị. Ốp da chống bám vân tay, lau ẩm là sạch.',
      },
      {
        id: 'lv-sideboard',
        x: 0.142,
        y: 0.745,
        zoom: 2.7,
        name: 'Tủ trang trí mặt đá "Onyx"',
        category: 'Tủ · Kệ',
        sku: 'MT-TT-1755',
        price: 39800000,
        material: 'Đá Onyx tự nhiên · Da bò trần chỉ quả trám',
        size: 'D2200 × R480 × C750 mm',
        finish: 'Kem ngà / viền đồng',
        blurb:
          'Mặt đá Onyx nguyên khối, mỗi tấm là một bản vân duy nhất. Ray giảm chấn Blum, đóng mở êm trọn đời.',
      },
      {
        id: 'lv-island',
        x: 0.72,
        y: 0.72,
        zoom: 2.4,
        name: 'Quầy bar đá thạch anh "Nero"',
        category: 'Quầy bar · Bếp',
        sku: 'MT-QB-2080',
        price: 52000000,
        material: 'Đá thạch anh nhân tạo · Kính mờ khung nhôm',
        size: 'D2400 × R900 × C1050 mm',
        finish: 'Đen ánh kim',
        blurb:
          'Vừa là bàn ăn nhanh cho 4 người, vừa là ranh giới mềm giữa bếp và phòng khách. Có ổ điện âm và sạc không dây tích hợp.',
      },
    ],
  },
  {
    id: 'kitchen',
    index: '02',
    room: 'Phòng bếp',
    title: 'Không gian bếp',
    titleAccent: 'Ấm gỗ',
    caption:
      'Đảo bếp mặt gỗ sồi, hệ tủ matt đen và trần gỗ thông vòm — nơi cả gia đình tụ lại sau một ngày dài.',
    project: 'Nhà vườn 2 tầng · Bảo Lộc, Lâm Đồng',
    image: px(7061401, 'pexels-photo-7061401'),
    focus: '48% 52%',
    hotspots: [
      {
        id: 'kt-island',
        x: 0.3,
        y: 0.605,
        zoom: 2.4,
        name: 'Đảo bếp gỗ sồi "Terra"',
        category: 'Đảo bếp',
        sku: 'MT-DB-5120',
        price: 64500000,
        badge: 'Thiết kế riêng',
        material: 'Mặt gỗ sồi ghép finger 40mm · Thân MDF chống ẩm phủ laminate',
        size: 'D2600 × R1000 × C900 mm',
        finish: 'Sồi tự nhiên / thân đen matt',
        blurb:
          'Mặt gỗ xử lý dầu Osmo thực phẩm, thái trực tiếp được. Bên trong là 6 ngăn kéo full-extension và thùng gạo âm 25kg.',
      },
      {
        id: 'kt-stools',
        x: 0.42,
        y: 0.735,
        zoom: 2.9,
        name: 'Ghế bar xoay "Loop"',
        category: 'Ghế bar',
        sku: 'MT-GB-0412',
        price: 4850000,
        compareAt: 5900000,
        material: 'Thép sơn tĩnh điện · Mặt gỗ tần bì uốn',
        size: 'Ø380 × C650–780 mm (nâng hạ)',
        finish: 'Đen nhám',
        blurb:
          'Trục nâng hạ bằng khí nén, xoay 360°. Đế bọc nhựa PP chống trượt, an toàn trên sàn đá và sàn gỗ.',
      },
      {
        id: 'kt-tallunit',
        x: 0.487,
        y: 0.5,
        zoom: 2.6,
        name: 'Hệ tủ cao âm thiết bị "Monolith"',
        category: 'Tủ bếp',
        sku: 'MT-TB-7700',
        price: 88000000,
        material: 'MDF lõi xanh phủ Fenix NTM · Bản lề Hettich',
        size: 'D2200 × R650 × C2600 mm',
        finish: 'Đen matt kháng vân tay',
        blurb:
          'Bề mặt Fenix tự phục hồi vết xước nhỏ bằng nhiệt. Khoang âm sẵn lò nướng, lò vi sóng và tủ lạnh side-by-side.',
      },
      {
        id: 'kt-pendant',
        x: 0.432,
        y: 0.052,
        zoom: 3.2,
        name: 'Đèn thả cầu thuỷ tinh "Opal"',
        category: 'Chiếu sáng',
        sku: 'MT-DT-0300',
        price: 3200000,
        material: 'Thuỷ tinh opal thổi thủ công · Đui gốm',
        size: 'Ø300 mm · dây điều chỉnh 0.4–2.0 m',
        finish: 'Trắng sữa / chóa đen',
        blurb:
          'Thuỷ tinh opal hai lớp cho ánh sáng khuếch tán không chói. Đi kèm bóng LED 9W 2700K, tuổi thọ 25.000 giờ.',
      },
      {
        id: 'kt-mirror',
        x: 0.944,
        y: 0.455,
        zoom: 3.1,
        name: 'Gương tròn viền gỗ "Halo"',
        category: 'Gương · Trang trí',
        sku: 'MT-GT-0900',
        price: 2950000,
        material: 'Gương Bỉ 5mm · Viền gỗ tần bì uốn hơi nước',
        size: 'Ø900 × D45 mm',
        finish: 'Gỗ tự nhiên',
        blurb:
          'Viền gỗ uốn liền mạch không mối nối. Đế treo âm, gương như nổi trên tường 12mm.',
      },
      {
        id: 'kt-sideboard',
        x: 0.895,
        y: 0.625,
        zoom: 2.9,
        name: 'Tủ thấp lối vào "Ridge"',
        category: 'Tủ · Kệ',
        sku: 'MT-TL-1420',
        price: 14900000,
        material: 'MDF phủ melamine vân gỗ · Chân thép',
        size: 'D1600 × R400 × C620 mm',
        finish: 'Xám graphite / gỗ sáng',
        blurb:
          'Cánh mở nhấn không tay nắm, giữ đường nét liền mạch. Mặt trên chịu lực 60kg, dùng làm bàn console.',
      },
    ],
  },
  {
    id: 'bedroom',
    index: '03',
    room: 'Phòng ngủ',
    title: 'Phòng ngủ',
    titleAccent: 'Tĩnh lặng',
    caption:
      'Đầu giường bọc nỉ ô vuông, đôi đèn gốm mạ vàng và bảng màu be ấm — mọi chi tiết đều hướng về giấc ngủ sâu.',
    project: 'Penthouse · The Marq, Quận 1, TP.HCM',
    image: px(7061089, 'pexels-photo-7061089'),
    focus: '50% 50%',
    hotspots: [
      {
        id: 'bd-headboard',
        x: 0.51,
        y: 0.44,
        zoom: 2.3,
        name: 'Đầu giường bọc nỉ "Quilt"',
        category: 'Giường ngủ',
        sku: 'MT-DG-6100',
        price: 26800000,
        badge: 'Đóng theo yêu cầu',
        material: 'Nỉ nhung Hàn Quốc · Mút D25 định hình',
        size: 'D2200 × C1300 mm (khớp giường 1m8)',
        finish: 'Be cát',
        blurb:
          'Chia 15 ô vuông bọc riêng từng ô, cho độ tựa lưng đọc sách rất êm. Vải xử lý chống bám bụi và kháng khuẩn.',
      },
      {
        id: 'bd-lamp',
        x: 0.156,
        y: 0.552,
        zoom: 3,
        name: 'Đèn bàn gốm mạ vàng "Amber"',
        category: 'Chiếu sáng',
        sku: 'MT-DB-0245',
        price: 6400000,
        compareAt: 7800000,
        material: 'Thân gốm phủ vàng lá · Chụp vải lanh',
        size: 'Ø400 × C620 mm',
        finish: 'Vàng lá thủ công / chụp kem',
        blurb:
          'Vàng lá dát tay nên mỗi thân đèn có vân sáng riêng. Công tắc cảm ứng 3 mức sáng ngay trên thân.',
      },
      {
        id: 'bd-nightstand',
        x: 0.132,
        y: 0.775,
        zoom: 2.9,
        name: 'Tab đầu giường "Soft White"',
        category: 'Tab · Tủ đầu giường',
        sku: 'MT-TB-0520',
        price: 5900000,
        material: 'MDF sơn PU bóng · Ray giảm chấn',
        size: 'D520 × R420 × C480 mm',
        finish: 'Trắng ngà bóng',
        blurb:
          'Hai ngăn kéo lót nhung, ngăn dưới có khe luồn dây sạc. Cạnh bo R8 an toàn cho phòng có trẻ nhỏ.',
      },
      {
        id: 'bd-bedding',
        x: 0.52,
        y: 0.86,
        zoom: 2.6,
        name: 'Bộ chăn ga "Damask Sand"',
        category: 'Chăn ga gối',
        sku: 'MT-CG-0180',
        price: 4200000,
        material: 'Cotton tencel 600TC dệt hoa văn chìm',
        size: 'Bộ 5 món cho giường 1m8 × 2m',
        finish: 'Be hồng',
        blurb:
          'Dệt jacquard hoa văn damask nổi chìm theo góc nhìn. Càng giặt càng mềm, không xù sau 50 lần giặt máy.',
      },
      {
        id: 'bd-cushion',
        x: 0.63,
        y: 0.7,
        zoom: 3.2,
        name: 'Gối tựa nhung "Dune"',
        category: 'Phụ kiện trang trí',
        sku: 'MT-GT-0055',
        price: 890000,
        material: 'Nhung tăm · Ruột lông vũ pha 30%',
        size: '600 × 400 mm',
        finish: 'Hồng khói',
        blurb:
          'Vỏ có khoá kéo giấu, tháo giặt riêng được. Ruột lông vũ pha giữ phom, vỗ nhẹ là phồng lại.',
      },
    ],
  },
  {
    id: 'office',
    index: '04',
    room: 'Văn phòng',
    title: 'Phòng làm việc',
    titleAccent: 'Điềm tĩnh',
    caption:
      'Bàn giám đốc gỗ óc chó, ghế xoay bọc nhung và khu tiếp khách sofa xanh navy — nơi ra quyết định cần sự tập trung.',
    project: 'Văn phòng đại diện · Keangnam Landmark, Hà Nội',
    image: px(8082233, 'pexels-photo-8082233'),
    focus: '52% 55%',
    hotspots: [
      {
        id: 'of-desk',
        x: 0.52,
        y: 0.63,
        zoom: 2.4,
        name: 'Bàn giám đốc "Executive Walnut"',
        category: 'Bàn làm việc',
        sku: 'MT-BG-4400',
        price: 58600000,
        badge: 'Bán chạy',
        material: 'Veneer óc chó · Mặt da lót viết thủ công',
        size: 'D2000 × R900 × C760 mm + hộc phụ D1400',
        finish: 'Óc chó nâu trầm',
        blurb:
          'Mặt da bò thật khâu viền tay, êm khi viết và không loá dưới đèn. Hộc phụ chữ L có khoá vân tay tuỳ chọn.',
      },
      {
        id: 'of-chair',
        x: 0.16,
        y: 0.7,
        zoom: 2.6,
        name: 'Ghế xoay bọc nhung "Wing"',
        category: 'Ghế làm việc',
        sku: 'MT-GX-0770',
        price: 18900000,
        material: 'Nhung tăm · Đinh tán đồng · Chân nhôm đúc',
        size: 'D720 × R720 × C1050–1150 mm',
        finish: 'Hồng khói / nâu da bò',
        blurb:
          'Lưng cánh ôm vai, giảm mỏi cổ khi ngồi họp dài. Piston nâng hạ Samhongsa chịu tải 130kg.',
      },
      {
        id: 'of-guestchair',
        x: 0.765,
        y: 0.755,
        zoom: 2.9,
        name: 'Ghế tiếp khách "Petal"',
        category: 'Ghế đơn',
        sku: 'MT-GD-0330',
        price: 9600000,
        material: 'Da PU cao cấp · Chân gỗ sồi nhuộm đen',
        size: 'D620 × R600 × C820 mm',
        finish: 'Trắng kem',
        blurb:
          'Phom ghế bao lưng nhẹ, ngồi họp 2 tiếng vẫn thoải mái. Da PU chống thấm, lau vết cà phê trong 5 giây.',
      },
      {
        id: 'of-sofa',
        x: 0.835,
        y: 0.615,
        zoom: 2.7,
        name: 'Sofa băng Chesterfield "Navy"',
        category: 'Sofa tiếp khách',
        sku: 'MT-SF-1860',
        price: 42500000,
        material: 'Nhung cotton · Khung gỗ dầu tẩm sấy',
        size: 'D2100 × R900 × C760 mm',
        finish: 'Xanh navy',
        blurb:
          'Tông navy trung tính, hợp cả nội thất gỗ sáng lẫn gỗ tối. Chân gỗ tiện tay, có thể thay chân đồng theo yêu cầu.',
      },
      {
        id: 'of-lamp',
        x: 0.622,
        y: 0.512,
        zoom: 3.2,
        name: 'Đèn bàn pha lê "Crystal Column"',
        category: 'Chiếu sáng',
        sku: 'MT-DB-0610',
        price: 7900000,
        material: 'Thân pha lê khối · Chụp vải bọc trong',
        size: 'Ø350 × C580 mm',
        finish: 'Trong suốt / chụp trắng',
        blurb:
          'Thân pha lê tán ánh sáng thành viền sáng mảnh trên mặt bàn. Bóng LED 8W 3000K đi kèm.',
      },
      {
        id: 'of-chandelier',
        x: 0.705,
        y: 0.062,
        zoom: 3.1,
        name: 'Đèn trần nhánh "Orbit 6"',
        category: 'Chiếu sáng',
        sku: 'MT-DT-1106',
        price: 15400000,
        material: 'Thép mạ chrome · Chụp vải trắng',
        size: 'Ø1000 × C350 mm · 6 bóng E27',
        finish: 'Chrome sáng',
        blurb:
          'Sáu nhánh xoay chỉnh hướng độc lập, rọi đúng khu bàn hoặc khu tiếp khách tuỳ buổi.',
      },
    ],
  },
  {
    id: 'dining',
    index: '05',
    room: 'Phòng ăn',
    title: 'Phòng ăn',
    titleAccent: 'Tối giản',
    caption:
      'Bàn ăn mặt trắng chân gỗ, ghế Eames và ba đèn thả thẳng hàng — gọn gàng cho căn hộ trẻ.',
    project: 'Căn hộ 78m² · Masteri Thảo Điền, TP.HCM',
    image: px(6527041, 'pexels-photo-6527041'),
    focus: '50% 52%',
    hotspots: [
      {
        id: 'dn-table',
        x: 0.49,
        y: 0.715,
        zoom: 2.5,
        name: 'Bàn ăn 6 chỗ "Nord"',
        category: 'Bàn ăn',
        sku: 'MT-BA-3020',
        price: 16800000,
        compareAt: 19500000,
        badge: 'Ưu đãi tháng này',
        material: 'Mặt MDF phủ melamine chống xước · Chân gỗ sồi đặc',
        size: 'D1600 × R900 × C750 mm',
        finish: 'Trắng / chân sồi tự nhiên',
        blurb:
          'Mặt bàn chịu nhiệt 180°C, đặt nồi nóng trực tiếp không để lại vết. Chân lắp ráp bằng ốc cấy, tháo lắp khi chuyển nhà.',
      },
      {
        id: 'dn-chair',
        x: 0.41,
        y: 0.85,
        zoom: 3,
        name: 'Ghế ăn "Eiffel Soft"',
        category: 'Ghế ăn',
        sku: 'MT-GA-0210',
        price: 1650000,
        material: 'Nhựa PP nguyên sinh · Chân thép mạ + gỗ sồi',
        size: 'D460 × R520 × C820 mm',
        finish: 'Trắng ngà',
        blurb:
          'Lòng ghế đúc liền theo đường cong lưng, ngồi ăn lâu không mỏi. Xếp chồng được 4 ghế khi cần dọn chỗ.',
      },
      {
        id: 'dn-pendant',
        x: 0.497,
        y: 0.232,
        zoom: 3.2,
        name: 'Đèn thả gỗ "Cone Trio"',
        category: 'Chiếu sáng',
        sku: 'MT-DT-0703',
        price: 4350000,
        material: 'Chụp kim loại sơn tĩnh điện · Cổ gỗ sồi',
        size: 'Ø120 × C280 mm · bộ 3 chiếc',
        finish: 'Trắng / gỗ sáng / lòng chóa vàng đồng',
        blurb:
          'Lòng chóa sơn vàng đồng làm ánh sáng ấm hơn 200K so với chóa trắng. Dây dài 1.5m, cắt ngắn tại chỗ khi lắp.',
      },
      {
        id: 'dn-cabinet',
        x: 0.485,
        y: 0.455,
        zoom: 3,
        name: 'Kệ treo tường "Box Duo"',
        category: 'Kệ trang trí',
        sku: 'MT-KT-0640',
        price: 3900000,
        material: 'MDF sơn PU · Pát treo âm chịu lực',
        size: 'D1200 × R320 × C300 mm · bộ 2 tầng',
        finish: 'Trắng / hộc màu đỏ đất & xanh navy',
        blurb:
          'Hai hộc màu tháo rời, đổi vị trí hoặc đổi màu theo mùa. Chịu tải 20kg mỗi tầng.',
      },
      {
        id: 'dn-curtain',
        x: 0.14,
        y: 0.42,
        zoom: 2.7,
        name: 'Rèm hoa văn "Bloom"',
        category: 'Rèm cửa',
        sku: 'MT-RC-0450',
        price: 2400000,
        material: 'Vải bố pha lanh in hoa văn · Lót voan trắng',
        size: 'Tính theo m² · cao tối đa 3.2 m',
        finish: 'Nền kem / hoa cam đất',
        blurb:
          'Lớp voan trong lọc nắng ban ngày, lớp ngoài cản 70% nhiệt. Bao gồm khảo sát và lắp đặt tận nơi.',
      },
    ],
  },
]

export const formatVnd = (value: number) =>
  new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 0 }).format(value) + '₫'
