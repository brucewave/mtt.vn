import type { Metadata } from 'next'
import { Suspense } from 'react'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import PageHeading from '@/components/PageHeading'
import ProductBrowser from '@/components/ProductBrowser'
import { catalog } from '@/lib/catalog'

export const metadata: Metadata = {
  title: 'Sản phẩm nội thất',
  description:
    'Toàn bộ sofa, ghế, bàn, tủ bếp, giường và đèn của MtT Deco — giá niêm yết đã gồm VAT, vận chuyển và lắp đặt.',
}

export default function ProductsPage() {
  return (
    <>
      <SiteHeader variant="solid" />
      <main className="mx-auto max-w-[1600px] px-5 pb-24 sm:px-8">
        <PageHeading
          eyebrow="Danh sách sản phẩm"
          title="Tất cả sản phẩm"
          accent={`(${catalog.length})`}
          lead="Giá niêm yết đã gồm VAT, vận chuyển và lắp đặt trong bán kính 30km từ showroom Thảo Điền. Mọi món đều nhận đóng lại theo kích thước thật của nhà bạn."
          crumbs={[{ label: 'Sản phẩm' }]}
        />
        <div className="mt-12">
          {/* ProductBrowser reads the filter out of the URL, and a prerendered
              route has no URL until it reaches the browser. */}
          <Suspense fallback={<div className="h-96 animate-pulse rounded-sm bg-paper-dim" aria-hidden />}>
            <ProductBrowser />
          </Suspense>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
