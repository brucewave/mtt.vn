'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '@/lib/cart'
import { formatVnd } from '@/lib/format'
import type { CatalogItem } from '@/lib/catalog'

/**
 * Quantity and the two buy actions.
 *
 * The stepper sits on its own line above the buttons rather than beside them:
 * squeezed into the same row it reads as part of the button, and on a phone the
 * three controls end up too narrow to hit.
 */
export default function ProductBuyBox({ item }: { item: CatalogItem }) {
  const { add } = useCart()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  const step = (delta: number) => setQty((q) => Math.max(1, Math.min(99, q + delta)))

  return (
    <div className="mt-8">
      <div className="flex items-center gap-4">
        <span className="text-[12px] tracking-[0.16em] text-steel-500 uppercase">Số lượng</span>

        <div className="flex items-center rounded-full border border-ink-900/15">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Giảm số lượng"
            className="grid h-11 w-11 place-items-center rounded-full text-[18px] text-ink-900 transition-colors hover:text-flame-600 disabled:text-steel-300"
            disabled={qty <= 1}
          >
            −
          </button>
          <input
            type="number"
            min={1}
            max={99}
            value={qty}
            onChange={(e) => setQty(Math.max(1, Math.min(99, Number(e.target.value) || 1)))}
            aria-label="Số lượng"
            className="mt-qty-input w-12 border-0 bg-transparent text-center text-[15px] font-medium text-ink-900 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Tăng số lượng"
            className="grid h-11 w-11 place-items-center rounded-full text-[18px] text-ink-900 transition-colors hover:text-flame-600"
          >
            +
          </button>
        </div>

        <span className="text-[13px] text-steel-500">
          Tạm tính <strong className="font-semibold text-ink-900">{formatVnd(item.price * qty)}</strong>
        </span>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => {
            add(item.id, qty)
            setAdded(true)
          }}
          className="flex-1 rounded-full bg-flame-500 px-8 py-4 text-[14px] font-medium tracking-wide text-white transition-colors hover:bg-flame-600"
        >
          {added ? 'Đã thêm vào giỏ ✓' : 'Thêm vào giỏ'}
        </button>

        <Link
          href="/gio-hang"
          onClick={() => add(item.id, qty)}
          className="flex-1 rounded-full border border-ink-900 px-8 py-4 text-center text-[14px] font-medium tracking-wide text-ink-900 transition-colors hover:bg-ink-900 hover:text-white"
        >
          Mua ngay
        </Link>
      </div>

      {added && (
        <p className="mt-3 text-[13px] text-steel-600" role="status">
          <Link href="/gio-hang" className="text-flame-600 underline underline-offset-4">
            Xem giỏ hàng
          </Link>{' '}
          hoặc tiếp tục chọn thêm.
        </p>
      )}
    </div>
  )
}
