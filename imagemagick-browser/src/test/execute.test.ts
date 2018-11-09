import * as puppeteer from 'puppeteer'
import * as im from '../'
import { blobToBase64String } from 'blob-util';
import { writeFileSync } from 'fs';
import { execute } from '../execute';
import { executeInBrowser } from './testUtil';
type IM = typeof im

describe('execute', () => {

  let browser: puppeteer.Browser
  let page: puppeteer.Page

  beforeEach(async done => {
    browser = await puppeteer.launch({ args: ['--no-sandbox'] })
    // browser.on('')
    page = await browser.newPage()
    page.on('console', m => console.log(`${m.type()}: ${m.text()}`))
    await page.goto(`http://127.0.0.1:8080/`)
    await page.waitFor(() => { return (window as any).imageMagickBrowser })
    done()
  })

  afterEach(async done => {
    await browser.disconnect()
    done()
  })

  it('convert json: should return image metadata', async done=>{
    const result = await executeInBrowser({
      src: 'knight.png',
      page,
      commands: [['convert', 'knight.png', 'json:info.json']]
    })

    const json = JSON.parse(new Buffer(result.outputImages[0].content, 'base64').toString())
    expect(json[0].image.geometry.width).toBe(100)
    expect(json[0].image.name).toBe('info.json')
    
    done()
  })








  // fit('should execute 1 command', async done => {
  //   let result = await page.evaluate(async () => {
  //     const im = (window as any).imageMagickBrowser as IM;

  //     const div = document.createElement('div')
  //     div.innerHTML = '<p>Source image: <img src="knight.png" id="knightImage3"></p><p>Result image: <img src="knightOut.png" id="knightImageOut3"></p>'
  //     document.body.appendChild(div)

  //     const inputFiles = await im.buildInputFiles(['knight.png'])
  //     const execResult = await im.execute({
  //       inputFiles,
  //       commands: [['convert', 'knight.png', '-rotate', '14', 'knightOut.png']]
  //     })

  //     // console.log('resultsdsdsd', execResult[0].outputFiles[0].blob);
  //     im.writeOutputImageToEl(execResult[0].outputFiles[0], document.getElementById('knightImageOut3') as HTMLImageElement)

  //     // const content = await blobToBase64String(execResult[0].outputFiles[0].blob)
  //     // console.log(await im.blobToString(execResult[0].outputFiles[0].blob));

  //     // blob
  //     let content = ''
  //     try {
  //       // console.log(await im.blobToBinaryString(execResult[0].outputFiles[0].blob));
        
  //       content = btoa(await im.blobToBinaryString(execResult[0].outputFiles[0].blob))
  //       // content = await im.blobToBinaryString(execResult[0].outputFiles[0].blob)
  //       // console.log(await im.blobToBinaryString(execResult[0].outputFiles[0].blob)
  //     } catch (error) {
  //       console.log('content error', error.toString());

  //     }
      

  //     return new Promise((resolve) => {
  //       // heads up ! - give some time to browser to load the image in the DOM bfure reading its width
  //       setTimeout(async () => {

  //         resolve(
  //           JSON.stringify({
  //             width: document.querySelector<HTMLImageElement>('#knightImageOut3').width,
  //             height: document.querySelector<HTMLImageElement>('#knightImageOut3').height,
  //             outputImage: {
  //               name: 'out.png',
  //                 content
  //             }
  //           })
  //         )
  //         // document.querySelector<HTMLImageElement>('#knightImageOut3').width + ', ' + document.querySelector<HTMLImageElement>('#knightImage3').width)
  //       }, 10);
  //     })
  //   })

  //   result = JSON.parse(result)

  //   writeFileSync('test1.png',result.outputImage.content, {encoding: 'base64'})

  //   console.log('RRR', result);

  //   expect(result.width).toBe(124)
  //   done()
  // })


//   xit('should execute several commands', async done => {
//     let result = await page.evaluate(async () => {
//       const im = (window as any).imageMagickBrowser as IM;

//       // const div = document.createElement('div')
//       document.body.innerHTML = '<p>Source image: <img src="knight.png" id="knightImage4"></p><p>Result image: <img src="knightOut.png" id="knightImageOut4"></p>'
//       // document.body.appendChild(div)

//       const inputFiles = await im.buildInputFiles(['knight.png'])
//       // inputFiles.forEach(f=>f.n)
//       const execResult = await im.execute({
//         inputFiles,
//         commands: [
//           ['convert', 'knight.png', '-rotate', '14', 'knightOut1.png'],
//           ['convert', 'knight.png', '-rotate', '90', 'knightOut2.png']
//         ]
//       })
//       // console.log('resultsdsdsd', execResult);

//       im.writeOutputImageToEl(execResult[0].outputFiles[0], document.getElementById('knightImageOut4') as HTMLImageElement)
//       return new Promise((resolve) => {
//         // heads up ! - give some time to browser to load the image in the DOM bfure reading its width
//         setTimeout(() => {
//           resolve(document.querySelector<HTMLImageElement>('#knightImageOut4').width + ', ' + document.querySelector<HTMLImageElement>('#knightImage4').width)
//         }, 10);
//       })
//     })
//     expect(result).toBe('124, 100')

//     done()
//   })

  xit('should allow several commands to share images', async done => {
    done()
  })
})


