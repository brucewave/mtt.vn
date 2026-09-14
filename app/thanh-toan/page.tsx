import type { Metadata } from 'next'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import PageHeading from '@/components/PageHeading'
import CheckoutView from '@/components/CheckoutView'

export const metadata: Metadata = {
  title: 'Thanh toán',
  description: 'Hoàn tất đơn hàng nội thất MtT Deco.',
  robots: { index: false, follow: false },
}

export default function CheckoutPage() {
  return (
    <>
      <SiteHeader variant="solid" />
      <main className="mx-auto max-w-[1600px] px-5 pb-24 sm:px-8">
        <PageHeading
          eyebrow="Thanh toán"
          title="Hoàn tất đơn hàng"
          lead="Chúng tôi gọi xác nhận trước khi đưa đơn vào sản xuất — bạn vẫn có thể đổi màu hoàn thiện hoặc kích thước ở bước đó."
          crumbs={[{ label: 'Giỏ hàng', href: '/gio-hang' }, { label: 'Thanh toán' }]}
        />
        <div className="mt-12">
          <CheckoutView />
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
