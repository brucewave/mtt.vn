import puppeteer from 'puppeteer-core'
import { mkdirSync } from 'node:fs'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
mkdirSync('shots', { recursive: true })

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox', '--hide-scrollbars'],
  defaultViewport: { width: 1200, height: 700 },
})
const page = await browser.newPage()
const wait = (ms) => new Promise((r) => setTimeout(r, ms))

// Dark surface: header over the hero, plus the footer mark.
await page.goto('http://localhost:3211/', { waitUntil: 'networkidle2', timeout: 90000 })
await wait(3000)
await page.evaluate(() => {
  const wrap = document.createElement('div')
  wrap.style.cssText =
    'position:fixed;inset:0;z-index:9999;display:grid;grid-auto-flow:row;place-items:center;gap:0'
  const dark = document.createElement('div')
  dark.style.cssText = 'background:#0b0b0c;width:100%;height:50%;display:grid;place-items:center'
  dark.appendChild(document.querySelector('header a[aria-label]').cloneNode(true))
  const lightBox = document.createElement('div')
  lightBox.style.cssText = 'background:#f7f4f0;width:100%;height:50%;display:grid;place-items:center'
  lightBox.appendChild(document.querySelector('footer a, footer span[role="img"]')?.cloneNode(true) ?? document.createElement('span'))
  wrap.append(dark, lightBox)
  document.body.appendChild(wrap)
  // blow both up
  wrap.querySelectorAll('img, span[role="img"]').forEach((el) => {
    el.style.height = '90px'
    el.style.width = 'auto'
  })
})
await wait(800)
await page.screenshot({ path: 'shots/logo.png' })
await browser.close()
console.log('ok')
