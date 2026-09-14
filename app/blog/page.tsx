import type { Metadata } from 'next'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import PageHeading from '@/components/PageHeading'
import BlogIndex from '@/components/BlogIndex'
import { postSummaries } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog — Kiến thức nội thất',
  description:
    'Kinh nghiệm chọn đồ, so sánh vật liệu, bóc tách chi phí và cách bảo quản nội thất — viết bởi đội kiến trúc sư và thợ mộc của MtT Deco.',
}

export default function BlogPage() {
  return (
    <>
      <SiteHeader variant="solid" />
      <main className="mx-auto max-w-[1600px] px-5 pb-24 sm:px-8">
        <PageHeading
          eyebrow="Blog"
          title="Kiến thức"
          accent="nội thất"
          lead="Những gì chúng tôi học được sau hơn 100 công trình — viết ra để bạn khỏi phải trả học phí cho cùng những sai lầm đó."
          crumbs={[{ label: 'Blog' }]}
        />
        <BlogIndex posts={postSummaries} />
      </main>
      <SiteFooter />
    </>
  )
}
