import puppeteer from 'puppeteer-core'
import { mkdirSync } from 'node:fs'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const BASE = process.argv[2] || 'http://localhost:3211'
const OUT = 'shots/pages'
mkdirSync(OUT, { recursive: true })

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox', '--hide-scrollbars', '--force-device-scale-factor=1'],
  defaultViewport: { width: 1600, height: 1000 },
})
const page = await browser.newPage()
const errors = []
page.on('console', (m) => m.type() === 'error' && errors.push(m.text().slice(0, 300)))
page.on('pageerror', (e) => errors.push('PAGEERROR: ' + String(e).slice(0, 300)))
const wait = (ms) => new Promise((r) => setTimeout(r, ms))

// 1. Listing — then fill the cart straight from the grid.
await page.goto(`${BASE}/san-pham`, { waitUntil: 'networkidle2', timeout: 120000 })
await wait(3000)
await page.screenshot({ path: `${OUT}/01-san-pham.png` })
await page.evaluate(() => window.scrollTo(0, 900))
await wait(1800)
await page.screenshot({ path: `${OUT}/02-san-pham-scroll.png` })

// filter + search
await page.evaluate(() => {
  const btn = [...document.querySelectorAll('button[aria-pressed]')].find((b) =>
    b.textContent.includes('Chiếu sáng'),
  )
  btn?.click()
  window.scrollTo(0, 0)
})
await wait(1500)
await page.screenshot({ path: `${OUT}/03-san-pham-loc.png` })

// add three items to the cart
await page.evaluate(() => {
  const btn = [...document.querySelectorAll('button[aria-pressed]')].find(
    (b) => b.textContent.trim().startsWith('Tất cả'),
  )
  btn?.click()
})
await wait(900)
for (const i of [0, 3, 6]) {
  await page.evaluate((k) => {
    const cards = document.querySelectorAll('article.group')
    cards[k]?.querySelector('button')?.click()
  }, i)
  await wait(400)
}
await wait(800)

// 2. Cart
await page.goto(`${BASE}/gio-hang`, { waitUntil: 'networkidle2', timeout: 120000 })
await wait(2500)
await page.screenshot({ path: `${OUT}/04-gio-hang.png` })

// 3. Checkout
await page.goto(`${BASE}/thanh-toan`, { waitUntil: 'networkidle2', timeout: 120000 })
await wait(2500)
await page.screenshot({ path: `${OUT}/05-thanh-toan.png` })
await page.evaluate(() => window.scrollTo(0, 800))
await wait(1500)
await page.screenshot({ path: `${OUT}/06-thanh-toan-scroll.png` })

// 4. Quote tool — fill something in so the sheet isn't blank.
await page.goto(`${BASE}/baogia`, { waitUntil: 'networkidle2', timeout: 120000 })
await wait(2500)
await page.evaluate(() => {
  const setVal = (el, v) => {
    const setter = Object.getOwnPropertyDescriptor(
      el instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype,
      'value',
    ).set
    setter.call(el, v)
    el.dispatchEvent(new Event('input', { bubbles: true }))
  }
  const inputs = [...document.querySelectorAll('input')]
  const byPlaceholder = (p) => inputs.find((i) => i.placeholder === p)
  setVal(byPlaceholder('Trần Minh Khoa'), 'Trần Minh Khoa')
  setVal(byPlaceholder('Anh Nguyễn Văn A'), 'Chị Lê Minh Châu')
  setVal(byPlaceholder('0909 000 000'), '0938 114 220')
  setVal(byPlaceholder('khach@email.com'), 'chau.le@email.com')
  setVal(byPlaceholder('Căn hộ 78m² · Masteri Thảo Điền'), 'Căn hộ 78m² · Masteri Thảo Điền')
  setVal(byPlaceholder('Số nhà, đường, phường, thành phố'), '159 Xa lộ Hà Nội, Thảo Điền, TP. Thủ Đức')

  // add three catalogue lines
  const select = document.querySelector('select[aria-label="Thêm từ danh mục"]')
  const pick = (idx) => {
    const setter = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value').set
    setter.call(select, select.options[idx].value)
    select.dispatchEvent(new Event('change', { bubbles: true }))
  }
  pick(1)
})
await wait(700)
await page.evaluate(() => {
  const select = document.querySelector('select[aria-label="Thêm từ danh mục"]')
  const setter = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value').set
  setter.call(select, select.options[5].value)
  select.dispatchEvent(new Event('change', { bubbles: true }))
})
await wait(700)
await page.evaluate(() => {
  const select = document.querySelector('select[aria-label="Thêm từ danh mục"]')
  const setter = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value').set
  setter.call(select, select.options[12].value)
  select.dispatchEvent(new Event('change', { bubbles: true }))
})
await wait(1200)
await page.screenshot({ path: `${OUT}/07-baogia.png` })

// the printable sheet on its own
const sheet = await page.$('.quote-sheet')
await sheet?.screenshot({ path: `${OUT}/08-baogia-sheet.png` })

// print preview (emulate print media)
await page.emulateMediaType('print')
await wait(600)
await page.screenshot({ path: `${OUT}/09-baogia-print.png`, fullPage: true })
await page.emulateMediaType('screen')

// 5. Home header with a full cart
await page.goto(`${BASE}/`, { waitUntil: 'networkidle2', timeout: 120000 })
await wait(3000)
await page.screenshot({ path: `${OUT}/10-home-hero.png` })

console.log('errors:', errors.length ? errors.join('\n') : 'none')
await browser.close()
