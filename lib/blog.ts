const px = (id: number, slug: string, w = 1800, ext: 'jpeg' | 'png' = 'jpeg') =>
  `https://images.pexels.com/photos/${id}/${slug}.${ext}?auto=compress&cs=tinysrgb&w=${w}`

/** Article body is structured, not markdown — no parser, and the types keep the copy honest. */
export type Block =
  | { t: 'p'; text: string }
  | { t: 'h2'; text: string }
  | { t: 'ul'; items: string[] }
  | { t: 'ol'; items: string[] }
  | { t: 'quote'; text: string; by?: string }
  | { t: 'note'; title: string; text: string }
  | { t: 'img'; src: string; caption: string }
  | { t: 'table'; head: string[]; rows: string[][] }

export type Author = { name: string; role: string; avatar: string }

export type Post = {
  slug: string
  title: string
  excerpt: string
  category: string
  tags: string[]
  /** ISO date — rendered with vi-VN formatting at display time. */
  date: string
  minutes: number
  cover: string
  coverAlt: string
  author: Author
  body: Block[]
}

export { blogCategories } from './categories'

const AUTHORS: Record<string, Author> = {
  khoa: {
    name: 'Trần Minh Khoa',
    role: 'Kiến trúc sư chủ trì · 9 năm nghề',
    avatar: px(5308640, 'pexels-photo-5308640', 200),
  },
  ha: {
    name: 'Nguyễn Thu Hà',
    role: 'Quản lý dự án nội thất',
    avatar: px(1520760, 'pexels-photo-1520760', 200),
  },
  nam: {
    name: 'Phạm Hoàng Nam',
    role: 'Quản đốc xưởng · 14 năm nghề mộc',
    avatar: px(33815738, 'pexels-photo-33815738', 200),
  },
}

export const posts: Post[] = [
  {
    slug: 'chon-sofa-can-ho-nho',
    title: 'Chọn sofa cho căn hộ dưới 60m²: 5 lỗi ai cũng mắc',
    excerpt:
      'Sofa là món chiếm nhiều diện tích nhất phòng khách và cũng là món khách hàng đổi ý nhiều nhất sau khi lắp. Đây là những lỗi chúng tôi gặp đi gặp lại suốt 12 năm.',
    category: 'Kinh nghiệm',
    tags: ['sofa', 'căn hộ nhỏ', 'phòng khách'],
    date: '2026-08-28',
    minutes: 7,
    cover: px(7018400, 'pexels-photo-7018400'),
    coverAlt: 'Sofa và bàn trà tròn trong phòng khách nhỏ',
    author: AUTHORS.khoa,
    body: [
      {
        t: 'p',
        text: 'Trong khoảng 1.480 công trình đã bàn giao, phòng khách là nơi khách gọi lại nhiều nhất sau khi dọn vào ở. Gần như luôn là chuyện sofa: quá to, quá sâu, hoặc kê xong thì không mở được cửa ban công. Dưới đây là năm lỗi lặp lại nhiều nhất và cách tránh.',
      },
      { t: 'h2', text: '1. Chọn theo showroom thay vì theo mặt bằng' },
      {
        t: 'p',
        text: 'Showroom trần cao 4m, sàn rộng 200m². Bộ sofa 3m2 nằm ở đó trông vừa vặn. Về căn hộ 55m² trần 2m7, nó ăn hết một phần ba phòng khách. Đây là lỗi số một, và nó không liên quan gì tới gu thẩm mỹ — chỉ là sai tỉ lệ.',
      },
      {
        t: 'p',
        text: 'Cách kiểm tra rẻ nhất: lấy băng keo giấy dán đúng kích thước sofa lên sàn nhà bạn, rồi sống với nó ba ngày. Đi lại quanh nó, mở cửa, kéo rèm. Nếu sau ba ngày bạn vẫn không thấy vướng thì kích thước đó đúng.',
      },
      { t: 'h2', text: '2. Bỏ qua chiều sâu ghế' },
      {
        t: 'p',
        text: 'Người Việt trung bình cao 1m62–1m70. Sofa nhập khẩu châu Âu thường có chiều sâu 95–105cm, thiết kế cho người cao 1m75 trở lên. Ngồi vào, lưng bạn không chạm tựa, chân không chạm sàn — phải kê thêm gối, mà gối thì lại ăn thêm chỗ.',
      },
      {
        t: 'table',
        head: ['Chiều cao người dùng', 'Chiều sâu ghế nên chọn', 'Chiều cao mặt ngồi'],
        rows: [
          ['Dưới 1m60', '85 – 90 cm', '38 – 40 cm'],
          ['1m60 – 1m72', '90 – 95 cm', '40 – 42 cm'],
          ['Trên 1m72', '95 – 105 cm', '42 – 45 cm'],
        ],
      },
      {
        t: 'note',
        title: 'Thử trước khi chốt',
        text: 'Ngồi thử ít nhất 10 phút, không phải 10 giây. Đa số sofa nào ngồi 10 giây cũng thấy êm. Vấn đề chỉ lộ ra ở phút thứ tám.',
      },
      { t: 'h2', text: '3. Đo lọt lòng thang máy sau khi đã đặt cọc' },
      {
        t: 'p',
        text: 'Một bộ sofa góc liền khối 3m2 không vào được thang máy chung cư tiêu chuẩn. Chúng tôi từng phải thuê cẩu ngoài trời cho tầng 12, chi phí bằng 15% giá bộ sofa — và đó là chi phí không ai muốn trả.',
      },
      {
        t: 'ul',
        items: [
          'Đo lọt lòng thang máy: rộng × sâu × cao, và cả chiều cao cửa thang.',
          'Đo chiếu nghỉ cầu thang bộ nếu phải khiêng tay — đây là chỗ hay kẹt nhất.',
          'Hỏi thẳng đơn vị sản xuất: món này có tháo rời được không, tháo thành mấy khối.',
        ],
      },
      {
        t: 'p',
        text: 'Sofa module tháo rời đắt hơn khoảng 8–12% so với loại liền khối. Với căn hộ tầng cao thì khoản chênh đó gần như luôn đáng.',
      },
      { t: 'h2', text: '4. Chọn vải sáng màu khi nhà có trẻ nhỏ hoặc thú cưng' },
      {
        t: 'p',
        text: 'Không phải vải sáng màu là sai. Sai là chọn vải sáng màu mà không tháo giặt được. Hãy hỏi ba câu trước khi chốt: vỏ bọc có tháo rời không, giặt máy được không, và có đặt mua thêm một bộ vỏ dự phòng được không.',
      },
      {
        t: 'quote',
        text: 'Bộ vỏ thứ hai rẻ hơn nhiều so với bộ sofa thứ hai.',
        by: 'Câu chúng tôi nói với mọi khách hàng có con nhỏ',
      },
      { t: 'h2', text: '5. Quên khoảng cách tới bàn trà và tới tivi' },
      {
        t: 'ol',
        items: [
          'Từ mép sofa tới bàn trà: 35–45cm. Hẹp hơn thì vướng chân, rộng hơn thì với không tới cốc nước.',
          'Từ sofa tới tivi: khoảng 1.5 lần đường chéo màn hình. Tivi 55 inch (1m4 đường chéo) cần chỗ ngồi cách khoảng 2m1.',
          'Lối đi phía sau hoặc bên hông sofa: tối thiểu 60cm để một người đi lọt thoải mái.',
        ],
      },
      {
        t: 'img',
        src: px(6987730, 'pexels-photo-6987730', 1600),
        caption:
          'Bố trí đúng khoảng cách: sofa – bàn trà – tivi nằm trên một trục, lối đi hai bên vẫn thông.',
      },
      { t: 'h2', text: 'Tóm lại' },
      {
        t: 'p',
        text: 'Sofa là món đồ bạn chạm vào mỗi ngày trong mười năm tới. Dành thêm một buổi chiều để đo đạc và ngồi thử sẽ tiết kiệm cho bạn rất nhiều tiếc nuối. Nếu cần, gửi mặt bằng cho chúng tôi — kiến trúc sư sẽ dựng thử vài phương án bố trí miễn phí trước khi bạn quyết định mua gì.',
      },
    ],
  },

  {
    slug: 'go-cong-nghiep-hay-go-tu-nhien',
    title: 'Gỗ công nghiệp hay gỗ tự nhiên? So sánh thẳng thắn',
    excerpt:
      'Không có loại nào "tốt hơn" — chỉ có loại hợp với vị trí, ngân sách và độ ẩm nhà bạn. Đây là bảng so sánh chúng tôi dùng khi tư vấn cho khách.',
    category: 'Vật liệu',
    tags: ['gỗ', 'MDF', 'độ bền', 'chi phí'],
    date: '2026-08-19',
    minutes: 9,
    cover: px(6568684, 'pexels-photo-6568684'),
    coverAlt: 'Các mẫu veneer gỗ đặt trên mặt bàn gỗ mộc',
    author: AUTHORS.nam,
    body: [
      {
        t: 'p',
        text: 'Câu hỏi này gần như luôn xuất hiện ở buổi tư vấn thứ hai. Và câu trả lời trung thực là: trong cùng một căn nhà, chúng tôi thường dùng cả hai. Vấn đề không phải chọn phe, mà là đặt đúng loại vào đúng chỗ.',
      },
      { t: 'h2', text: 'Nói cho rõ tên gọi trước' },
      {
        t: 'p',
        text: '"Gỗ công nghiệp" là một cái tên gói chung ít nhất bốn thứ rất khác nhau, và chính chỗ này là nơi khách hàng bị nhập nhèm khi so giá.',
      },
      {
        t: 'ul',
        items: [
          'MDF thường: bột gỗ ép keo. Rẻ, phẳng, dễ sơn. Gặp nước là trương, không cứu được.',
          'MDF lõi xanh chống ẩm: cùng cấu tạo nhưng thêm phụ gia chống ẩm. Đắt hơn MDF thường khoảng 25–35%.',
          'HDF: ép ở tỉ trọng cao hơn, cứng và nặng hơn MDF, thường dùng cho cánh cửa.',
          'Plywood (ván ép): các lớp gỗ mỏng dán chéo thớ. Chịu ẩm và giữ ốc vít tốt nhất trong nhóm công nghiệp.',
        ],
      },
      {
        t: 'note',
        title: 'Cẩn thận khi so báo giá',
        text: 'Hai báo giá cùng ghi "tủ bếp gỗ công nghiệp" có thể chênh nhau 40% chỉ vì một bên dùng MDF thường, một bên dùng plywood chống ẩm. Luôn hỏi rõ tên cốt ván, không chỉ tên bề mặt.',
      },
      { t: 'h2', text: 'Bảng so sánh thực tế' },
      {
        t: 'table',
        head: ['Tiêu chí', 'Gỗ tự nhiên (sồi, óc chó)', 'Plywood chống ẩm', 'MDF lõi xanh'],
        rows: [
          ['Giá tương đối', '100%', '45 – 55%', '30 – 40%'],
          ['Chịu ẩm', 'Tốt nếu tẩm sấy đúng', 'Tốt', 'Khá'],
          ['Giữ ốc vít sau nhiều lần tháo', 'Rất tốt', 'Tốt', 'Trung bình'],
          ['Cong vênh mùa nồm', 'Có thể, nếu sấy chưa đạt', 'Rất ít', 'Không cong nhưng có thể trương'],
          ['Bề mặt phẳng để sơn', 'Cần xử lý nhiều', 'Trung bình', 'Rất tốt'],
          ['Sửa chữa khi xước sâu', 'Chà lại được', 'Khó', 'Gần như không'],
          ['Tuổi thọ thực tế', '20 – 30 năm', '12 – 18 năm', '8 – 12 năm'],
        ],
      },
      { t: 'h2', text: 'Chúng tôi đặt loại nào ở đâu' },
      {
        t: 'p',
        text: 'Đây là nguyên tắc mặc định ở xưởng, áp dụng trừ khi khách có yêu cầu khác.',
      },
      {
        t: 'ol',
        items: [
          'Tủ bếp dưới (gần nước, hay bị hắt): plywood chống ẩm cho thùng, mặt cánh acrylic hoặc laminate.',
          'Tủ bếp trên: MDF lõi xanh là đủ, nhẹ hơn nên bản lề và pát treo đỡ chịu tải.',
          'Mặt bàn ăn, mặt đảo bếp, tay vịn cầu thang: gỗ tự nhiên. Đây là những bề mặt bị chạm và cọ xát nhiều nhất.',
          'Tủ áo, tủ giày, vách trang trí khô ráo: MDF lõi xanh phủ melamine hoặc laminate, tiết kiệm mà bền.',
          'Khung ghế, khung sofa: gỗ tự nhiên tẩm sấy. Không có ngoại lệ ở đây — khung là thứ chịu toàn bộ lực.',
        ],
      },
      { t: 'h2', text: 'Độ ẩm mới là biến số quyết định' },
      {
        t: 'p',
        text: 'Gỗ tự nhiên chỉ ổn định khi độ ẩm trong gỗ đạt 8–12% và cân bằng với môi trường sử dụng. Gỗ nhập từ Bắc Mỹ được sấy theo tiêu chuẩn khí hậu ôn đới; đưa thẳng vào nhà ở Hà Nội tháng ba mà không cho thời gian ổn định thì cong vênh là chuyện có thể xảy ra.',
      },
      {
        t: 'p',
        text: 'Ở xưởng chúng tôi, gỗ nhập về nằm trong kho ổn định tối thiểu 14 ngày trước khi vào máy. Đây là công đoạn không nhìn thấy được trên báo giá, nhưng nó là lý do đồ không cong sau vài mùa nồm.',
      },
      {
        t: 'quote',
        text: 'Gỗ tốt mà sấy ẩu vẫn cong. Gỗ công nghiệp tốt mà lắp đúng chỗ thì mười năm vẫn thẳng.',
        by: 'Phạm Hoàng Nam, quản đốc xưởng',
      },
      { t: 'h2', text: 'Vậy nên chọn gì?' },
      {
        t: 'p',
        text: 'Nếu ngân sách hạn chế, đừng cố dùng gỗ tự nhiên cho toàn bộ nhà rồi phải cắt giảm ở phụ kiện. Ray trượt và bản lề rẻ tiền sẽ làm hỏng trải nghiệm nhanh hơn nhiều so với việc thùng tủ là plywood thay vì gỗ đặc. Ưu tiên đúng thứ tự: phụ kiện tốt → cốt ván hợp vị trí → bề mặt đẹp.',
      },
    ],
  },

  {
    slug: 'bang-gia-thi-cong-noi-that-2026',
    title: 'Thi công nội thất trọn gói: tiền của bạn thực sự đi đâu?',
    excerpt:
      'Bóc tách một báo giá 480 triệu cho căn hộ 78m² thành từng khoản, kèm những chỗ hay phát sinh nhất và cách chặn chúng ngay từ hợp đồng.',
    category: 'Chi phí',
    tags: ['báo giá', 'ngân sách', 'hợp đồng'],
    date: '2026-08-11',
    minutes: 8,
    cover: px(9616959, 'pexels-photo-9616959'),
    coverAlt: 'Kiến trúc sư nghiên cứu bản vẽ kỹ thuật',
    author: AUTHORS.ha,
    body: [
      {
        t: 'p',
        text: 'Con số "trọn gói 6 triệu/m²" nghe rất gọn, nhưng nó che mất phần quan trọng nhất: cấu trúc chi phí. Bài này lấy một dự án thật đã bàn giao — căn hộ 78m² tại Masteri Thảo Điền, tổng 480 triệu — và mở ra từng khoản.',
      },
      {
        t: 'note',
        title: 'Lưu ý về con số',
        text: 'Đây là số của một dự án cụ thể, phong cách Scandinavian, mức vật liệu tầm trung. Cùng diện tích nhưng làm tân cổ điển với gỗ óc chó có thể lên 900 triệu – 1,2 tỷ. Đừng dùng bài này như bảng giá.',
      },
      { t: 'h2', text: 'Chia theo hạng mục' },
      {
        t: 'table',
        head: ['Hạng mục', 'Chi phí', '% tổng'],
        rows: [
          ['Tủ bếp + đảo bếp', '112.000.000₫', '23%'],
          ['Tủ áo + giường + tab 2 phòng ngủ', '98.000.000₫', '20%'],
          ['Sofa, bàn trà, kệ tivi', '76.000.000₫', '16%'],
          ['Vách trang trí, trần, phào chỉ', '58.000.000₫', '12%'],
          ['Bàn ăn + ghế', '32.000.000₫', '7%'],
          ['Chiếu sáng (đèn + dây + công tắc)', '38.000.000₫', '8%'],
          ['Rèm, thảm, décor', '24.000.000₫', '5%'],
          ['Nhân công lắp đặt + vận chuyển', '26.000.000₫', '5%'],
          ['Thiết kế 3D + bản vẽ kỹ thuật', '16.000.000₫', '3%'],
        ],
      },
      {
        t: 'p',
        text: 'Điều đáng chú ý: bếp và phòng ngủ chiếm 43% ngân sách. Đây cũng là hai khu vực khách hàng ít khi muốn cắt giảm nhất khi phải cân đối lại — và đúng là không nên cắt.',
      },
      { t: 'h2', text: 'Ba chỗ hay phát sinh nhất' },
      {
        t: 'ol',
        items: [
          'Điện nước đi lại. Đảo bếp cần ổ điện âm, tủ áo cần đèn cảm ứng — nếu bản vẽ điện gốc của chủ đầu tư không có, phải đục tường đi lại. Khoản này thường 8–20 triệu và gần như không có trong báo giá ban đầu.',
          'Sai lệch kích thước hiện trạng. Tường chung cư hiếm khi vuông tuyệt đối. Chênh 2–3cm là bình thường và xưởng phải bù. Đơn vị làm ăn tử tế sẽ đo lại sau khi bàn giao mặt bằng thô, trước khi cắt ván.',
          'Đổi ý sau khi đã sản xuất. Đổi màu cánh tủ khi ván đã cắt và sơn xong nghĩa là làm lại từ đầu. Đây là phát sinh đắt nhất và cũng là loại duy nhất hoàn toàn nằm trong tầm kiểm soát của bạn.',
        ],
      },
      { t: 'h2', text: 'Cách chặn phát sinh từ hợp đồng' },
      {
        t: 'p',
        text: 'Bốn điều khoản dưới đây nên có trong mọi hợp đồng nội thất. Nếu đơn vị thi công từ chối đưa vào, đó là một tín hiệu.',
      },
      {
        t: 'ul',
        items: [
          'Báo giá bóc tách theo mã sản phẩm, có ghi rõ cốt ván và thương hiệu phụ kiện — không chấp nhận dòng "trọn gói phòng ngủ".',
          'Điều khoản khoá giá: mọi hạng mục trong phụ lục không đổi giá trong suốt thời gian hợp đồng.',
          'Mốc chốt thiết kế: sau ngày này, thay đổi sẽ tính phí, và mức phí được ghi sẵn — để cả hai bên biết trước con số.',
          'Phạt chậm tiến độ hai chiều: bên thi công chậm thì chịu phạt, chủ nhà chậm duyệt bản vẽ cũng lùi mốc tương ứng.',
        ],
      },
      {
        t: 'quote',
        text: 'Báo giá bóc tách theo từng mã sản phẩm nên mình biết chính xác tiền đi đâu. Kết thúc dự án đúng bằng con số ký hợp đồng.',
        by: 'Anh Trần Quốc Bảo, khách hàng dự án văn phòng Keangnam',
      },
      { t: 'h2', text: 'Nếu ngân sách phải cắt' },
      {
        t: 'p',
        text: 'Thứ tự cắt giảm mà chúng tôi khuyên, từ ít ảnh hưởng nhất tới nhiều nhất: décor và thảm → rèm (làm sau vài tháng cũng được) → bàn ăn ghế ăn (đồ rời, thay dễ) → vách trang trí. Tuyệt đối không cắt: phụ kiện tủ bếp, cốt ván khu vực ẩm, và hệ chiếu sáng. Ba thứ này sửa sau đều phải đục phá.',
      },
    ],
  },

  {
    slug: 'ba-lop-chieu-sang',
    title: 'Ba lớp chiếu sáng mà phần lớn căn hộ Việt bỏ qua',
    excerpt:
      'Một bóng đèn trần giữa phòng không phải là hệ chiếu sáng. Đây là cách bố trí ba lớp sáng để căn nhà đổi được không khí theo giờ trong ngày.',
    category: 'Kinh nghiệm',
    tags: ['chiếu sáng', 'đèn', 'thiết kế'],
    date: '2026-07-30',
    minutes: 6,
    cover: px(1955549, 'pexels-photo-1955549'),
    coverAlt: 'Đèn thả chiếu ánh sáng ấm lên mảng tường ốp gỗ',
    author: AUTHORS.khoa,
    body: [
      {
        t: 'p',
        text: 'Rất nhiều căn hộ bàn giao với đúng một bóng downlight giữa trần mỗi phòng. Bật lên thì sáng đều, sáng phẳng, và không có chút không khí nào. Chiếu sáng tốt cần ba lớp, và chúng phục vụ ba mục đích khác nhau.',
      },
      { t: 'h2', text: 'Lớp 1 — Ánh sáng nền' },
      {
        t: 'p',
        text: 'Là lớp làm cho căn phòng đủ sáng để đi lại và dọn dẹp. Downlight âm trần, đèn ốp trần, hoặc hắt trần. Nguyên tắc: đừng đặt tất cả vào một công tắc. Chia thành ít nhất hai nhóm để có thể bật một nửa.',
      },
      {
        t: 'ul',
        items: [
          'Phòng khách 20m²: khoảng 6–8 downlight 7W, chia hai nhóm công tắc.',
          'Nhiệt độ màu 3000K cho không gian sinh hoạt. 4000K trở lên cho cảm giác lạnh như văn phòng.',
          'Tránh đặt downlight ngay trên chỗ ngồi — ánh sáng đổ thẳng xuống đỉnh đầu tạo bóng rất xấu trên mặt.',
        ],
      },
      { t: 'h2', text: 'Lớp 2 — Ánh sáng chức năng' },
      {
        t: 'p',
        text: 'Sáng cho việc cụ thể: đọc sách, nấu ăn, trang điểm, làm việc. Lớp này thường bị bỏ hẳn, và đó là lý do bạn phải mang laptop ra bàn ăn vì góc làm việc quá tối.',
      },
      {
        t: 'table',
        head: ['Khu vực', 'Loại đèn', 'Vị trí đặt'],
        rows: [
          ['Mặt bếp', 'LED thanh dưới tủ trên', 'Sát mép trước tủ, không sát tường'],
          ['Bàn làm việc', 'Đèn bàn có cần gập', 'Bên tay không thuận, tránh bóng tay'],
          ['Đầu giường', 'Đèn tường hoặc đèn kẹp', 'Cao 60–70cm so với mặt nệm'],
          ['Gương trang điểm', 'Đèn hai bên gương', 'Ngang tầm mắt, không đặt phía trên'],
        ],
      },
      {
        t: 'note',
        title: 'Lỗi kinh điển ở bếp',
        text: 'Đặt đèn ở giữa trần bếp nghĩa là khi bạn đứng thái rau, chính người bạn che mất ánh sáng và mặt bếp nằm trong bóng của bạn. LED dưới tủ trên giải quyết triệt để chuyện này với chi phí dưới 2 triệu.',
      },
      { t: 'h2', text: 'Lớp 3 — Ánh sáng tạo không khí' },
      {
        t: 'p',
        text: 'Lớp này không để nhìn rõ, mà để căn nhà có chiều sâu. Đèn hắt sau kệ, đèn rọi tranh, đèn sàn ở góc phòng, dây LED sau vách tivi. Buổi tối tắt hết lớp 1 và lớp 2, chỉ để lớp 3 — căn phòng lập tức thành một chỗ khác.',
      },
      {
        t: 'img',
        src: px(13775476, 'pexels-photo-13775476', 1600),
        caption: 'Đèn thả và ánh phản chiếu tạo lớp sáng thứ ba — không để nhìn rõ, mà để tạo chiều sâu.',
      },
      { t: 'h2', text: 'Chi phí thực tế' },
      {
        t: 'p',
        text: 'Làm đủ ba lớp cho căn hộ 78m² tốn khoảng 35–45 triệu, gồm cả đèn, dây, công tắc và công lắp. Nghe nhiều, nhưng đây là hạng mục thay đổi trải nghiệm sống rõ rệt nhất trên mỗi đồng bỏ ra — và cũng là hạng mục khó sửa nhất về sau vì phải đục trần.',
      },
      {
        t: 'quote',
        text: 'Nếu ngân sách chỉ đủ làm tốt một thứ, hãy làm tốt hệ chiếu sáng. Đồ đạc thay được, dây điện âm trần thì không.',
      },
    ],
  },

  {
    slug: 'japandi-cho-khi-hau-viet-nam',
    title: 'Japandi và vì sao nó hợp khí hậu Việt Nam',
    excerpt:
      'Không chỉ là chuyện đẹp. Bảng màu trung tính, vật liệu thở được và bố cục thoáng của Japandi giải quyết được vài vấn đề rất thật của nhà ở nhiệt đới ẩm.',
    category: 'Phong cách',
    tags: ['japandi', 'phong cách', 'khí hậu'],
    date: '2026-07-22',
    minutes: 6,
    cover: px(7061402, 'pexels-photo-7061402'),
    coverAlt: 'Bếp phong cách Japandi với trần gỗ và đảo bếp gỗ sồi',
    author: AUTHORS.khoa,
    body: [
      {
        t: 'p',
        text: 'Japandi là chỗ gặp nhau giữa Scandinavian Bắc Âu và tối giản Nhật Bản: cùng đề cao sự gọn gàng, nhưng Bắc Âu ưu tiên ánh sáng và ấm áp, còn Nhật ưu tiên khoảng trống và vật liệu mộc. Ở Việt Nam, sự kết hợp này có vài lợi thế thực dụng ít người nói tới.',
      },
      { t: 'h2', text: '1. Ít đồ hơn nghĩa là ít chỗ cho ẩm mốc' },
      {
        t: 'p',
        text: 'Độ ẩm trung bình ở miền Bắc mùa nồm lên tới 90%. Mỗi món đồ trang trí là thêm một bề mặt để hơi nước đọng và bụi bám. Nguyên tắc "ít nhưng chất" của Japandi không phải chỉ là thẩm mỹ — nó giảm hẳn khối lượng lau dọn và số chỗ nấm mốc có thể trú.',
      },
      { t: 'h2', text: '2. Gỗ sáng màu giấu bụi tốt hơn gỗ tối màu' },
      {
        t: 'p',
        text: 'Đây là điều trái trực giác. Mặt gỗ óc chó đen bóng đẹp trong ảnh, nhưng ở căn hộ mặt phố Sài Gòn thì sau một ngày đã thấy lớp bụi mịn. Gỗ sồi hoặc tần bì sáng màu, hoàn thiện dầu mờ, che bụi tốt hơn nhiều và không lộ vân tay.',
      },
      {
        t: 'ul',
        items: [
          'Hoàn thiện dầu (oil finish) thay vì sơn bóng: bề mặt mờ tán ánh sáng, không soi gương lại các vết.',
          'Vân gỗ tự nhiên rõ nét cũng giúp che các vết xước nhỏ theo thời gian.',
          'Khi cần, chà nhẹ giấy nhám mịn rồi lau lại dầu — phục hồi tại chỗ, không cần tháo ra xưởng.',
        ],
      },
      { t: 'h2', text: '3. Bố cục thoáng giúp đối lưu không khí' },
      {
        t: 'p',
        text: 'Japandi hạn chế đồ cao và đồ sát tường kín. Kệ hở, chân đồ nội thất nâng cao khỏi sàn, vách ngăn lam thay cho tường đặc — tất cả đều cho không khí đi qua. Ở khí hậu nóng ẩm, luồng khí lưu thông quan trọng hơn nhiều so với việc có thêm chỗ cất đồ.',
      },
      {
        t: 'note',
        title: 'Chi tiết nhỏ, khác biệt lớn',
        text: 'Nâng chân tủ và sofa lên 12–15cm khỏi mặt sàn. Robot hút bụi chui được, sàn khô nhanh hơn sau khi lau, và chân tường không bị ẩm chân do đồ áp sát.',
      },
      { t: 'h2', text: 'Bảng màu để bắt đầu' },
      {
        t: 'table',
        head: ['Vai trò', 'Tỉ lệ', 'Gợi ý màu'],
        rows: [
          ['Nền (tường, trần, sàn)', '60%', 'Trắng ngà, be cát, xám ấm'],
          ['Phụ (nội thất lớn)', '30%', 'Gỗ sồi tự nhiên, tần bì, be đậm'],
          ['Nhấn (décor, dệt may)', '10%', 'Đen than, xanh rêu, nâu đất'],
        ],
      },
      {
        t: 'p',
        text: 'Điểm mấu chốt là giữ 10% nhấn thật sự chỉ ở mức 10%. Japandi hỏng ngay khi có ba màu nhấn cùng lúc — lúc đó nó thành một phong cách khác, và thường là không phong cách nào cả.',
      },
      { t: 'h2', text: 'Điều nên cân nhắc' },
      {
        t: 'p',
        text: 'Japandi cần kỷ luật về sau. Phong cách này chỉ đẹp khi mặt bàn trống và kệ không chất đầy. Nếu gia đình bạn nhiều đồ và không có thói quen cất gọn, hãy tăng gấp đôi lượng tủ kín trong thiết kế — hoặc chọn phong cách khác thay vì sống trong một căn nhà luôn trông bừa.',
      },
    ],
  },

  {
    slug: 'chong-am-moc-do-go-mua-nom',
    title: 'Chống ẩm mốc cho đồ gỗ mùa nồm: làm được gì và không làm được gì',
    excerpt:
      'Mùa nồm không sửa được bằng một cái máy hút ẩm. Đây là những việc thật sự có tác dụng, và những mẹo phổ biến mà chúng tôi khuyên bạn đừng làm.',
    category: 'Bảo quản',
    tags: ['bảo quản', 'độ ẩm', 'mùa nồm'],
    date: '2026-07-14',
    minutes: 7,
    cover: px(7166560, 'pexels-photo-7166560'),
    coverAlt: 'Tủ áo và tab đầu giường màu trắng trong phòng ngủ',
    author: AUTHORS.nam,
    body: [
      {
        t: 'p',
        text: 'Mỗi tháng ba, tổng đài của chúng tôi nhận nhiều cuộc gọi hơn hẳn. Nội dung gần như giống nhau: cánh tủ khó đóng, mặt gỗ có chấm trắng, ngăn kéo rít. Đây là chuyện của độ ẩm, và phần lớn xử lý được nếu làm đúng thứ tự.',
      },
      { t: 'h2', text: 'Hiểu vấn đề trước đã' },
      {
        t: 'p',
        text: 'Gỗ là vật liệu hút ẩm. Khi độ ẩm không khí tăng, gỗ hút nước và nở ra — chủ yếu nở theo chiều ngang thớ, gần như không nở theo chiều dọc. Đó là lý do cánh tủ kẹt ở cạnh chứ không phải ở trên dưới. Khi khô lại, nó co về gần như cũ.',
      },
      {
        t: 'note',
        title: 'Đừng bào cánh tủ khi đang mùa nồm',
        text: 'Đây là lỗi tốn kém nhất. Bạn bào bớt 2mm cho cánh đóng được, đến mùa khô gỗ co lại và cánh hở một khe 2mm vĩnh viễn. Chờ qua mùa nồm rồi mới đánh giá.',
      },
      { t: 'h2', text: 'Những việc thật sự có tác dụng' },
      {
        t: 'ol',
        items: [
          'Đóng kín cửa và cửa sổ vào ngày nồm. Trực giác bảo mở cửa cho thoáng, nhưng không khí ngoài trời còn ẩm hơn trong nhà — mở cửa là mời hơi nước vào.',
          'Bật điều hoà chế độ khô (Dry) 2–3 tiếng mỗi ngày. Rẻ và hiệu quả hơn nhiều so với mua máy hút ẩm riêng, nếu nhà đã có điều hoà.',
          'Đặt túi hút ẩm silica gel trong tủ áo và tủ bếp dưới. Loại tái sử dụng được, sấy lại là dùng tiếp.',
          'Lau khô ngay khi thấy đọng nước trên mặt gỗ. Nước đọng 24 giờ là đủ để bắt đầu phồng cạnh ván công nghiệp.',
          'Kê đồ cách tường 2–3cm. Mặt sau tủ áp sát tường là chỗ mốc xuất hiện đầu tiên, và cũng là chỗ bạn phát hiện muộn nhất.',
        ],
      },
      { t: 'h2', text: 'Những việc nên tránh' },
      {
        t: 'ul',
        items: [
          'Dùng quạt thổi thẳng vào đồ gỗ: chỉ làm khô bề mặt không đều, dễ gây nứt lớp hoàn thiện.',
          'Lau bằng khăn ướt hoặc nước lau sàn: đang thừa ẩm mà thêm nước vào là đi ngược vấn đề. Dùng khăn microfiber khô hoặc hơi ẩm rồi lau lại khô ngay.',
          'Đốt nến hay đun nước cho "ấm nhà": sinh thêm hơi nước, làm tình hình nặng hơn.',
          'Phủ nilon lên đồ gỗ: hơi ẩm bị giữ lại bên dưới, tạo môi trường kín cho nấm mốc phát triển nhanh hơn.',
        ],
      },
      { t: 'h2', text: 'Khi đã có mốc' },
      {
        t: 'p',
        text: 'Chấm trắng hoặc xanh trên bề mặt là nấm mốc bề mặt, còn xử lý được. Pha cồn 70 độ với nước theo tỉ lệ 1:1, thấm khăn mềm lau nhẹ, để khô tự nhiên trong phòng có điều hoà. Không dùng thuốc tẩy — nó ăn màu hoàn thiện và để lại vệt sáng vĩnh viễn.',
      },
      {
        t: 'p',
        text: 'Nếu ván đã phồng ở cạnh, hoặc mốc ăn vào trong thớ gỗ và không lau đi được, thì đó là hỏng cấu trúc chứ không phải vết bẩn. Lúc này cần thay tấm ván, và nên gọi đơn vị thi công — nếu còn hạn bảo hành thì phần lớn trường hợp được xử lý miễn phí.',
      },
      {
        t: 'quote',
        text: 'Kiểm tra mặt sau tủ áo mỗi tháng ba. Chín trên mười ca mốc nặng chúng tôi gặp đều bắt đầu từ đó và bị phát hiện quá muộn.',
        by: 'Phạm Hoàng Nam, quản đốc xưởng',
      },
    ],
  },

  {
    slug: 'doc-ban-ve-3d-truoc-khi-ky',
    title: 'Đọc phối cảnh 3D: 6 chi tiết cần soi trước khi ký hợp đồng',
    excerpt:
      'Ảnh 3D đẹp là chuyện dễ. Bản vẽ đúng mới khó. Đây là những chỗ bạn nên phóng to và hỏi lại trước khi đặt bút.',
    category: 'Kinh nghiệm',
    tags: ['bản vẽ 3D', 'hợp đồng', 'thiết kế'],
    date: '2026-07-03',
    minutes: 6,
    cover: px(6615190, 'pexels-photo-6615190'),
    coverAlt: 'Bàn tay kiến trúc sư vẽ bản vẽ kỹ thuật bằng thước và bút chì',
    author: AUTHORS.ha,
    body: [
      {
        t: 'p',
        text: 'Phần mềm dựng 3D bây giờ đủ tốt để làm mọi thứ trông sang trọng — kể cả những thứ không thi công được, hoặc thi công được nhưng dùng thì bất tiện. Sáu chi tiết dưới đây là nơi khoảng cách giữa ảnh và thực tế hay xuất hiện nhất.',
      },
      { t: 'h2', text: '1. Ổ điện và công tắc' },
      {
        t: 'p',
        text: 'Rất nhiều phối cảnh không vẽ ổ điện, vì chúng làm xấu ảnh. Hãy hỏi thẳng: ổ điện ở đâu, cao bao nhiêu, và có bị tủ che không. Ổ điện nằm sau lưng tủ áo là chuyện xảy ra thường xuyên hơn bạn tưởng.',
      },
      { t: 'h2', text: '2. Chiều mở cửa và khoảng lấy đồ' },
      {
        t: 'ul',
        items: [
          'Cánh tủ mở ra có va vào cánh cửa phòng hay góc tường không?',
          'Ngăn kéo dưới cùng kéo hết ra thì còn đủ chỗ đứng không?',
          'Cửa tủ lạnh mở 90° hay 120°? Nếu kê sát tường, có thể không rút được khay ra.',
        ],
      },
      { t: 'h2', text: '3. Chiều cao thật của tủ trên' },
      {
        t: 'p',
        text: 'Trong ảnh 3D, người mẫu thường được dựng cao 1m75 nên với tới tủ trên thoải mái. Nếu người dùng bếp chính trong nhà bạn cao 1m55, ngăn trên cùng sẽ thành chỗ cất đồ không bao giờ dùng tới. Yêu cầu bản vẽ mặt đứng có ghi cao độ thật.',
      },
      {
        t: 'note',
        title: 'Câu hỏi nên hỏi',
        text: '"Cho tôi xem bản vẽ mặt đứng (elevation) có ghi kích thước, không phải phối cảnh." Phối cảnh để duyệt thẩm mỹ; mặt đứng mới là thứ xưởng dùng để sản xuất.',
      },
      { t: 'h2', text: '4. Vật liệu ghi trên bản vẽ, không phải trong ảnh' },
      {
        t: 'p',
        text: 'Bề mặt trong ảnh 3D là texture, và texture thì miễn phí. Mảng "đá cẩm thạch" trong render có thể là đá tự nhiên, đá nhân tạo, hay tấm nhựa vân đá — chênh nhau nhiều lần về giá. Bảng vật liệu kèm mã sản phẩm là thứ bạn ký, không phải ảnh.',
      },
      { t: 'h2', text: '5. Nguồn sáng trong render' },
      {
        t: 'p',
        text: 'Nhiều phối cảnh dùng ánh sáng môi trường giả để mọi góc đều sáng đều. Thực tế căn phòng chỉ có đèn ở những vị trí trên bản vẽ điện. Đối chiếu: mỗi vùng sáng trong ảnh có một nguồn đèn tương ứng trên sơ đồ trần không?',
      },
      { t: 'h2', text: '6. Những thứ đời thực có mà render không có' },
      {
        t: 'p',
        text: 'Cục nóng điều hoà, hộp kỹ thuật, ống nước chờ, thùng rác, máy giặt, giá phơi đồ, chỗ để giày. Render thường bỏ hết. Hỏi rõ từng thứ sẽ ở đâu — đây là danh sách ngắn nhưng nó quyết định căn nhà có dùng được không.',
      },
      {
        t: 'quote',
        text: 'Phối cảnh đẹp bán được hợp đồng. Bản vẽ mặt đứng đúng kích thước mới bàn giao được công trình.',
      },
      {
        t: 'p',
        text: 'Một đơn vị làm việc nghiêm túc sẽ vui vẻ đưa bạn bộ bản vẽ kỹ thuật đầy đủ: mặt bằng bố trí, mặt bằng trần, sơ đồ điện, và mặt đứng từng khu vực. Nếu chỉ có phối cảnh và không có gì khác, hãy hỏi tiếp trước khi ký.',
      },
    ],
  },

  {
    slug: 'kich-thuoc-tu-bep-cho-nguoi-viet',
    title: 'Tủ bếp: chiều cao, chiều sâu và tam giác bếp cho người Việt',
    excerpt:
      'Thông số tủ bếp tiêu chuẩn phần lớn lấy từ châu Âu. Đây là các con số chúng tôi điều chỉnh lại theo chiều cao và thói quen nấu nướng của người Việt.',
    category: 'Kinh nghiệm',
    tags: ['tủ bếp', 'kích thước', 'công năng'],
    date: '2026-06-25',
    minutes: 7,
    cover: px(7214158, 'pexels-photo-7214158'),
    coverAlt: 'Đảo bếp với ghế bar trong căn bếp sáng màu',
    author: AUTHORS.khoa,
    body: [
      {
        t: 'p',
        text: 'Chiều cao mặt bếp tiêu chuẩn 85–90cm đến từ chuẩn nhân trắc châu Âu, nơi chiều cao trung bình nữ giới là 1m66. Ở Việt Nam con số đó là khoảng 1m55. Chênh 11cm ở người dùng nghĩa là chênh khoảng 5–6cm ở mặt bếp — đủ để gây mỏi vai sau vài năm.',
      },
      { t: 'h2', text: 'Công thức tính chiều cao mặt bếp' },
      {
        t: 'p',
        text: 'Cách đơn giản và đủ chính xác: chiều cao khuỷu tay khi đứng thẳng, trừ đi 10–15cm. Đo trên chính người nấu ăn nhiều nhất trong nhà, không phải người cao nhất.',
      },
      {
        t: 'table',
        head: ['Chiều cao người nấu', 'Mặt bếp', 'Đáy tủ trên (cách mặt bếp)'],
        rows: [
          ['1m50 – 1m55', '78 – 80 cm', '55 cm'],
          ['1m56 – 1m62', '80 – 84 cm', '58 cm'],
          ['1m63 – 1m70', '85 – 88 cm', '60 cm'],
          ['Trên 1m70', '88 – 92 cm', '62 cm'],
        ],
      },
      {
        t: 'note',
        title: 'Mẹo cho bếp hai người dùng',
        text: 'Nếu hai người nấu và chênh chiều cao nhiều, làm mặt bếp hai cao độ: khu vực rửa và sơ chế thấp hơn khu vực bếp nấu 4–5cm. Nhìn cũng đẹp hơn một mặt phẳng dài đơn điệu.',
      },
      { t: 'h2', text: 'Tam giác bếp và vì sao nó vẫn đúng' },
      {
        t: 'p',
        text: 'Nguyên tắc tam giác nối ba điểm: tủ lạnh (lấy đồ), chậu rửa (sơ chế), bếp nấu. Tổng ba cạnh nên nằm trong khoảng 4–7m, và không cạnh nào ngắn hơn 1.2m.',
      },
      {
        t: 'ul',
        items: [
          'Ngắn hơn 4m: ba khu chen nhau, hai người vào bếp là vướng.',
          'Dài hơn 7m: mỗi bữa cơm bạn đi thêm vài chục mét không cần thiết.',
          'Không đặt vật cản trong lòng tam giác — đảo bếp cắt ngang đường đi giữa chậu rửa và bếp nấu là lỗi bố trí phổ biến.',
        ],
      },
      { t: 'h2', text: 'Vài con số hay bị bỏ sót' },
      {
        t: 'ol',
        items: [
          'Khoảng thao tác giữa hai dãy tủ đối diện: tối thiểu 100cm, lý tưởng 120cm. Dưới 90cm thì không mở được ngăn kéo hai bên cùng lúc.',
          'Mặt thao tác cạnh bếp nấu: tối thiểu 40cm mỗi bên để đặt nồi nóng.',
          'Mặt thao tác cạnh chậu rửa: tối thiểu 60cm ở phía tay thuận để úp bát đĩa.',
          'Chiều sâu tủ dưới 60cm là chuẩn, nhưng nếu bếp hẹp có thể xuống 55cm mà gần như không mất công năng.',
          'Ổ điện trên mặt bếp: cao 15–20cm so với mặt đá, cách bếp nấu và chậu rửa tối thiểu 60cm.',
        ],
      },
      { t: 'h2', text: 'Đặc thù bếp Việt' },
      {
        t: 'p',
        text: 'Bếp Việt chiên xào nhiều dầu mỡ và dùng nước mắm, giấm — môi trường ăn mòn hơn bếp Âu. Ba điều chỉnh chúng tôi luôn đề xuất:',
      },
      {
        t: 'ul',
        items: [
          'Máy hút mùi công suất tối thiểu 1000 m³/h, không phải 700 như khuyến nghị chung. Và đặt cách mặt bếp 65–70cm.',
          'Kính ốp bếp thay vì gạch: không có ron để bám dầu, lau một lần là sạch.',
          'Thùng tủ dưới khu vực chậu rửa dùng plywood chống ẩm hoặc nhựa picomat, tuyệt đối không MDF thường.',
        ],
      },
      {
        t: 'p',
        text: 'Cuối cùng: hãy đứng thử ở vị trí bếp nấu trong bản vẽ và tưởng tượng một bữa cơm bình thường. Bạn để rổ rau ở đâu, quay người bao nhiêu độ để lấy nồi, đặt đĩa nóng xuống chỗ nào. Nếu câu trả lời nào cũng có, bản vẽ đó dùng được.',
      },
    ],
  },

  {
    slug: 'nhat-ky-cai-tao-can-ho-78m2',
    title: 'Nhật ký cải tạo căn hộ 78m²: 42 ngày, từng tuần một',
    excerpt:
      'Một dự án thật ở Masteri Thảo Điền, ghi lại theo tuần — gồm cả hai chỗ trục trặc và cách xử lý. Để bạn biết mình sẽ trải qua những gì.',
    category: 'Kinh nghiệm',
    tags: ['cải tạo', 'tiến độ', 'case study'],
    date: '2026-06-12',
    minutes: 9,
    cover: px(6527041, 'pexels-photo-6527041'),
    coverAlt: 'Phòng ăn căn hộ với bàn trắng và đèn thả gỗ',
    author: AUTHORS.ha,
    body: [
      {
        t: 'p',
        text: 'Chủ nhà là một gia đình ba người, bé gái bốn tuổi. Yêu cầu: nhiều chỗ cất đồ, bo hết cạnh sắc, sơn gốc nước, và phải xong trước khi bé vào lớp một. Ngân sách 480 triệu. Dưới đây là toàn bộ tiến trình.',
      },
      { t: 'h2', text: 'Tuần 0 — Khảo sát và đo đạc (2 ngày)' },
      {
        t: 'p',
        text: 'Kiến trúc sư tới đo hiện trạng. Phát hiện ngay hai điều mà bản vẽ chủ đầu tư không có: hộp kỹ thuật ở góc bếp lấn vào 22cm, và trần khu vực phòng khách thấp hơn phần còn lại 8cm do đi ống điều hoà. Cả hai đều ảnh hưởng tới thiết kế tủ.',
      },
      {
        t: 'note',
        title: 'Vì sao phải đo lại',
        text: 'Bản vẽ chủ đầu tư là bản thiết kế, không phải bản hoàn công. Sai lệch 2–5cm là bình thường. Đơn vị nào báo giá mà chưa từng tới đo, con số đó chỉ là ước lượng.',
      },
      { t: 'h2', text: 'Tuần 1 — Concept và phối cảnh (6 ngày)' },
      {
        t: 'p',
        text: 'Hai phương án: Scandinavian gỗ sáng và Japandi tông trầm hơn. Gia đình chọn phương án một, nhưng lấy chi tiết kệ hở ở bếp từ phương án hai. Chỉnh sửa hai vòng, chủ yếu về màu cánh tủ bếp.',
      },
      { t: 'h2', text: 'Tuần 2 — Bản vẽ kỹ thuật và chốt báo giá (5 ngày)' },
      {
        t: 'p',
        text: 'Bóc tách 47 mã sản phẩm. Chủ nhà cắt hạng mục thảm và hai bức tranh trang trí để đưa ngân sách về đúng con số dự kiến, thêm ngân sách vào phụ kiện ray trượt Blum cho toàn bộ ngăn kéo. Ký hợp đồng, cọc 50%.',
      },
      { t: 'h2', text: 'Tuần 3–6 — Sản xuất tại xưởng (24 ngày)' },
      {
        t: 'p',
        text: 'Giai đoạn dài nhất và cũng yên tĩnh nhất với chủ nhà. Ngày thứ 18, gia đình lên xưởng nghiệm thu phần mộc trước khi sơn. Đây là lúc phát hiện trục trặc thứ nhất.',
      },
      {
        t: 'quote',
        text: 'Điều mình thích nhất là được lên xưởng nghiệm thu phần mộc trước khi sơn. Nhìn tận mắt mộng gỗ, thấy yên tâm hẳn so với chỉ xem ảnh 3D.',
        by: 'Chị Lê Minh Châu, chủ nhà',
      },
      {
        t: 'p',
        text: 'Trục trặc: mẫu màu sơn cánh tủ bếp lên thực tế đậm hơn mẫu giấy khoảng một tông. Xưởng làm lại hai cánh mẫu với hai tỉ lệ pha khác nhau, gia đình chọn lại, mất thêm 3 ngày. Chi phí do xưởng chịu vì đây là lỗi khớp mẫu.',
      },
      { t: 'h2', text: 'Tuần 7 — Lắp đặt (5 ngày)' },
      {
        t: 'p',
        text: 'Ngày 1 phủ bạt toàn bộ sàn và thang máy, vận chuyển vật tư. Ngày 2–3 lắp hệ tủ bếp và tủ áo. Ngày 4 lắp đồ rời và hệ chiếu sáng. Ngày 5 vệ sinh và nghiệm thu.',
      },
      {
        t: 'p',
        text: 'Trục trặc thứ hai: ổ điện cho đảo bếp nằm lệch 12cm so với vị trí trên bản vẽ điện của chủ đầu tư. Phải đi lại một đoạn dây âm sàn. Phát sinh 4,2 triệu, có báo trước và chủ nhà duyệt trước khi làm.',
      },
      {
        t: 'img',
        src: px(7061401, 'pexels-photo-7061401', 1600),
        caption: 'Khu bếp sau khi lắp đặt — mặt gỗ sồi, thân tủ matt đen, kệ hở lấy từ phương án hai.',
      },
      { t: 'h2', text: 'Tổng kết' },
      {
        t: 'table',
        head: ['Giai đoạn', 'Dự kiến', 'Thực tế'],
        rows: [
          ['Khảo sát + thiết kế', '13 ngày', '13 ngày'],
          ['Sản xuất', '24 ngày', '27 ngày'],
          ['Lắp đặt', '5 ngày', '5 ngày'],
          ['Tổng', '42 ngày', '45 ngày'],
        ],
      },
      {
        t: 'p',
        text: 'Chậm 3 ngày so với hợp đồng, do lỗi khớp màu từ phía xưởng. Theo điều khoản phạt tiến độ, chúng tôi giảm trừ 1,8 triệu vào đợt thanh toán cuối. Tổng chi phí cuối cùng: 484,2 triệu — chênh đúng bằng khoản đi lại điện đã được duyệt trước.',
      },
      {
        t: 'p',
        text: 'Bài học chúng tôi rút ra và đã đưa vào quy trình: mẫu màu phải duyệt trên chính vật liệu cuối cùng, không duyệt trên mẫu giấy. Từ dự án này trở đi, mọi hợp đồng đều kèm bước làm cánh mẫu thật trước khi sản xuất hàng loạt.',
      },
    ],
  },
]

export const getPost = (slug: string) => posts.find((p) => p.slug === slug)

/** Newest first — the source array is kept in authoring order. */
export const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date))

export const relatedPosts = (post: Post, limit = 3) =>
  sortedPosts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => {
      const score = (p: Post) =>
        (p.category === post.category ? 2 : 0) +
        p.tags.filter((t) => post.tags.includes(t)).length
      return score(b) - score(a)
    })
    .slice(0, limit)

export { formatDate } from './format'

/** A post without its body — what a listing needs, and a fraction of the size. */
export type PostSummary = Omit<Post, 'body'>

/**
 * The listing data, newest first.
 *
 * The index is a client component, so whatever it imports is downloaded; the
 * article bodies are by far the largest thing in this file and none of them are
 * read until a visitor opens a post.
 */
export const postSummaries: PostSummary[] = sortedPosts.map(({ body, ...rest }) => rest)
