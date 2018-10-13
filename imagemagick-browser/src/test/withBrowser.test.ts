import * as puppeteer from 'puppeteer'
import * as im from '../'
import { writeFileSync } from 'fs';
import { executeInBrowser, Config, executeAndCompare } from './testUtil';
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

  xit('google online test', async done => {
    await page.goto('https://google.com')
    const title = await page.title()
    expect(title).toBe('Google')
    done()
  })

  it('in client test', async done => {
    const title = await page.title()
    expect(title).toBe('imagemagick-browser integration tests')
    const result = await page.evaluate(() => {
      return document.querySelector<HTMLImageElement>('#knightImageOut').width + ', ' + document.querySelector<HTMLImageElement>('#knightImage').width
    })
    expect(result).toBe('140, 100')
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

  it('write generated output in fs, execute the real im, and compare locally', async done => {
    const result = await executeAndCompare({
      src: 'knight.png',
      page,
      commands: [['convert', 'knight.png', '-rotate', '14', 'knightOut.png']]
    })
    expect(result.identical).toBeLessThan(0.001)
    expect(result.outputImages[0].width).toBe(124)
    done()
  })


})


