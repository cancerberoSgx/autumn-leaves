import * as puppeteer from 'puppeteer'

describe('1', () => {
  // let browser: puppeteer.Browser
  // beforeEach(async done => {
  //   browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  // })
  // afterEach(async done => {
  //   browser.disconnect()
  // })
  it('1', async done => {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto('https://google.com');
    const title = await page.title()
    expect(title).toBe('Google')
    done()
  })

  it('2', async done => {
    const url = `http://127.0.0.1:8080/`
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto(url);
    const title = await page.title()
    // await page.waitFor(() => { return (window as   any).transformationsFinishedFromTest1s })
    // const transformations = await page.evaluate(() => {
    //   return JSON.stringify((window as any).transformationsFromTest1)
    // })
    expect(title).toBe('test')
    // console.log(transformations);
    done()
  })

  // 'convert', 'People.jpg', '-clone', '0', 'People2.jpg', '-compose', 'difference', '-composite', '-threshold', '5%', '-fill', 'red', '-opaque', 'white', '-transparent', 'black', '-compose', 'over', '-composite', 'people_compare2.png'
  ','//','convert','People.jpg','\
  // \( -clone 0 People2.jpg -compose difference -composite \
  // -threshold 5% -fill red -opaque white -transparent black \) \
  // -compose over -composite people_compare2.png



})
