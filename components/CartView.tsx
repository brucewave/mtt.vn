'use client'

import Link from 'next/link'
import ProductMedia from './ProductMedia'
import { formatVnd } from '@/lib/format'
import { useCart } from '@/lib/cart'
import { useCartItems } from '@/lib/cart-items'

export const SHIPPING_FREE_OVER = 20_000_000
export const SHIPPING_FEE = 450_000

export function QtyStepper({
  qty,
  onChange,
  compact = false,
}: {
  qty: number
  onChange: (n: number) => void
  compact?: boolean
}) {
  const size = compact ? 'h-8 w-8' : 'h-9 w-9'
  return (
    <div className="inline-flex items-center rounded-full border border-ink-900/15">
      <button
        type="button"
        onClick={() => onChange(qty - 1)}
        aria-label="Giảm số lượng"
        className={`${size} grid place-items-center rounded-full text-ink-700 transition-colors hover:bg-ink-900/6`}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14" strokeLinecap="round" />
        </svg>
      </button>
      <input
        value={qty}
        onChange={(e) => {
          const n = parseInt(e.target.value.replace(/\D/g, ''), 10)
          onChange(Number.isNaN(n) ? 0 : n)
        }}
        aria-label="Số lượng"
        inputMode="numeric"
        className="w-9 bg-transparent text-center text-[14px] font-medium text-ink-900 outline-none"
      />
      <button
        type="button"
        onClick={() => onChange(qty + 1)}
        aria-label="Tăng số lượng"
        className={`${size} grid place-items-center rounded-full text-ink-700 transition-colors hover:bg-ink-900/6`}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12h14" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  )
}

export function EmptyCart() {
  return (
    <div className="rounded-sm border border-dashed border-ink-900/15 px-6 py-20 text-center">
      <p className="font-display text-3xl text-ink-900">Giỏ hàng đang trống</p>
      <p className="mx-auto mt-3 max-w-sm text-[14px] leading-relaxed text-steel-500">
        Bạn có thể bắt đầu từ danh sách sản phẩm, hoặc mở một không gian mẫu ở trang chủ rồi nhấn
        thẳng vào món đồ trong ảnh.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/san-pham"
          className="rounded-full bg-flame-500 px-6 py-3 text-[13px] font-medium tracking-wide text-white transition-colors hover:bg-flame-600"
        >
          Xem sản phẩm
        </Link>
        <Link
          href="/#hero"
          className="rounded-full border border-ink-900/20 px-6 py-3 text-[13px] font-medium tracking-wide text-ink-900 transition-colors hover:border-flame-500 hover:text-flame-600"
        >
          Khám phá không gian mẫu
        </Link>
      </div>
    </div>
  )
}

export default function CartView() {
  const { count, setQty, remove, clear, ready } = useCart()
  const { items, subtotal, compareTotal } = useCartItems()

  if (!ready) {
    return <div className="h-64 animate-pulse rounded-sm bg-paper-dim" aria-hidden />
  }

  if (items.length === 0) return <EmptyCart />

  const saved = compareTotal - subtotal
  const shipping = subtotal >= SHIPPING_FREE_OVER ? 0 : SHIPPING_FEE
  const total = subtotal + shipping

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
      <div className="lg:col-span-7 xl:col-span-8">
        <div className="flex items-center justify-between border-b border-ink-900/10 pb-4">
          <p className="text-[13px] text-steel-500">{count} món trong giỏ</p>
          <button
            type="button"
            onClick={clear}
            className="text-[13px] text-steel-500 underline decoration-ink-900/15 underline-offset-4 transition-colors hover:text-flame-600"
          >
            Xoá tất cả
          </button>
        </div>

        <ul>
          {items.map(({ item, qty, amount }) => (
            <li
              key={item.id}
              className="flex gap-4 border-b border-ink-900/8 py-6 sm:gap-6"
            >
              <div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-sm bg-paper-dim sm:w-32">
                <ProductMedia item={item} aspect={1} sizes="128px" />
              </div>

              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-[11px] tracking-[0.16em] text-steel-400 uppercase">
                      {item.category}
                    </p>
                    <h3 className="mt-1 text-[15px] font-medium text-ink-900">{item.name}</h3>
                    <p className="mt-1 text-[12px] text-steel-500">
                      Mã {item.sku} · {item.size}
                    </p>
                    <p className="mt-0.5 text-[12px] text-steel-500">{item.finish}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(item.id)}
                    aria-label={`Bỏ ${item.name} khỏi giỏ`}
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-steel-400 transition-colors hover:bg-ink-900/6 hover:text-ink-900"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>

                <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-4">
                  <QtyStepper qty={qty} onChange={(n) => setQty(item.id, n)} />
                  <div className="text-right">
                    <p className="text-[15px] font-semibold text-ink-900">{formatVnd(amount)}</p>
                    {qty > 1 && (
                      <p className="text-[12px] text-steel-500">{formatVnd(item.price)} / món</p>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <Link
          href="/san-pham"
          className="mt-8 inline-flex items-center gap-2 text-[13px] text-steel-600 transition-colors hover:text-flame-600"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M19 12H5M11 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Tiếp tục chọn sản phẩm
        </Link>
      </div>

      {/* ---------- Summary ---------- */}
      <aside className="lg:col-span-5 xl:col-span-4">
        <div className="sticky top-28 rounded-sm border border-ink-900/8 bg-paper-dim/50 p-6 sm:p-7">
          <h2 className="font-display text-2xl text-ink-900">Tóm tắt đơn</h2>

          <dl className="mt-6 space-y-3 text-[14px]">
            <div className="flex justify-between">
              <dt className="text-steel-600">Tạm tính</dt>
              <dd className="text-ink-900">{formatVnd(subtotal)}</dd>
            </div>
            {saved > 0 && (
              <div className="flex justify-between">
                <dt className="text-steel-600">Tiết kiệm</dt>
                <dd className="text-flame-600">−{formatVnd(saved)}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-steel-600">Vận chuyển &amp; lắp đặt</dt>
              <dd className={shipping === 0 ? 'text-flame-600' : 'text-ink-900'}>
                {shipping === 0 ? 'Miễn phí' : formatVnd(shipping)}
              </dd>
            </div>
          </dl>

          {shipping > 0 && (
            <p className="mt-3 rounded-sm bg-flame-50 px-3 py-2 text-[12px] leading-relaxed text-flame-800">
              Mua thêm {formatVnd(SHIPPING_FREE_OVER - subtotal)} để được miễn phí giao lắp.
            </p>
          )}

          <div className="mt-5 flex items-baseline justify-between border-t border-ink-900/10 pt-5">
            <span className="text-[13px] tracking-[0.16em] text-steel-500 uppercase">Tổng cộng</span>
            <span className="font-display text-3xl text-ink-900">{formatVnd(total)}</span>
          </div>
          <p className="mt-1 text-right text-[12px] text-steel-500">Đã bao gồm VAT 10%</p>

          <Link
            href="/thanh-toan"
            className="mt-6 block rounded-full bg-flame-500 px-6 py-4 text-center text-[13px] font-medium tracking-[0.12em] text-white uppercase transition-colors hover:bg-flame-600"
          >
            Tiến hành thanh toán
          </Link>

          <ul className="mt-6 space-y-2.5 text-[12px] text-steel-500">
            {[
              'Bảo hành khung gỗ 5 năm, phụ kiện 2 năm',
              'Đổi trả trong 7 ngày nếu lỗi từ nhà sản xuất',
              'Thanh toán khi nhận hàng hoặc chuyển khoản',
            ].map((t) => (
              <li key={t} className="flex gap-2">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="mt-0.5 shrink-0 text-flame-500"
                >
                  <path d="M4 12.5l5 5L20 6.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  )
}
