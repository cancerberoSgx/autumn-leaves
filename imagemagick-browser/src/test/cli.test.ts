import * as puppeteer from 'puppeteer'

describe('1', () => {
  xit('1', async () => {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto('https://google.com');
    const title = await page.title()
    expect(title).toBe('Google')
  })

  const url = `http://127.0.0.1:8080/`
  it('2', async () => {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto(url);
    const title = await page.title()
    expect(title).toBe('test')
  })


})
