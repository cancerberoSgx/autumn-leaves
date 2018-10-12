import * as puppeteer from 'puppeteer'
import * as im from '../'
type IM = typeof im

describe('1', () => {

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
    let result = await page.evaluate(async () => {
      const im = (window as any).imageMagickBrowser as IM;

      const div = document.createElement('div')
      div.innerHTML = `
<p>Source image: <img src="knight.png" id="knightImage2"></p>
<p>Result image: <img src="knightOut.png" id="knightImageOut2"></p>`
      document.body.appendChild(div)

      const inputFiles = await im.buildInputFiles(['knight.png'])
      const result = await im.execute({
        inputFiles,
        commands: [['convert', 'knight.png', '-rotate', '63', 'knightOut.png']]
      })
      im.writeOutputImageToEl(result[0].outputFiles[0], document.getElementById('knightImageOut2') as HTMLImageElement)


      // heads up ! - give some time to browser to load the image in the DOM bfure reading its width
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(document.querySelector<HTMLImageElement>('#knightImageOut2').width + ', ' + document.querySelector<HTMLImageElement>('#knightImage2').width)
        }, 100);
      })
    })
    expect(result).toBe('136, 100')
    done()
  })

})


