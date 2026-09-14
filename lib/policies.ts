/**
 * The policy pages a Vietnamese storefront is expected to have.
 *
 * Plain paragraphs rather than rich blocks: every one of these is a list of
 * short statements, and a typed array keeps them from drifting apart in tone.
 */

export type Policy = {
  slug: string
  title: string
  lead: string
  body: string[]
}

export const policies: Policy[] = [
  {
    slug: 'chinh-sach-bao-hanh',
    title: 'Chính sách bảo hành',
    lead: 'Bảo hành tính từ ngày bàn giao, ghi trong hồ sơ đi kèm từng món.',
    body: [
      'Bảo hành khung gỗ và cấu kiện gỗ 5 năm kể từ ngày bàn giao.',
      'Bảo hành phụ kiện kim khí (ray trượt, bản lề, tay nắm) 2 năm.',
      'Bảo dưỡng định kỳ miễn phí trong 12 tháng đầu.',
      'Bảo hành không áp dụng cho hư hỏng do ngập nước, va đập mạnh, tự ý tháo lắp hoặc sử dụng sai công năng.',
      'Khi cần bảo hành, vui lòng gọi hotline kèm mã đơn hàng; đội kỹ thuật sẽ hẹn lịch trong vòng 48 giờ làm việc.',
    ],
  },
  {
    slug: 'chinh-sach-doi-tra',
    title: 'Chính sách đổi trả',
    lead: 'Đổi trả trong 7 ngày nếu lỗi đến từ nhà sản xuất.',
    body: [
      'Đổi trả trong 7 ngày kể từ ngày nhận hàng nếu sản phẩm lỗi từ nhà sản xuất.',
      'Sản phẩm đổi trả cần còn nguyên trạng, chưa qua sử dụng, còn đủ bao bì và phiếu bàn giao.',
      'Hàng đóng theo kích thước riêng của khách không áp dụng đổi trả, trừ trường hợp sai so với bản vẽ đã duyệt.',
      'Hàng độc bản không áp dụng đổi trả vì không có bản thứ hai để thay thế; chúng tôi hoàn tiền nếu lỗi thuộc về sản xuất.',
      'Chi phí vận chuyển đổi trả do chúng tôi chịu nếu lỗi thuộc về nhà sản xuất.',
    ],
  },
  {
    slug: 'van-chuyen-lap-dat',
    title: 'Vận chuyển & lắp đặt',
    lead: 'Miễn phí giao lắp cho đơn từ 20 triệu trong bán kính 30km.',
    body: [
      'Miễn phí giao và lắp đặt cho đơn từ 20 triệu trong bán kính 30km từ showroom.',
      'Dưới mức này, phí giao lắp là 450.000đ mỗi đơn.',
      'Thời gian giao lắp 7 – 21 ngày tuỳ tình trạng hàng có sẵn; hàng đóng theo yêu cầu 20 – 30 ngày kể từ ngày chốt mẫu và nhận cọc.',
      'Đội lắp đặt phủ bạt bảo vệ sàn, thi công gọn và dọn sạch trước khi rời đi.',
      'Khách ở tỉnh xa vui lòng gọi hotline để được báo phí vận chuyển cụ thể.',
    ],
  },
  {
    slug: 'chinh-sach-bao-mat',
    title: 'Chính sách bảo mật',
    lead: 'Thông tin bạn để lại chỉ dùng để liên hệ và xử lý đơn hàng.',
    body: [
      'Chúng tôi thu thập họ tên, số điện thoại, email và địa chỉ giao hàng — chỉ để liên hệ tư vấn, xử lý đơn hàng và bảo hành.',
      'Thông tin của bạn không được bán hoặc chia sẻ cho bên thứ ba, ngoại trừ đơn vị vận chuyển trong phạm vi cần thiết để giao hàng.',
      'Giỏ hàng được lưu ngay trong trình duyệt của bạn, không gửi về máy chủ cho tới khi bạn bấm đặt hàng.',
      'Bạn có quyền yêu cầu xem, sửa hoặc xoá thông tin của mình bằng cách liên hệ hotline hoặc email của chúng tôi.',
    ],
  },
  {
    slug: 'dieu-khoan-mua-ban',
    title: 'Điều khoản mua bán',
    lead: 'Những điều được thống nhất trước khi đơn hàng vào sản xuất.',
    body: [
      'Giá niêm yết trên website đã bao gồm VAT.',
      'Đơn hàng chỉ được đưa vào sản xuất sau khi nhân viên gọi xác nhận với khách.',
      'Với hình thức chuyển khoản, đơn hàng cần đặt cọc 30%; phần còn lại thanh toán khi bàn giao.',
      'Hình ảnh sản phẩm mang tính minh hoạ; vân gỗ và sắc vải tự nhiên có thể chênh nhẹ giữa các lô.',
      'Mọi tranh chấp được ưu tiên giải quyết bằng thương lượng trước khi đưa ra cơ quan có thẩm quyền.',
    ],
  },
]

export const getPolicy = (slug: string) => policies.find((p) => p.slug === slug)
