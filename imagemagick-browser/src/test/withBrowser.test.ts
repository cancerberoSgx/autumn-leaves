import * as puppeteer from 'puppeteer'

describe('1', () => {
  let browser: puppeteer.Browser
  let page: puppeteer.Page

  beforeEach(async done => {
    browser = await puppeteer.launch({ args: ['--no-sandbox'] })
    page = await browser.newPage()
    const url = `http://127.0.0.1:8080/`
    await page.goto(url)
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

  it('2', async done => {
    const title = await page.title()
    expect(title).toBe('imagemagick-browser integration tests')

    await page.waitFor(() => { return (window as   any).transformationsFinishedFromTest1 })
    const result = await page.evaluate(()=>{
      return document.querySelector<HTMLImageElement>('#knightImageOut').width+', '+document.querySelector<HTMLImageElement>('#knightImage').width
    })
    expect(result).toBe('140, 100')
    done()
  })


  // it('1', () => {
  //   expect(1).toBe(1)
  // })

  // 'convert', 'People.jpg', '-clone', '0', 'People2.jpg', '-compose', 'difference', '-composite', '-threshold', '5%', '-fill', 'red', '-opaque', 'white', '-transparent', 'black', '-compose', 'over', '-composite', 'people_compare2.png'
  ','//','convert','People.jpg','\
  // \( -clone 0 People2.jpg -compose difference -composite \
  // -threshold 5% -fill red -opaque white -transparent black \) \
  // -compose over -composite people_compare2.png



})
