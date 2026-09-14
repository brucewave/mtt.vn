import puppeteer from 'puppeteer-core'
import { mkdirSync } from 'node:fs'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const BASE = process.argv[2] || 'http://localhost:3211'
const OUT = 'shots/blog'
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

await page.goto(`${BASE}/blog`, { waitUntil: 'networkidle2', timeout: 120000 })
await wait(3000)
await page.screenshot({ path: `${OUT}/01-index.png` })
await page.evaluate(() => window.scrollTo(0, 950))
await wait(1800)
await page.screenshot({ path: `${OUT}/02-index-grid.png` })

// category filter
await page.evaluate(() => {
  const b = [...document.querySelectorAll('button[aria-pressed]')].find((x) =>
    x.textContent.includes('Vật liệu'),
  )
  b?.click()
  window.scrollTo(0, 0)
})
await wait(1500)
await page.screenshot({ path: `${OUT}/03-index-filter.png` })

// article
await page.goto(`${BASE}/blog/go-cong-nghiep-hay-go-tu-nhien`, {
  waitUntil: 'networkidle2',
  timeout: 120000,
})
await wait(3000)
await page.screenshot({ path: `${OUT}/04-post-top.png` })
for (const [i, y] of [1100, 2200, 3400, 4600].entries()) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y)
  await wait(1600)
  await page.screenshot({ path: `${OUT}/05-post-${i}.png` })
}
const h = await page.evaluate(() => document.body.scrollHeight)
await page.evaluate((yy) => window.scrollTo(0, yy), h)
await wait(1800)
await page.screenshot({ path: `${OUT}/06-post-end.png` })

// mobile
await page.setViewport({ width: 430, height: 932, isMobile: true, hasTouch: true })
await page.goto(`${BASE}/blog`, { waitUntil: 'networkidle2', timeout: 120000 })
await wait(2500)
await page.screenshot({ path: `${OUT}/07-mobile-index.png` })
await page.goto(`${BASE}/blog/chon-sofa-can-ho-nho`, { waitUntil: 'networkidle2', timeout: 120000 })
await wait(2500)
await page.evaluate(() => window.scrollTo(0, 1400))
await wait(1500)
await page.screenshot({ path: `${OUT}/08-mobile-post.png` })

console.log('errors:', errors.length ? errors.join('\n') : 'none')
await browser.close()
