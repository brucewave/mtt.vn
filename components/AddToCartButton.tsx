'use client'

import { useEffect, useRef, useState } from 'react'
import { useCart } from '@/lib/cart'

export default function AddToCartButton({
  id,
  qty = 1,
  className = '',
  label = 'Thêm vào giỏ',
  doneLabel = 'Đã thêm ✓',
}: {
  id: string
  qty?: number
  className?: string
  label?: string
  doneLabel?: string
}) {
  const { add } = useCart()
  const [done, setDone] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        add(id, qty)
        setDone(true)
        window.clearTimeout(timer.current)
        timer.current = window.setTimeout(() => setDone(false), 1600)
      }}
      className={className}
      aria-live="polite"
    >
      {done ? doneLabel : label}
    </button>
  )
}
