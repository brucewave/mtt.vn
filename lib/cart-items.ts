'use client'

import { useMemo } from 'react'
import { catalogById, type CatalogItem } from './catalog'
import { useCart } from './cart'

export type ResolvedLine = { item: CatalogItem; qty: number; amount: number }

/**
 * Turns the cart's ids into products and adds up the money.
 *
 * Separate from the provider on purpose: this is what drags the whole catalogue
 * into the browser, and only the cart and the checkout page need it. A line
 * whose product has since been withdrawn simply disappears.
 */
export function useCartItems() {
  const { lines } = useCart()

  return useMemo(() => {
    const items: ResolvedLine[] = lines.flatMap((l) => {
      const item = catalogById.get(l.id)
      return item ? [{ item, qty: l.qty, amount: item.price * l.qty }] : []
    })

    return {
      items,
      subtotal: items.reduce((n, l) => n + l.amount, 0),
      /** What the pieces would cost at list price, for showing the saving. */
      compareTotal: items.reduce((n, l) => n + (l.item.compareAt ?? l.item.price) * l.qty, 0),
    }
  }, [lines])
}
