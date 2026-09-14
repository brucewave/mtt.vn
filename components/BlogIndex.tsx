'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { blogCategories } from '@/lib/categories'
import { formatDate } from '@/lib/format'
import type { PostSummary } from '@/lib/blog'

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')

/**
 * The list is handed in rather than imported: this component runs in the
 * browser, and importing `@/lib/blog` would ship every article body with it.
 */
export default function BlogIndex({ posts }: { posts: PostSummary[] }) {
  const [cat, setCat] = useState<string>('all')
  const [q, setQ] = useState('')

  const [featured, ...rest] = posts

  const results = useMemo(() => {
    const needle = norm(q.trim())
    // The featured post drops back into the grid as soon as any filter is on.
    const pool = cat === 'all' && !needle ? rest : posts
    return pool.filter((p) => {
      if (cat !== 'all' && p.category !== cat) return false
      if (!needle) return true
      return norm(`${p.title} ${p.excerpt} ${p.category} ${p.tags.join(' ')}`).includes(needle)
    })
  }, [cat, q, rest, posts])

  const counts = useMemo(() => {
    const m: Record<string, number> = { all: posts.length }
    for (const p of posts) m[p.category] = (m[p.category] ?? 0) + 1
    return m
  }, [posts])

  const showFeatured = cat === 'all' && !q.trim()

  return (
    <>
      {showFeatured && <FeaturedCard post={featured} />}

      {/* ---------- Filters ---------- */}
      <div className="sticky top-[68px] z-30 -mx-5 mt-14 mb-10 border-y border-ink-900/8 bg-paper/90 px-5 py-3 backdrop-blur-xl sm:-mx-8 sm:px-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="hide-scrollbar -mx-1 flex gap-1 overflow-x-auto px-1">
            {blogCategories.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCat(c.id)}
                aria-pressed={cat === c.id}
                className={`shrink-0 rounded-full px-4 py-2 text-[13px] whitespace-nowrap transition-colors ${
                  cat === c.id
                    ? 'bg-ink-900 text-white'
                    : 'text-steel-600 hover:bg-ink-900/6 hover:text-ink-900'
                }`}
              >
                {c.label}
                <span className={cat === c.id ? 'ml-1.5 text-white/50' : 'ml-1.5 text-steel-400'}>
                  {counts[c.id] ?? 0}
                </span>
              </button>
            ))}
          </div>

          <label className="relative shrink-0">
            <span className="sr-only">Tìm bài viết</span>
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-steel-400"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
            </svg>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Tìm bài viết…"
              className="w-full rounded-full border border-ink-900/12 bg-white py-2 pl-9 pr-3 text-[13px] outline-none transition-colors placeholder:text-steel-400 focus:border-flame-500 sm:w-64"
            />
          </label>
        </div>
      </div>

      {results.length === 0 ? (
        <div className="rounded-sm border border-dashed border-ink-900/15 px-6 py-20 text-center">
          <p className="font-display text-2xl text-ink-900">Chưa có bài nào khớp</p>
          <p className="mt-2 text-[14px] text-steel-500">
            Thử từ khoá khác, hoặc bỏ bộ lọc danh mục.
          </p>
        </div>
      ) : (
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      )}
    </>
  )
}

function FeaturedCard({ post }: { post: PostSummary }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group mt-12 block">
      <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="relative aspect-16/10 overflow-hidden rounded-sm bg-paper-dim lg:col-span-7">
          <Image
            src={post.cover}
            alt={post.coverAlt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          />
          <span className="absolute left-4 top-4 rounded-full bg-flame-500 px-3 py-1 text-[10px] font-medium tracking-[0.14em] text-white uppercase">
            Mới nhất
          </span>
        </div>

        <div className="lg:col-span-5">
          <p className="eyebrow flex items-center gap-3 text-flame-600">
            {post.category}
            <span className="h-px w-6 bg-flame-500/50" />
            <span className="text-steel-400">{post.minutes} phút đọc</span>
          </p>
          <h2 className="mt-4 font-display text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.1] font-medium tracking-tight text-ink-900 transition-colors group-hover:text-flame-700">
            {post.title}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-steel-600">{post.excerpt}</p>
          <div className="mt-6 flex items-center gap-3">
            <span className="relative h-9 w-9 overflow-hidden rounded-full">
              <Image src={post.author.avatar} alt="" fill sizes="36px" className="object-cover" />
            </span>
            <span className="text-[13px] text-steel-600">
              {post.author.name} · {formatDate(post.date)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

function PostCard({ post }: { post: PostSummary }) {
  return (
    // Slots stay put across cards: the title always occupies two lines and the
    // byline is pinned to the bottom, so a short headline can't shift the row.
    <article className="group h-full">
      <Link href={`/blog/${post.slug}`} className="flex h-full flex-col">
        <div className="relative aspect-4/3 overflow-hidden rounded-sm bg-paper-dim">
          <Image
            src={post.cover}
            alt={post.coverAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
          />
        </div>

        <p className="eyebrow mt-5 flex items-center gap-2.5 text-flame-600">
          {post.category}
          <span className="h-px w-5 bg-flame-500/40" />
          <span className="text-steel-400">{post.minutes} phút</span>
        </p>

        <h3
          className="mt-3 line-clamp-2 font-display text-[1.375rem] leading-snug font-medium text-ink-900 transition-colors group-hover:text-flame-700"
          title={post.title}
        >
          {post.title}
        </h3>

        <p className="mt-2.5 line-clamp-3 text-[14px] leading-relaxed text-steel-600">
          {post.excerpt}
        </p>

        <p className="mt-auto pt-4 text-[12px] text-steel-400">
          {post.author.name} · {formatDate(post.date)}
        </p>
      </Link>
    </article>
  )
}
