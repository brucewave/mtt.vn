import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import ArticleBody, { tableOfContents } from '@/components/ArticleBody'
import { formatDate, getPost, posts, relatedPosts, sortedPosts } from '@/lib/blog'
import { brand } from '@/lib/brand'

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return { title: 'Không tìm thấy bài viết' }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      url: `${brand.url}/blog/${post.slug}`,
      type: 'article',
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      authors: [post.author.name],
      images: [{ url: post.cover, alt: post.coverAlt }],
    },
  }
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const toc = tableOfContents(post.body)
  const related = relatedPosts(post)
  const index = sortedPosts.findIndex((p) => p.slug === post.slug)
  const prev = sortedPosts[index + 1]
  const next = sortedPosts[index - 1]

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${brand.url}/blog/${post.slug}/#article`,
        headline: post.title,
        description: post.excerpt,
        image: post.cover,
        datePublished: post.date,
        dateModified: post.date,
        articleSection: post.category,
        keywords: post.tags.join(', '),
        author: { '@type': 'Person', name: post.author.name, jobTitle: post.author.role },
        publisher: { '@id': `${brand.url}/#store` },
        mainEntityOfPage: `${brand.url}/blog/${post.slug}`,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: brand.url },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${brand.url}/blog` },
          {
            '@type': 'ListItem',
            position: 3,
            name: post.title,
            item: `${brand.url}/blog/${post.slug}`,
          },
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <SiteHeader variant="solid" />

      <main>
        <article>
          {/* ---------- Header ---------- */}
          <header className="mx-auto max-w-[1600px] px-5 pt-28 sm:px-8 sm:pt-32">
            <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-[12px]">
              <Link href="/" className="text-steel-500 transition-colors hover:text-flame-600">
                Trang chủ
              </Link>
              <span className="text-steel-300">/</span>
              <Link href="/blog" className="text-steel-500 transition-colors hover:text-flame-600">
                Blog
              </Link>
              <span className="text-steel-300">/</span>
              <span className="text-ink-900">{post.category}</span>
            </nav>

            <div className="max-w-4xl">
              <p className="eyebrow flex flex-wrap items-center gap-3 text-flame-600">
                {post.category}
                <span className="h-px w-8 bg-flame-500/50" />
                <span className="text-steel-400">{formatDate(post.date)}</span>
                <span className="text-steel-300">·</span>
                <span className="text-steel-400">{post.minutes} phút đọc</span>
              </p>

              <h1 className="mt-5 font-display text-[clamp(2rem,4.6vw,3.75rem)] leading-[1.05] font-medium tracking-tight text-ink-900">
                {post.title}
              </h1>

              <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-steel-600">
                {post.excerpt}
              </p>

              <div className="mt-8 flex items-center gap-3.5 border-t border-ink-900/8 pt-6">
                <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
                  <Image src={post.author.avatar} alt="" fill sizes="44px" className="object-cover" />
                </span>
                <span>
                  <span className="block text-[14px] font-medium text-ink-900">
                    {post.author.name}
                  </span>
                  <span className="block text-[12px] text-steel-500">{post.author.role}</span>
                </span>
              </div>
            </div>
          </header>

          {/* ---------- Cover ---------- */}
          <div className="mx-auto mt-10 max-w-[1600px] px-5 sm:px-8">
            <div className="relative aspect-16/9 overflow-hidden rounded-sm bg-paper-dim sm:aspect-21/9">
              <Image
                src={post.cover}
                alt={post.coverAlt}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* ---------- Body + TOC ---------- */}
          <div className="mx-auto max-w-[1600px] px-5 pt-14 pb-20 sm:px-8">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              {/* min-w-0: without it the wide article tables force the grid
                  columns past the viewport instead of scrolling internally. */}
              <aside className="min-w-0 lg:col-span-3">
                {toc.length > 0 && (
                  <nav className="lg:sticky lg:top-28" aria-label="Mục lục">
                    <p className="eyebrow text-steel-400">Trong bài</p>
                    <ol className="mt-4 space-y-2.5 border-l border-ink-900/10 pl-4">
                      {toc.map((h) => (
                        <li key={h.id}>
                          <a
                            href={`#${h.id}`}
                            className="text-[13px] leading-snug text-steel-600 transition-colors hover:text-flame-600"
                          >
                            {h.text}
                          </a>
                        </li>
                      ))}
                    </ol>

                    <div className="mt-8 border-t border-ink-900/8 pt-6">
                      <p className="eyebrow text-steel-400">Chủ đề</p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {post.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-ink-900/12 px-2.5 py-1 text-[11px] text-steel-600"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </nav>
                )}
              </aside>

              <div className="min-w-0 lg:col-span-7 xl:col-span-6">
                <ArticleBody blocks={post.body} />

                {/* CTA */}
                <div className="mt-16 rounded-sm border border-ink-900/8 bg-paper-dim/60 p-7 sm:p-9">
                  <p className="eyebrow text-flame-600">Cần tư vấn cụ thể?</p>
                  <p className="mt-3 font-display text-2xl leading-snug text-ink-900">
                    Gửi mặt bằng, nhận 2 phương án phối cảnh 3D sau 5 ngày
                  </p>
                  <p className="mt-3 text-[14px] leading-relaxed text-steel-600">
                    Miễn phí khảo sát và không ràng buộc — nếu không hợp gu, bạn giữ lại bản vẽ.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href="/#lien-he"
                      className="rounded-full bg-flame-500 px-6 py-3 text-[13px] font-medium tracking-wide text-white transition-colors hover:bg-flame-600"
                    >
                      Đặt lịch tư vấn
                    </Link>
                    <Link
                      href="/san-pham"
                      className="rounded-full border border-ink-900/20 px-6 py-3 text-[13px] font-medium tracking-wide text-ink-900 transition-colors hover:border-flame-500 hover:text-flame-600"
                    >
                      Xem sản phẩm
                    </Link>
                  </div>
                </div>

                {/* Prev / next */}
                <nav className="mt-12 grid gap-3 border-t border-ink-900/8 pt-8 sm:grid-cols-2">
                  {prev ? (
                    <Link href={`/blog/${prev.slug}`} className="group">
                      <span className="text-[11px] tracking-[0.16em] text-steel-400 uppercase">
                        ← Bài trước
                      </span>
                      <span className="mt-2 block text-[15px] leading-snug font-medium text-ink-900 transition-colors group-hover:text-flame-600">
                        {prev.title}
                      </span>
                    </Link>
                  ) : (
                    <span />
                  )}
                  {next && (
                    <Link href={`/blog/${next.slug}`} className="group sm:text-right">
                      <span className="text-[11px] tracking-[0.16em] text-steel-400 uppercase">
                        Bài sau →
                      </span>
                      <span className="mt-2 block text-[15px] leading-snug font-medium text-ink-900 transition-colors group-hover:text-flame-600">
                        {next.title}
                      </span>
                    </Link>
                  )}
                </nav>
              </div>
            </div>
          </div>
        </article>

        {/* ---------- Related ---------- */}
        {related.length > 0 && (
          <section className="border-t border-ink-900/8 bg-paper-dim/50 py-20">
            <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
              <div className="flex items-end justify-between gap-6">
                <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-tight font-medium text-ink-900">
                  Bài liên quan
                </h2>
                <Link
                  href="/blog"
                  className="shrink-0 border-b border-ink-900/25 pb-1.5 text-[13px] tracking-[0.14em] text-ink-900 uppercase transition-colors hover:border-flame-500 hover:text-flame-600"
                >
                  Tất cả bài viết
                </Link>
              </div>

              <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => (
                  <Link key={p.slug} href={`/blog/${p.slug}`} className="group flex flex-col">
                    <div className="relative aspect-4/3 overflow-hidden rounded-sm bg-paper-dim">
                      <Image
                        src={p.cover}
                        alt={p.coverAlt}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                      />
                    </div>
                    <p className="eyebrow mt-4 text-flame-600">{p.category}</p>
                    <h3
                      className="mt-2 line-clamp-2 font-display text-xl leading-snug text-ink-900 transition-colors group-hover:text-flame-700"
                      title={p.title}
                    >
                      {p.title}
                    </h3>
                    <p className="mt-auto pt-2 text-[12px] text-steel-400">
                      {formatDate(p.date)} · {p.minutes} phút đọc
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <SiteFooter />
    </>
  )
}
