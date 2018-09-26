import * as puppeteer from 'puppeteer'

describe('1', () => {
  it('1', async () => {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto('https://google.com');
    const title = await page.title()
    expect(title).toBe('Google')
  })
})
