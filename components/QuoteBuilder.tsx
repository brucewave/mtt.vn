'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { catalog } from '@/lib/catalog'
import { formatVnd } from '@/lib/format'
import { docSoTien } from '@/lib/doc-so'
import { showroom } from '@/lib/site-data'

const STORAGE_KEY = 'mthouse.quote.v1'

type Line = {
  key: string
  name: string
  spec: string
  unit: string
  qty: number
  price: number
  /** Per-line discount, percent. */
  off: number
}

type Quote = {
  no: string
  date: string
  validDays: number
  staff: string
  staffPhone: string
  customer: string
  phone: string
  email: string
  address: string
  project: string
  lines: Line[]
  vat: number
  extraOff: number
  depositPct: number
  notes: string
}

const newKey = () => Math.random().toString(36).slice(2, 9)

const emptyLine = (): Line => ({
  key: newKey(),
  name: '',
  spec: '',
  unit: 'bộ',
  qty: 1,
  price: 0,
  off: 0,
})

function defaultQuote(): Quote {
  const now = new Date()
  const yy = String(now.getFullYear()).slice(2)
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  return {
    no: `BG${yy}${mm}-001`,
    date: now.toISOString().slice(0, 10),
    validDays: 15,
    staff: '',
    staffPhone: showroom.phone,
    customer: '',
    phone: '',
    email: '',
    address: '',
    project: '',
    lines: [emptyLine()],
    vat: 10,
    extraOff: 0,
    depositPct: 50,
    notes:
      'Báo giá đã bao gồm vận chuyển và lắp đặt trong bán kính 30km từ showroom.\nThời gian sản xuất 20–30 ngày kể từ ngày chốt mẫu và nhận cọc.\nBảo hành khung gỗ 5 năm, phụ kiện kim khí 2 năm.',
  }
}

const input =
  'w-full rounded-sm border border-ink-900/15 bg-white px-3 py-2 text-[13px] text-ink-900 outline-none transition-colors placeholder:text-steel-400 focus:border-flame-500'
const lbl = 'block text-[11px] tracking-[0.14em] text-steel-500 uppercase mb-1.5'

export default function QuoteBuilder() {
  const [q, setQ] = useState<Quote>(defaultQuote)
  const [loaded, setLoaded] = useState(false)
  const [picker, setPicker] = useState('')

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setQ({ ...defaultQuote(), ...JSON.parse(raw) })
    } catch {
      /* ignore unreadable drafts */
    }
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(q))
    } catch {
      /* storage full or blocked — draft just isn't kept */
    }
  }, [q, loaded])

  const set = <K extends keyof Quote>(k: K, v: Quote[K]) => setQ((p) => ({ ...p, [k]: v }))

  const setLine = (key: string, patch: Partial<Line>) =>
    setQ((p) => ({ ...p, lines: p.lines.map((l) => (l.key === key ? { ...l, ...patch } : l)) }))

  const addLine = () => setQ((p) => ({ ...p, lines: [...p.lines, emptyLine()] }))

  const removeLine = (key: string) =>
    setQ((p) => ({
      ...p,
      lines: p.lines.length > 1 ? p.lines.filter((l) => l.key !== key) : [emptyLine()],
    }))

  const moveLine = (key: string, dir: -1 | 1) =>
    setQ((p) => {
      const i = p.lines.findIndex((l) => l.key === key)
      const j = i + dir
      if (i < 0 || j < 0 || j >= p.lines.length) return p
      const lines = [...p.lines]
      ;[lines[i], lines[j]] = [lines[j], lines[i]]
      return { ...p, lines }
    })

  const addFromCatalog = (id: string) => {
    const item = catalog.find((c) => c.id === id)
    if (!item) return
    setQ((p) => {
      const filled = p.lines.filter((l) => l.name.trim() || l.price > 0)
      return {
        ...p,
        lines: [
          ...filled,
          {
            key: newKey(),
            name: `${item.name} (${item.sku})`,
            spec: `${item.size} · ${item.material} · ${item.finish}`,
            unit: 'bộ',
            qty: 1,
            price: item.price,
            off: 0,
          },
        ],
      }
    })
    setPicker('')
  }

  const totals = useMemo(() => {
    const rows = q.lines.map((l) => ({
      ...l,
      amount: Math.round(l.qty * l.price * (1 - l.off / 100)),
    }))
    const subtotal = rows.reduce((n, r) => n + r.amount, 0)
    const extra = Math.round((subtotal * q.extraOff) / 100)
    const afterOff = subtotal - extra
    const vatAmount = Math.round((afterOff * q.vat) / 100)
    const grand = afterOff + vatAmount
    return {
      rows,
      subtotal,
      extra,
      afterOff,
      vatAmount,
      grand,
      deposit: Math.round((grand * q.depositPct) / 100),
    }
  }, [q])

  const validUntil = useMemo(() => {
    const d = new Date(q.date)
    if (Number.isNaN(d.getTime())) return ''
    d.setDate(d.getDate() + q.validDays)
    return d.toLocaleDateString('vi-VN')
  }, [q.date, q.validDays])

  const dateVn = useMemo(() => {
    const d = new Date(q.date)
    return Number.isNaN(d.getTime()) ? q.date : d.toLocaleDateString('vi-VN')
  }, [q.date])

  if (!loaded) return <div className="h-96 animate-pulse rounded-sm bg-paper-dim" aria-hidden />

  return (
    <div className="quote-layout grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,780px)]">
      {/* ================= EDITOR ================= */}
      <div className="no-print space-y-8">
        <Panel title="Thông tin báo giá">
          <div className="grid gap-4 sm:grid-cols-2">
            <label>
              <span className={lbl}>Số báo giá</span>
              <input className={input} value={q.no} onChange={(e) => set('no', e.target.value)} />
            </label>
            <label>
              <span className={lbl}>Ngày lập</span>
              <input
                type="date"
                className={input}
                value={q.date}
                onChange={(e) => set('date', e.target.value)}
              />
            </label>
            <label>
              <span className={lbl}>Hiệu lực (ngày)</span>
              <input
                type="number"
                min={1}
                className={input}
                value={q.validDays}
                onChange={(e) => set('validDays', Number(e.target.value) || 0)}
              />
            </label>
            <label>
              <span className={lbl}>Nhân viên phụ trách</span>
              <input
                className={input}
                placeholder="Trần Minh Khoa"
                value={q.staff}
                onChange={(e) => set('staff', e.target.value)}
              />
            </label>
          </div>
        </Panel>

        <Panel title="Khách hàng">
          <div className="grid gap-4 sm:grid-cols-2">
            <label>
              <span className={lbl}>Tên khách hàng</span>
              <input
                className={input}
                placeholder="Anh Nguyễn Văn A"
                value={q.customer}
                onChange={(e) => set('customer', e.target.value)}
              />
            </label>
            <label>
              <span className={lbl}>Điện thoại</span>
              <input
                className={input}
                placeholder="0909 000 000"
                value={q.phone}
                onChange={(e) => set('phone', e.target.value)}
              />
            </label>
            <label>
              <span className={lbl}>Email</span>
              <input
                className={input}
                placeholder="khach@email.com"
                value={q.email}
                onChange={(e) => set('email', e.target.value)}
              />
            </label>
            <label>
              <span className={lbl}>Công trình</span>
              <input
                className={input}
                placeholder="Căn hộ 78m² · Masteri Thảo Điền"
                value={q.project}
                onChange={(e) => set('project', e.target.value)}
              />
            </label>
            <label className="sm:col-span-2">
              <span className={lbl}>Địa chỉ</span>
              <input
                className={input}
                placeholder="Số nhà, đường, phường, thành phố"
                value={q.address}
                onChange={(e) => set('address', e.target.value)}
              />
            </label>
          </div>
        </Panel>

        <Panel
          title="Hạng mục"
          action={
            <div className="flex flex-wrap gap-2">
              <select
                value={picker}
                onChange={(e) => addFromCatalog(e.target.value)}
                className={`${input} w-auto max-w-56`}
                aria-label="Thêm từ danh mục"
              >
                <option value="">+ Thêm từ danh mục…</option>
                {catalog.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} — {formatVnd(c.price)}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={addLine}
                className="rounded-sm border border-ink-900/20 px-3 py-2 text-[13px] transition-colors hover:border-flame-500 hover:text-flame-600"
              >
                + Dòng trống
              </button>
            </div>
          }
        >
          <div className="space-y-3">
            {q.lines.map((l, i) => (
              <div key={l.key} className="rounded-sm border border-ink-900/10 bg-paper-dim/40 p-3">
                <div className="flex items-center justify-between gap-2 pb-2">
                  <span className="text-[11px] tracking-[0.14em] text-steel-500 uppercase">
                    Dòng {i + 1}
                  </span>
                  <div className="flex gap-1">
                    <IconBtn label="Lên" onClick={() => moveLine(l.key, -1)} d="M12 19V5M5 12l7-7 7 7" />
                    <IconBtn label="Xuống" onClick={() => moveLine(l.key, 1)} d="M12 5v14M19 12l-7 7-7-7" />
                    <IconBtn label="Xoá" onClick={() => removeLine(l.key)} d="M6 6l12 12M18 6L6 18" danger />
                  </div>
                </div>

                <div className="grid gap-2 sm:grid-cols-12">
                  <input
                    className={`${input} sm:col-span-12`}
                    placeholder="Tên hạng mục (VD: Tủ bếp dưới, mặt đá thạch anh)"
                    value={l.name}
                    onChange={(e) => setLine(l.key, { name: e.target.value })}
                  />
                  <input
                    className={`${input} sm:col-span-12`}
                    placeholder="Quy cách / vật liệu"
                    value={l.spec}
                    onChange={(e) => setLine(l.key, { spec: e.target.value })}
                  />
                  <input
                    className={`${input} sm:col-span-3`}
                    placeholder="ĐVT"
                    value={l.unit}
                    onChange={(e) => setLine(l.key, { unit: e.target.value })}
                  />
                  <input
                    type="number"
                    min={0}
                    step="0.01"
                    className={`${input} sm:col-span-2`}
                    placeholder="SL"
                    value={l.qty}
                    onChange={(e) => setLine(l.key, { qty: Number(e.target.value) || 0 })}
                  />
                  <input
                    type="number"
                    min={0}
                    step={1000}
                    className={`${input} sm:col-span-4`}
                    placeholder="Đơn giá"
                    value={l.price}
                    onChange={(e) => setLine(l.key, { price: Number(e.target.value) || 0 })}
                  />
                  <input
                    type="number"
                    min={0}
                    max={100}
                    className={`${input} sm:col-span-3`}
                    placeholder="CK %"
                    value={l.off}
                    onChange={(e) => setLine(l.key, { off: Number(e.target.value) || 0 })}
                  />
                </div>

                <p className="pt-2 text-right text-[13px] text-steel-600">
                  Thành tiền:{' '}
                  <span className="font-medium text-ink-900">
                    {formatVnd(Math.round(l.qty * l.price * (1 - l.off / 100)))}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Thuế, chiết khấu &amp; điều khoản">
          <div className="grid gap-4 sm:grid-cols-3">
            <label>
              <span className={lbl}>Chiết khấu tổng (%)</span>
              <input
                type="number"
                min={0}
                max={100}
                className={input}
                value={q.extraOff}
                onChange={(e) => set('extraOff', Number(e.target.value) || 0)}
              />
            </label>
            <label>
              <span className={lbl}>VAT (%)</span>
              <input
                type="number"
                min={0}
                max={20}
                className={input}
                value={q.vat}
                onChange={(e) => set('vat', Number(e.target.value) || 0)}
              />
            </label>
            <label>
              <span className={lbl}>Cọc (%)</span>
              <input
                type="number"
                min={0}
                max={100}
                className={input}
                value={q.depositPct}
                onChange={(e) => set('depositPct', Number(e.target.value) || 0)}
              />
            </label>
            <label className="sm:col-span-3">
              <span className={lbl}>Ghi chú / điều khoản (mỗi dòng một ý)</span>
              <textarea
                className={`${input} min-h-28 resize-y`}
                value={q.notes}
                onChange={(e) => set('notes', e.target.value)}
              />
            </label>
          </div>

          <div className="mt-6 flex flex-wrap gap-2 border-t border-ink-900/10 pt-5">
            <button
              type="button"
              onClick={() => window.print()}
              className="rounded-full bg-flame-500 px-6 py-3 text-[13px] font-medium tracking-wide text-white transition-colors hover:bg-flame-600"
            >
              In / Lưu PDF
            </button>
            <button
              type="button"
              onClick={() => {
                if (confirm('Xoá toàn bộ nội dung báo giá hiện tại?')) setQ(defaultQuote())
              }}
              className="rounded-full border border-ink-900/20 px-6 py-3 text-[13px] transition-colors hover:border-flame-500 hover:text-flame-600"
            >
              Báo giá mới
            </button>
            <p className="w-full pt-2 text-[12px] text-steel-500">
              Bản nháp tự lưu trong trình duyệt này. Muốn gửi khách thì bấm “In / Lưu PDF” rồi chọn
              máy in “Save as PDF”.
            </p>
          </div>
        </Panel>
      </div>

      {/* ================= A4 PREVIEW ================= */}
      <div className="xl:sticky xl:top-6 xl:self-start">
        <p className="no-print mb-3 text-[11px] tracking-[0.16em] text-steel-500 uppercase">
          Xem trước bản in (A4)
        </p>

        <article className="quote-sheet bg-white p-8 text-ink-900 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.35)] sm:p-10">
          <header className="flex flex-wrap items-start justify-between gap-6 border-b-2 border-flame-500 pb-5">
            <div>
              <Image src="/mtt-logo.png" alt="MtT Deco" width={503} height={139} className="h-11 w-auto" />
              <p className="mt-3 text-[11px] leading-relaxed text-steel-600">
                CÔNG TY TNHH NỘI THẤT MT HOUSE
                <br />
                {showroom.address}
                <br />
                {showroom.factory}
                <br />
                {showroom.phone} · {showroom.email}
              </p>
            </div>
            <div className="text-right">
              <h2 className="font-display text-3xl leading-none">BÁO GIÁ</h2>
              <table className="mt-3 ml-auto text-[11px]">
                <tbody>
                  <tr>
                    <td className="pr-3 text-steel-500">Số</td>
                    <td className="font-medium">{q.no || '—'}</td>
                  </tr>
                  <tr>
                    <td className="pr-3 text-steel-500">Ngày</td>
                    <td>{dateVn}</td>
                  </tr>
                  <tr>
                    <td className="pr-3 text-steel-500">Hiệu lực đến</td>
                    <td>{validUntil || '—'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </header>

          <section className="grid gap-6 border-b border-ink-900/12 py-5 text-[12px] sm:grid-cols-2">
            <div>
              <p className="mb-2 text-[10px] tracking-[0.16em] text-steel-500 uppercase">Kính gửi</p>
              <p className="text-[14px] font-medium">{q.customer || '……………………………'}</p>
              {q.phone && <p className="mt-1 text-steel-600">ĐT: {q.phone}</p>}
              {q.email && <p className="text-steel-600">Email: {q.email}</p>}
              {q.address && <p className="text-steel-600">{q.address}</p>}
            </div>
            <div className="sm:text-right">
              <p className="mb-2 text-[10px] tracking-[0.16em] text-steel-500 uppercase">Công trình</p>
              <p className="text-[14px] font-medium">{q.project || '……………………………'}</p>
              {q.staff && <p className="mt-1 text-steel-600">Phụ trách: {q.staff}</p>}
              {q.staffPhone && <p className="text-steel-600">{q.staffPhone}</p>}
            </div>
          </section>

          <table className="mt-5 w-full border-collapse text-[11.5px]">
            <thead>
              <tr className="bg-ink-900 text-white">
                <th className="w-8 px-2 py-2 text-left font-medium">TT</th>
                <th className="px-2 py-2 text-left font-medium">Hạng mục</th>
                <th className="w-14 px-2 py-2 text-center font-medium">ĐVT</th>
                <th className="w-12 px-2 py-2 text-right font-medium">SL</th>
                <th className="w-24 px-2 py-2 text-right font-medium">Đơn giá</th>
                <th className="w-12 px-2 py-2 text-right font-medium">CK</th>
                <th className="w-28 px-2 py-2 text-right font-medium">Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {totals.rows.map((r, i) => (
                <tr key={r.key} className="border-b border-ink-900/10 align-top">
                  <td className="px-2 py-2 text-steel-500">{i + 1}</td>
                  <td className="px-2 py-2">
                    <p className="font-medium">{r.name || '—'}</p>
                    {r.spec && <p className="mt-0.5 text-[10.5px] leading-snug text-steel-500">{r.spec}</p>}
                  </td>
                  <td className="px-2 py-2 text-center text-steel-600">{r.unit}</td>
                  <td className="px-2 py-2 text-right">{r.qty}</td>
                  <td className="px-2 py-2 text-right">{formatVnd(r.price)}</td>
                  <td className="px-2 py-2 text-right text-steel-600">{r.off ? `${r.off}%` : '—'}</td>
                  <td className="px-2 py-2 text-right font-medium">{formatVnd(r.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-5 flex justify-end">
            <table className="w-full max-w-xs text-[12px] sm:w-80">
              <tbody>
                <Row label="Cộng" value={formatVnd(totals.subtotal)} />
                {q.extraOff > 0 && (
                  <Row label={`Chiết khấu ${q.extraOff}%`} value={`−${formatVnd(totals.extra)}`} />
                )}
                <Row label={`VAT ${q.vat}%`} value={formatVnd(totals.vatAmount)} />
                <tr className="border-t-2 border-ink-900">
                  <td className="py-2 text-[13px] font-medium">TỔNG CỘNG</td>
                  <td className="py-2 text-right font-display text-xl">{formatVnd(totals.grand)}</td>
                </tr>
                {q.depositPct > 0 && (
                  <Row label={`Cọc ${q.depositPct}%`} value={formatVnd(totals.deposit)} accent />
                )}
              </tbody>
            </table>
          </div>

          <p className="mt-3 text-right text-[11px] italic text-steel-600">
            Bằng chữ: {docSoTien(totals.grand)}
          </p>

          {q.notes.trim() && (
            <section className="mt-6 border-t border-ink-900/12 pt-4">
              <p className="mb-2 text-[10px] tracking-[0.16em] text-steel-500 uppercase">
                Ghi chú &amp; điều khoản
              </p>
              <ul className="space-y-1 text-[11px] leading-relaxed text-steel-700">
                {q.notes
                  .split('\n')
                  .map((s) => s.trim())
                  .filter(Boolean)
                  .map((s, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-flame-500">•</span>
                      {s}
                    </li>
                  ))}
              </ul>
            </section>
          )}

          <footer className="mt-10 grid grid-cols-2 gap-8 text-center text-[11px]">
            <div>
              <p className="font-medium">KHÁCH HÀNG</p>
              <p className="text-steel-500">(Ký, ghi rõ họ tên)</p>
              <div className="h-16" />
              <p className="text-steel-700">{q.customer}</p>
            </div>
            <div>
              <p className="font-medium">MT HOUSE</p>
              <p className="text-steel-500">(Ký, ghi rõ họ tên)</p>
              <div className="h-16" />
              <p className="text-steel-700">{q.staff}</p>
            </div>
          </footer>
        </article>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <tr className="border-b border-ink-900/10">
      <td className="py-1.5 text-steel-600">{label}</td>
      <td className={`py-1.5 text-right ${accent ? 'font-medium text-flame-600' : ''}`}>{value}</td>
    </tr>
  )
}

function Panel({
  title,
  action,
  children,
}: {
  title: string
  action?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <section className="rounded-sm border border-ink-900/10 bg-paper p-5 sm:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-[15px] font-medium text-ink-900">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  )
}

function IconBtn({
  label,
  onClick,
  d,
  danger,
}: {
  label: string
  onClick: () => void
  d: string
  danger?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`grid h-7 w-7 place-items-center rounded-sm border border-ink-900/12 transition-colors ${
        danger ? 'text-steel-500 hover:border-flame-500 hover:text-flame-600' : 'text-steel-500 hover:border-ink-900/40 hover:text-ink-900'
      }`}
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d={d} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}
