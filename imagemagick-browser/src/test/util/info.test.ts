// import * as puppeteer from 'puppeteer'
// import * as im from '../..'
// import { writeFileSync } from 'fs';
// import { executeInBrowser, Config, executeAndCompare } from '../testUtil';
// import { info, InfoResult } from '../../util/info';
// type IM = typeof im

// describe('info', () => {

//   let browser: puppeteer.Browser
//   let page: puppeteer.Page
//   beforeEach(async done => {
//     browser = await puppeteer.launch({ args: ['--no-sandbox'] })
//     page = await browser.newPage()
//     page.on('console', e => console.log(e.type(), e.text()))
//     await page.goto(`http://127.0.0.1:8080/`)
//     await page.waitFor(() => { return (window as any).imageMagickBrowser })
//     done()
//   })

//   afterEach(async done => {
//     await browser.disconnect()
//     done()
//   })

//   fit('evaluating from here', async done => {
//     const result: string  = await page.evaluate(async () => {
//       const im = (window as any).imageMagickBrowser as IM;
//       const inputFiles = await im.buildInputFiles(['knight.png'])
//       return await JSON.stringify(im.info({ inputFiles }))
//     })
//     // const result: InfoResult[] = JSON.parse(output)
//     console.log('RESULT', result);
    
//     expect(JSON.parse(result).image.geometry.width).toBe(100)
//     done()
//   })


// })

