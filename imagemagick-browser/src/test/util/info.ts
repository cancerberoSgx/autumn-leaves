import * as puppeteer from 'puppeteer'
import * as im from '../'
import { writeFileSync } from 'fs';
import { executeInBrowser, Config, executeAndCompare } from '../testUtil';
type IM = typeof im

describe('some test in the browser', () => {

  let browser: puppeteer.Browser
  let page: puppeteer.Page
  beforeEach(async done => {
    browser = await puppeteer.launch({ args: ['--no-sandbox'] })
    page = await browser.newPage()
    await page.goto(`http://127.0.0.1:8080/`)
    await page.waitFor(() => { return (window as any).imageMagickBrowser })
    done()
  })

  afterEach(async done => {
    await browser.disconnect()
    done()
  })

  it('evaluating from here', async done => {

    const title = await page.title()
    expect(title).toBe('imagemagick-browser integration tests')

    const result = await executeInBrowser({
      src: 'knight.png',
      page,
      commands: [['convert', 'knight.png', '-rotate', '63', 'knightOut.png']]
    })

    expect(result.outputImages[0].width).toBe(136)
    done()
  })


})


