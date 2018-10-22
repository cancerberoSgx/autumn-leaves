import * as puppeteer from 'puppeteer'
import * as im from '../..'
import { writeFileSync } from 'fs';
import { executeInBrowser, Config, executeAndCompare } from '../testUtil';
import { info, InfoResult } from '../../util/info';
type IM = typeof im

describe('info', () => {

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
    const result: InfoResult[] = JSON.parse(await page.evaluate(async ()=>{      
      const im = (window as any).imageMagickBrowser as IM;
      const inputFiles = await im.buildInputFiles(['knight.png'])
      const result = await im.info({inputFiles})
      return JSON.stringify(result[0])
    }))
    expect(result[0].image.geometry.width).toBe(100)
        done()
  })


})

