'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import ProductMedia from './ProductMedia'
import { EmptyCart, SHIPPING_FEE, SHIPPING_FREE_OVER } from './CartView'
import { formatVnd } from '@/lib/format'
import { useCart } from '@/lib/cart'
import { useCartItems } from '@/lib/cart-items'
import { showroom } from '@/lib/site-data'

const DELIVERY = [
  {
    id: 'install',
    label: 'Giao & lắp đặt tận nơi',
    note: 'Đội lắp đặt phủ bạt bảo vệ sàn, thi công và dọn sạch trước khi rời đi.',
    days: '7 – 21 ngày tuỳ hàng có sẵn',
  },
  {
    id: 'pickup',
    label: 'Nhận tại showroom Thảo Điền',
    note: showroom.address,
    days: 'Sẵn sàng sau 24 giờ',
  },
] as const

const PAYMENT = [
  { id: 'cod', label: 'Thanh toán khi nhận hàng (COD)', note: 'Trả toàn bộ khi nhận và kiểm tra hàng.' },
  {
    id: 'transfer',
    label: 'Chuyển khoản ngân hàng',
    note: 'Cọc 30%, phần còn lại thanh toán khi bàn giao.',
  },
  { id: 'card', label: 'Thẻ nội địa / quốc tế', note: 'Visa, Mastercard, JCB, thẻ ATM nội địa.' },
  {
    id: 'installment',
    label: 'Trả góp 0% qua thẻ tín dụng',
    note: 'Kỳ hạn 3 / 6 / 12 tháng, áp dụng cho đơn từ 10 triệu.',
  },
] as const

/** Demo promo codes — a real store would validate these server-side. */
const PROMOS: Record<string, { off: number; label: string }> = {
  MTHOUSE10: { off: 0.1, label: 'Giảm 10% toàn đơn' },
  TANNHA5: { off: 0.05, label: 'Ưu đãi tân gia — giảm 5%' },
}

const field =
  'w-full border-b border-ink-900/15 bg-transparent py-3 text-[15px] text-ink-900 outline-none transition-colors placeholder:text-steel-400 focus:border-flame-500'
const labelCls = 'text-[11px] tracking-[0.16em] text-steel-500 uppercase'

export default function CheckoutView() {
  const { count, clear, ready } = useCart()
  const { items, subtotal } = useCartItems()

  const [delivery, setDelivery] = useState<string>('install')
  const [payment, setPayment] = useState<string>('cod')
  const [promoInput, setPromoInput] = useState('')
  const [promo, setPromo] = useState<{ code: string; off: number; label: string } | null>(null)
  const [promoError, setPromoError] = useState('')
  const [placed, setPlaced] = useState<{ code: string; total: number } | null>(null)

  const totals = useMemo(() => {
    const discount = promo ? Math.round(subtotal * promo.off) : 0
    const afterDiscount = subtotal - discount
    const shipping =
      delivery === 'pickup' || afterDiscount >= SHIPPING_FREE_OVER ? 0 : SHIPPING_FEE
    const deposit = payment === 'transfer' ? Math.round((afterDiscount + shipping) * 0.3) : 0
    return { discount, shipping, total: afterDiscount + shipping, deposit }
  }, [subtotal, promo, delivery, payment])

  if (!ready) return <div className="h-64 animate-pulse rounded-sm bg-paper-dim" aria-hidden />

  if (placed) {
    return (
      <div className="mx-auto max-w-xl rounded-sm border border-ink-900/8 bg-paper-dim/50 px-6 py-14 text-center sm:px-10">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-flame-500 text-white">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 12.5l5 5L20 6.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h2 className="mt-7 font-display text-3xl text-ink-900">Đã nhận đơn của bạn</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-steel-600">
          Mã đơn <strong className="text-ink-900">{placed.code}</strong> · Tổng{' '}
          <strong className="text-ink-900">{formatVnd(placed.total)}</strong>
        </p>
        <p className="mt-4 text-[14px] leading-relaxed text-steel-500">
          Nhân viên tư vấn sẽ gọi xác nhận trong vòng 4 giờ làm việc để chốt kích thước, màu hoàn
          thiện và lịch giao lắp.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/san-pham"
            className="rounded-full bg-flame-500 px-6 py-3 text-[13px] font-medium tracking-wide text-white transition-colors hover:bg-flame-600"
          >
            Tiếp tục mua sắm
          </Link>
          <a
            href={`tel:${showroom.phone.replace(/\s/g, '')}`}
            className="rounded-full border border-ink-900/20 px-6 py-3 text-[13px] font-medium tracking-wide text-ink-900 transition-colors hover:border-flame-500 hover:text-flame-600"
          >
            Gọi {showroom.phone}
          </a>
        </div>
      </div>
    )
  }

  if (items.length === 0) return <EmptyCart />

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase()
    const found = PROMOS[code]
    if (!found) {
      setPromo(null)
      setPromoError('Mã không hợp lệ hoặc đã hết hạn.')
      return
    }
    setPromo({ code, ...found })
    setPromoError('')
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const code = 'MT' + Math.floor(100000 + Math.random() * 900000)
    setPlaced({ code, total: totals.total })
    clear()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-10 lg:grid-cols-12 lg:gap-14">
      <div className="lg:col-span-7 xl:col-span-8">
        {/* --- 1. Contact --- */}
        <Step no="01" title="Thông tin người nhận">
          <div className="grid gap-7 sm:grid-cols-2">
            <label className="block">
              <span className={labelCls}>Họ và tên *</span>
              <input name="name" required placeholder="Nguyễn Văn A" className={field} />
            </label>
            <label className="block">
              <span className={labelCls}>Số điện thoại *</span>
              <input
                name="phone"
                type="tel"
                required
                pattern="[0-9\s+.]{9,15}"
                placeholder="0909 000 000"
                className={field}
              />
            </label>
            <label className="block sm:col-span-2">
              <span className={labelCls}>Email</span>
              <input name="email" type="email" placeholder="ban@email.com" className={field} />
            </label>
          </div>
        </Step>

        {/* --- 2. Delivery --- */}
        <Step no="02" title="Hình thức nhận hàng">
          <div className="grid gap-3">
            {DELIVERY.map((d) => (
              <Choice
                key={d.id}
                name="delivery"
                value={d.id}
                checked={delivery === d.id}
                onChange={setDelivery}
                title={d.label}
                note={d.note}
                meta={d.days}
              />
            ))}
          </div>

          {delivery === 'install' && (
            <div className="mt-7 grid gap-7 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className={labelCls}>Địa chỉ giao hàng *</span>
                <input
                  name="address"
                  required
                  placeholder="Số nhà, tên đường, toà nhà / căn hộ"
                  className={field}
                />
              </label>
              <label className="block">
                <span className={labelCls}>Tỉnh / Thành phố *</span>
                <select name="province" required defaultValue="hcm" className={`${field} appearance-none`}>
                  <option value="hcm">TP. Hồ Chí Minh</option>
                  <option value="hn">Hà Nội</option>
                  <option value="dn">Đà Nẵng</option>
                  <option value="bd">Bình Dương</option>
                  <option value="dnai">Đồng Nai</option>
                  <option value="khac">Tỉnh khác</option>
                </select>
              </label>
              <label className="block">
                <span className={labelCls}>Quận / Huyện *</span>
                <input name="district" required placeholder="Quận 2 / TP. Thủ Đức" className={field} />
              </label>
              <label className="block sm:col-span-2">
                <span className={labelCls}>Ghi chú cho đội giao lắp</span>
                <textarea
                  name="note"
                  className={`${field} min-h-20 resize-y`}
                  placeholder="Thang máy chỉ chở được tối đa 2m2, vui lòng gọi trước 30 phút…"
                />
              </label>
            </div>
          )}
        </Step>

        {/* --- 3. Payment --- */}
        <Step no="03" title="Phương thức thanh toán" last>
          <div className="grid gap-3">
            {PAYMENT.map((p) => (
              <Choice
                key={p.id}
                name="payment"
                value={p.id}
                checked={payment === p.id}
                onChange={setPayment}
                title={p.label}
                note={p.note}
              />
            ))}
          </div>

          {payment === 'transfer' && totals.deposit > 0 && (
            <div className="mt-5 rounded-sm border border-ink-900/10 bg-white p-5 text-[13px] leading-relaxed">
              <p className="font-medium text-ink-900">Thông tin chuyển khoản</p>
              <dl className="mt-3 grid gap-1.5 text-steel-600 sm:grid-cols-[auto_1fr] sm:gap-x-6">
                <dt>Ngân hàng</dt>
                <dd className="text-ink-900">Vietcombank — CN Thảo Điền</dd>
                <dt>Số tài khoản</dt>
                <dd className="text-ink-900">0071 0002 18218</dd>
                <dt>Chủ tài khoản</dt>
                <dd className="text-ink-900">CÔNG TY TNHH NỘI THẤT MT HOUSE</dd>
                <dt>Cần cọc</dt>
                <dd className="font-medium text-flame-600">{formatVnd(totals.deposit)} (30%)</dd>
              </dl>
            </div>
          )}
        </Step>
      </div>

      {/* ---------- Order summary ---------- */}
      <aside className="lg:col-span-5 xl:col-span-4">
        <div className="sticky top-28 rounded-sm border border-ink-900/8 bg-paper-dim/50 p-6 sm:p-7">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-2xl text-ink-900">Đơn hàng</h2>
            <Link href="/gio-hang" className="text-[12px] text-steel-500 underline underline-offset-4 hover:text-flame-600">
              Sửa ({count})
            </Link>
          </div>

          <ul className="mt-5 max-h-72 space-y-4 overflow-y-auto pr-1">
            {items.map(({ item, qty, amount }) => (
              <li key={item.id} className="flex gap-3">
                <div className="relative aspect-square w-14 shrink-0 overflow-hidden rounded-sm bg-paper-dim">
                  <ProductMedia item={item} aspect={1} sizes="56px" />
                  <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-ink-900 px-1 text-[10px] font-medium text-white">
                    {qty}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium text-ink-900">{item.name}</p>
                  <p className="truncate text-[11px] text-steel-500">{item.finish}</p>
                </div>
                <p className="shrink-0 text-[13px] text-ink-900">{formatVnd(amount)}</p>
              </li>
            ))}
          </ul>

          {/* promo */}
          <div className="mt-6 border-t border-ink-900/10 pt-5">
            <div className="flex gap-2">
              <input
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                placeholder="Mã giảm giá"
                aria-label="Mã giảm giá"
                className="min-w-0 flex-1 rounded-full border border-ink-900/15 bg-white px-4 py-2.5 text-[13px] uppercase outline-none focus:border-flame-500"
              />
              <button
                type="button"
                onClick={applyPromo}
                className="shrink-0 rounded-full border border-ink-900/20 px-4 py-2.5 text-[13px] transition-colors hover:border-flame-500 hover:text-flame-600"
              >
                Áp dụng
              </button>
            </div>
            {promoError && <p className="mt-2 text-[12px] text-flame-700">{promoError}</p>}
            {promo && (
              <p className="mt-2 flex items-center justify-between text-[12px] text-flame-600">
                <span>
                  {promo.code} — {promo.label}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setPromo(null)
                    setPromoInput('')
                  }}
                  className="underline underline-offset-4"
                >
                  Bỏ
                </button>
              </p>
            )}
          </div>

          <dl className="mt-5 space-y-3 border-t border-ink-900/10 pt-5 text-[14px]">
            <div className="flex justify-between">
              <dt className="text-steel-600">Tạm tính</dt>
              <dd className="text-ink-900">{formatVnd(subtotal)}</dd>
            </div>
            {totals.discount > 0 && (
              <div className="flex justify-between">
                <dt className="text-steel-600">Giảm giá</dt>
                <dd className="text-flame-600">−{formatVnd(totals.discount)}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-steel-600">Vận chuyển &amp; lắp đặt</dt>
              <dd className={totals.shipping === 0 ? 'text-flame-600' : 'text-ink-900'}>
                {totals.shipping === 0 ? 'Miễn phí' : formatVnd(totals.shipping)}
              </dd>
            </div>
          </dl>

          <div className="mt-5 flex items-baseline justify-between border-t border-ink-900/10 pt-5">
            <span className="text-[13px] tracking-[0.16em] text-steel-500 uppercase">Tổng cộng</span>
            <span className="font-display text-3xl text-ink-900">{formatVnd(totals.total)}</span>
          </div>
          <p className="mt-1 text-right text-[12px] text-steel-500">Đã bao gồm VAT 10%</p>

          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-flame-500 px-6 py-4 text-[13px] font-medium tracking-[0.12em] text-white uppercase transition-colors hover:bg-flame-600"
          >
            Đặt hàng
          </button>
          <p className="mt-3 text-center text-[11px] leading-relaxed text-steel-500">
            Bấm “Đặt hàng” nghĩa là bạn đồng ý với điều khoản bán hàng và chính sách bảo hành của MT
            House.
          </p>
        </div>
      </aside>
    </form>
  )
}

/* ------------------------------------------------------------------ */

function Step({
  no,
  title,
  children,
  last = false,
}: {
  no: string
  title: string
  children: React.ReactNode
  last?: boolean
}) {
  return (
    <section className={last ? 'pt-10' : 'border-b border-ink-900/8 pb-10 first:pt-0'}>
      <h2 className="flex items-baseline gap-4">
        <span className="font-display text-3xl text-ink-900/15">{no}</span>
        <span className="text-lg font-medium text-ink-900">{title}</span>
      </h2>
      <div className="mt-7">{children}</div>
    </section>
  )
}

function Choice({
  name,
  value,
  checked,
  onChange,
  title,
  note,
  meta,
}: {
  name: string
  value: string
  checked: boolean
  onChange: (v: string) => void
  title: string
  note: string
  meta?: string
}) {
  return (
    <label
      className={`flex cursor-pointer gap-4 rounded-sm border p-4 transition-colors ${
        checked ? 'border-flame-500 bg-flame-50/60' : 'border-ink-900/12 hover:border-ink-900/25'
      }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="sr-only"
      />
      <span
        className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-colors ${
          checked ? 'border-flame-500' : 'border-ink-900/25'
        }`}
      >
        <span
          className={`h-2.5 w-2.5 rounded-full transition-transform ${
            checked ? 'scale-100 bg-flame-500' : 'scale-0 bg-transparent'
          }`}
        />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-baseline justify-between gap-2">
          <span className="text-[15px] font-medium text-ink-900">{title}</span>
          {meta && <span className="text-[12px] text-steel-500">{meta}</span>}
        </span>
        <span className="mt-1 block text-[13px] leading-relaxed text-steel-600">{note}</span>
      </span>
    </label>
  )
}
