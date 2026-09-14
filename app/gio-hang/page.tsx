import type { Metadata } from 'next'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import PageHeading from '@/components/PageHeading'
import CartView from '@/components/CartView'

export const metadata: Metadata = {
  title: 'Giỏ hàng',
  description: 'Xem lại các món nội thất bạn đã chọn trước khi đặt hàng tại MtT Deco.',
  robots: { index: false, follow: true },
}

export default function CartPage() {
  return (
    <>
      <SiteHeader variant="solid" />
      <main className="mx-auto max-w-[1600px] px-5 pb-24 sm:px-8">
        <PageHeading
          eyebrow="Giỏ hàng"
          title="Món bạn đã chọn"
          lead="Số lượng và cấu hình có thể chỉnh lại ở bước tư vấn — chúng tôi luôn gọi xác nhận trước khi đưa đơn vào sản xuất."
          crumbs={[{ label: 'Giỏ hàng' }]}
        />
        <div className="mt-12">
          <CartView />
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
