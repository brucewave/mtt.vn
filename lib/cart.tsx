'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

const STORAGE_KEY = 'mthouse.cart.v1'

export type CartLine = { id: string; qty: number }

/**
 * The cart holds ids and quantities, nothing else.
 *
 * It is mounted in the root layout, so anything it imports is downloaded on
 * every page — and the catalogue is the largest data file in the project.
 * Turning a line into a product is `useCartItems`, which only the cart and the
 * checkout pull in.
 */
type CartValue = {
  lines: CartLine[]
  count: number
  ready: boolean
  add: (id: string, qty?: number) => void
  setQty: (id: string, qty: number) => void
  remove: (id: string) => void
  clear: () => void
}

const CartContext = createContext<CartValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([])
  // Hydration guard: the server renders an empty cart, so badges and totals
  // must not paint stored numbers until after mount.
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed: CartLine[] = JSON.parse(raw)
        // Ids are checked when the lines are resolved; here we only need the
        // shape to be sane.
        setLines(parsed.filter((l) => typeof l?.id === 'string' && l.qty > 0))
      }
    } catch {
      /* corrupted or unavailable storage — start empty */
    }
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
    } catch {
      /* private mode / quota — the cart just won't survive a reload */
    }
  }, [lines, ready])

  const add = useCallback((id: string, qty = 1) => {
    setLines((prev) => {
      const found = prev.find((l) => l.id === id)
      if (!found) return [...prev, { id, qty }]
      return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l))
    })
  }, [])

  const setQty = useCallback((id: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.id !== id)
        : prev.map((l) => (l.id === id ? { ...l, qty: Math.min(qty, 99) } : l)),
    )
  }, [])

  const remove = useCallback((id: string) => {
    setLines((prev) => prev.filter((l) => l.id !== id))
  }, [])

  const clear = useCallback(() => setLines([]), [])

  const value = useMemo<CartValue>(
    () => ({
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      ready,
      add,
      setQty,
      remove,
      clear,
    }),
    [lines, ready, add, setQty, remove, clear],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart phải được dùng bên trong <CartProvider>')
  return ctx
}
