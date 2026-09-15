# MT House — Interior

Trang chủ website nội thất MT House. Next.js 16 (App Router, Turbopack) + React 19 + Tailwind CSS 4, TypeScript.

```bash
npm install
npm run dev      # http://localhost:3211
npm run build    # sinh ra out/ — HTML tĩnh
npm run preview  # http://localhost:3411 — phục vụ out/ đúng như Apache sẽ làm
```

## Deploy

Site build ra **HTML tĩnh** (`output: 'export'` trong `next.config.mjs`): mọi route đều prerender, không có route handler / server action / ISR, nên không cần Node chạy ở production — chỉ cần một web server phát file.

### cPanel (Git Version Control)

1. Trong cPanel → **Git™ Version Control**, tạo repo trỏ tới `https://github.com/brucewave/mtt.vn.git`, branch `main`.
2. Mở `.cpanel.yml` và sửa `DEPLOYPATH` nếu site không nằm ở domain chính:
   - domain chính → `$HOME/public_html`
   - addon domain → `$HOME/mtt.vn`
   - subdomain → `$HOME/public_html/shop`
3. Bấm **Update from Remote** rồi **Deploy HEAD Commit**.

`.cpanel.yml` gọi `scripts/cpanel-deploy.sh`, script này:

- build trên server nếu có Node (tự `source` virtualenv trong `~/nodevenv` vì cPanel không để npm sẵn trong PATH của shell deploy);
- nếu server không có Node thì dùng thư mục `out/` đã commit sẵn (bỏ `out/` khỏi `.gitignore` rồi commit);
- xoá `_next` cũ ở document root (tên file có hash, không xoá thì chất đống) rồi copy `out/` sang, **không** đụng tới `cgi-bin`, `.well-known` hay thứ khác cPanel để ở đó.

`public/.htaccess` đi kèm bản build, lo phần Apache: `/du-an` → `du-an.html`, `ErrorDocument 404`, gzip và cache header.

cPanel từ chối deploy khi branch đang checkout còn thay đổi chưa commit — commit hết trước khi bấm Deploy.

### Vercel / Netlify / bất kỳ static host nào

Import repo, build command `npm run build`, output directory `out`. Đặt biến môi trường `NEXT_PUBLIC_SITE_URL` = domain thật, nếu không canonical và JSON-LD sẽ lấy mặc định `https://mtt.vn`.

## Trang

| Route | Nội dung |
| --- | --- |
| `/` | Trang chủ — hero tương tác, danh mục, sản phẩm nổi bật, dự án, quy trình, cảm nhận, form liên hệ |
| `/san-pham` | Danh sách 36 sản phẩm, lọc theo danh mục / khoảng giá, tìm kiếm (bỏ dấu), sắp xếp |
| `/gio-hang` | Giỏ hàng — sửa số lượng, xoá, tính phí giao lắp (miễn phí từ 20 triệu) |
| `/thanh-toan` | Thanh toán 3 bước: người nhận → hình thức nhận → thanh toán, có mã giảm giá và màn hình xác nhận đơn |
| `/blog` | 9 bài viết, lọc theo danh mục, tìm kiếm bỏ dấu, bài mới nhất làm featured |
| `/blog/[slug]` | Bài chi tiết — mục lục bám dính, thẻ chủ đề, CTA, prev/next, bài liên quan |
| `/baogia` | **Nội bộ** — công cụ lập báo giá cho khách, xuất PDF |

`/baogia` không có link công khai và đặt `robots: noindex`. Nó **chưa có đăng nhập** — ai biết URL đều vào được. Cần chặn thì thêm middleware basic-auth hoặc để sau reverse proxy.

## Giỏ hàng

`lib/cart.tsx` — React context + `localStorage` (`mthouse.cart.v1`). Có cờ `ready` để tránh lệch hydration: server render giỏ rỗng nên badge và tổng tiền chỉ hiện sau khi mount. Thêm vào giỏ được từ ba chỗ: card sản phẩm, sản phẩm nổi bật ở trang chủ, và **panel hotspot trong hero**.

## Blog

`lib/blog.ts` giữ toàn bộ nội dung. Thân bài là **mảng block có kiểu** (`p`, `h2`, `ul`, `ol`, `quote`, `note`, `img`, `table`) chứ không phải markdown — không cần parser, và TypeScript bắt lỗi ngay khi cấu trúc sai. `components/ArticleBody.tsx` render chúng; style nằm ở khối `.article` trong `app/globals.css`.

- Mục lục tự sinh từ các `h2` (`tableOfContents`), heading có `id` slug hoá bỏ dấu.
- Bài liên quan chấm điểm theo cùng danh mục (2đ) + số tag trùng (1đ/tag).
- 9 bài đều được prerender tĩnh qua `generateStaticParams`.
- Bảng trong bài cuộn ngang trong khung riêng; các cột grid có `min-w-0` để bảng rộng không đẩy cả layout tràn viewport trên mobile.

## Báo giá `/baogia`

Nhập thông tin khách + hạng mục (chọn từ danh mục có sẵn hoặc gõ dòng trống), chỉnh ĐVT / SL / đơn giá / chiết khấu từng dòng, đặt VAT, chiết khấu tổng, % cọc, ghi chú. Bên phải là bản xem trước A4 cập nhật realtime; bấm **In / Lưu PDF** → chọn máy in "Save as PDF".

- Bản nháp tự lưu vào `localStorage` (`mthouse.quote.v1`).
- `lib/doc-so.ts` đọc số tiền thành chữ tiếng Việt ("Một trăm bốn mươi sáu triệu năm trăm hai mươi nghìn đồng"), xử lý đúng *lẻ / mươi / mốt / tư / lăm* và nhóm `không trăm`.
- CSS in ở cuối `app/globals.css`: khi in chỉ còn `.quote-sheet`, ép `print-color-adjust: exact` để header bảng nền đen không bị máy in bỏ.

## Hero tương tác

`components/HeroShowcase.tsx` là phần lõi: slider 5 không gian thật (phòng khách, bếp, ngủ, văn phòng, phòng ăn), mỗi ảnh có 5–6 đốm sáng gắn đúng lên món nội thất. Nhấn vào đốm sáng → ảnh zoom & pan tới món đó, panel hiện giá, chất liệu, kích thước, mã SP.

Cách toạ độ hotspot luôn khớp với đồ đạc:

- Ảnh **không** dùng `object-cover` trực tiếp. Thay vào đó component tự tính một "cover layer" đúng bằng khung phủ kín stage (`coverBox`), rồi đặt hotspot **bên trong** layer đó theo `%`. Layer co giãn/di chuyển thì hotspot đi theo — không bao giờ lệch.
- `zoomTransform` dựng `transform-origin` ngay tại hotspot, scale lên, rồi dịch sao cho món đồ rơi vào vị trí đọc được (trái panel trên desktop, trên bottom-sheet ở mobile). Phần dịch được **clamp** lại để ảnh phóng to vẫn phủ kín khung, không hở mép.
- `zoomFor` giảm mức zoom trên màn dọc, vì khung dọc vốn đã crop ảnh 3:2 rất mạnh (~3×) chỉ để phủ kín.

Điều khiển: click đốm sáng · `←` `→` (đổi slide, hoặc đổi món khi đang mở) · `Esc` đóng · click ra ngoài đóng · tab tên phòng · autoplay 8s (dừng khi đang xem sản phẩm). Trên mobile có thêm hàng chip sản phẩm, vì nhiều đốm sáng bị crop ra ngoài khung.

## Dữ liệu

Toàn bộ nội dung là **giả lập** (giá, mã SP, thông số, tên khách hàng, địa chỉ) — thay bằng dữ liệu thật khi có.

- `lib/hero-data.ts` — 5 slide + 28 hotspot. `x` / `y` là toạ độ chuẩn hoá 0→1 **đọc trực tiếp từ ảnh gốc**; nếu đổi ảnh thì phải đo lại, đừng làm tròn cho đẹp.
- `lib/catalog.ts` — catalog 36 món: 28 món lấy thẳng từ hotspot hero (đã có đủ thông số) + 8 món có ảnh sản phẩm riêng. Đây là nguồn dữ liệu duy nhất cho trang sản phẩm, giỏ hàng, thanh toán và báo giá.
- `lib/site-data.ts` — danh mục, dự án, quy trình, cảm nhận, thông tin showroom.

28 món lấy từ hero không có ảnh cắt nền riêng, nên được hiển thị bằng cách **crop chính tấm ảnh phòng** quanh toạ độ hotspot (`cropStyle`). Công thức là quy tắc phần trăm của `background-position`: điểm ở tỉ lệ `f` của ảnh rơi vào tỉ lệ `p` của khung khi `p = (0.5 − f·Z)/(1 − Z)`. Nhờ vậy card sản phẩm hiện đúng món đồ trong ảnh công trình thật.

## Ảnh

Tất cả đều là **ảnh thật** lấy từ Pexels (license miễn phí, không cần ghi nguồn), load qua `next/image`. Hero khai báo `sizes` lớn hơn 100vw vì ảnh sẽ bị phóng tới ~3×.

Bản build tĩnh không có image optimizer của Next đứng sau, nên `lib/image-loader.ts` đổi tham số `w=` trên chính URL Pexels — CDN của Pexels resize giúp, srcset vẫn hoạt động. Nếu không có loader này thì mọi card sẽ nhận ảnh gốc 2400px.

Khi lên production nên tự host lại ảnh (hoặc thay bằng ảnh công trình thật của MT House) thay vì hotlink Pexels.

## Thương hiệu

Logo dùng **file gốc** `public/mthouse-logo.png` (copy từ `d:\sidstudio\assets\mthouse\images\MTHouse-Logo-chu-ngang-*.png`). Trên nền tối, chữ "HOUSE" màu gần đen sẽ biến mất, nên `tone="light"` xếp chồng hai bản cắt của cùng file: phần mark giữ nguyên gradient cam, phần chữ bên phải mốc 36% bị knock-out sang trắng. (Invert cả file làm đục gradient, tô trắng cả file thì mất màu thương hiệu.)

Bảng màu nằm ở `@theme` trong `app/globals.css`: `flame` (cam→đỏ của logo), `steel` (xám chữ T), `ink`, `paper`. Font: Be Vietnam Pro (body, có dấu tiếng Việt), Playfair Display (tiêu đề).

## Ảnh chụp kiểm tra

```bash
node scripts/shot.mjs http://localhost:3211/ shots/page page 1600 1000   # cuộn hết trang
node scripts/shot.mjs http://localhost:3211/ shots/h    hero 1600 1000   # mở từng hotspot
node scripts/shot.mjs http://localhost:3211/ shots/m    mobile 430 932   # bản mobile
node scripts/logo-shot.mjs                                               # logo trên nền sáng / tối
node scripts/shot-pages.mjs                                              # 4 trang mới + bản in báo giá
```

Cần Chrome tại `C:/Program Files/Google/Chrome/Application/chrome.exe`.

## Chưa làm

- **Không có backend.** Đặt hàng chỉ sinh mã đơn phía client rồi xoá giỏ; form liên hệ chưa gửi đi đâu; mã giảm giá (`MTHOUSE10`, `TANNHA5`) hard-code trong `CheckoutView.tsx`. Cần nối API/CMS trước khi chạy thật.
- Chưa có trang chi tiết sản phẩm (`/san-pham/[slug]`) — card hiện thêm thẳng vào giỏ.
- `/baogia` chưa có xác thực, và báo giá chỉ lưu trong trình duyệt của máy đang dùng (không đồng bộ giữa các máy).
- Ảnh vẫn hotlink Pexels; chỉ logo là asset thật của MT House.
