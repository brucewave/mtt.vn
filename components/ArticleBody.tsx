import Image from 'next/image'
import type { Block } from '@/lib/blog'

/** Renders the structured article body. Styling lives in `.article` in globals.css. */
export default function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="article">
      {blocks.map((b, i) => {
        switch (b.t) {
          case 'h2':
            return (
              <h2 key={i} id={slugifyHeading(b.text)}>
                {b.text}
              </h2>
            )

          case 'p':
            return <p key={i}>{b.text}</p>

          case 'ul':
            return (
              <ul key={i}>
                {b.items.map((it, k) => (
                  <li key={k}>{it}</li>
                ))}
              </ul>
            )

          case 'ol':
            return (
              <ol key={i}>
                {b.items.map((it, k) => (
                  <li key={k}>{it}</li>
                ))}
              </ol>
            )

          case 'quote':
            return (
              <blockquote key={i}>
                <p>{b.text}</p>
                {b.by && <cite>— {b.by}</cite>}
              </blockquote>
            )

          case 'note':
            return (
              <aside key={i} className="article-note">
                <p className="article-note-title">{b.title}</p>
                <p>{b.text}</p>
              </aside>
            )

          case 'img':
            return (
              <figure key={i}>
                <span className="article-img">
                  <Image
                    src={b.src}
                    alt={b.caption}
                    fill
                    sizes="(max-width: 768px) 100vw, 760px"
                    className="object-cover"
                  />
                </span>
                <figcaption>{b.caption}</figcaption>
              </figure>
            )

          case 'table':
            return (
              <div key={i} className="article-table-wrap">
                <table>
                  <thead>
                    <tr>
                      {b.head.map((h) => (
                        <th key={h}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((row, k) => (
                      <tr key={k}>
                        {row.map((cell, c) => (
                          <td key={c}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
        }
      })}
    </div>
  )
}

/** Headings double as the in-page table of contents. */
export function tableOfContents(blocks: Block[]) {
  return blocks
    .filter((b): b is Extract<Block, { t: 'h2' }> => b.t === 'h2')
    .map((b) => ({ text: b.text, id: slugifyHeading(b.text) }))
}

export function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}
