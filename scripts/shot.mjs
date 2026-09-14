import puppeteer from 'puppeteer-core'
import { mkdirSync } from 'node:fs'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const URL = process.argv[2] || 'http://localhost:3211/'
const OUT = process.argv[3] || 'shots'
const MODE = process.argv[4] || 'page' // page | hero | mobile
const W = Number(process.argv[5] || 1600)
const H = Number(process.argv[6] || 1000)

mkdirSync(OUT, { recursive: true })

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox', '--hide-scrollbars', '--force-device-scale-factor=1'],
  defaultViewport: { width: W, height: H, isMobile: MODE === 'mobile', hasTouch: MODE === 'mobile' },
})

const page = await browser.newPage()
const errors = []
page.on('console', (m) => {
  if (m.type() === 'error') errors.push(m.text().slice(0, 400))
})
page.on('pageerror', (e) => errors.push('PAGEERROR: ' + String(e).slice(0, 400)))

const wait = (ms) => new Promise((r) => setTimeout(r, ms))

await page.goto(URL, { waitUntil: 'networkidle2', timeout: 120000 })
await wait(3500)

if (MODE === 'hero' || MODE === 'mobile') {
  const suffix = MODE === 'mobile' ? 'm' : 'h'
  // Walk every slide; on each, open the first three hotspots.
  const slideCount = await page.$$eval('[aria-current]', (els) => els.length)
  for (let s = 0; s < slideCount; s++) {
    await page.evaluate((i) => {
      document.querySelectorAll('[aria-current]')[i].click()
    }, s)
    await wait(1800)
    await page.screenshot({ path: `${OUT}/${suffix}-slide${s}.png` })

    const spots = await page.$$eval('button[aria-pressed]', (els) => els.length)
    for (let k = 0; k < Math.min(spots, 3); k++) {
      await page.evaluate((i) => {
        document.querySelectorAll('button[aria-pressed]')[i].click()
      }, k)
      await wait(1700)
      await page.screenshot({ path: `${OUT}/${suffix}-slide${s}-spot${k}.png` })
    }
    // close
    await page.keyboard.press('Escape')
    await wait(900)
  }
} else {
  const total = await page.evaluate(() => document.body.scrollHeight)
  const steps = Math.min(16, Math.ceil(total / H))
  for (let i = 0; i < steps; i++) {
    const y = Math.round((total - H) * (i / Math.max(1, steps - 1)))
    await page.evaluate((yy) => window.scrollTo(0, yy), y)
    await wait(2600)
    await page.screenshot({ path: `${OUT}/s${String(i).padStart(2, '0')}.png` })
  }
  console.log('total height:', total, 'steps:', steps)
}

console.log('errors:', errors.length ? errors.join('\n') : 'none')
await browser.close()
