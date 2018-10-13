import { cd, mkdir, rm, cp, exec } from 'shelljs';
import * as puppeteer from 'puppeteer'
import * as im from '../'
import { writeFileSync } from 'fs';
type IM = typeof im
export interface Config {
  src: string,
  page: puppeteer.Page,
  commands: im.Command[]
}
export interface OutputImage {
  width: number, height: number, name: string, content: string
}
export interface Result {
  outputImages: OutputImage[]
}
export async function executeInBrowser(config: Config): Promise<Result> {
  let result = await config.page.evaluate(async (config: Config) => {
    const im = (window as any).imageMagickBrowser as IM;
    document.body.innerHTML = `<p>Source image: <img src="${config.src}" id="knightImage3"></p><p>Result image: <img src="knightOut.png" id="knightImageOut3"></p>`
    const inputFiles = await im.buildInputFiles(['knight.png'])
    const execResult = await im.execute({
      inputFiles,
      commands: config.commands
    })
    im.writeOutputImageToEl(execResult[0].outputFiles[0], document.getElementById('knightImageOut3') as HTMLImageElement)

    let content = ''
    try {
      content = btoa(await im.blobToBinaryString(execResult[0].outputFiles[0].blob))
    } catch (error) {
      console.log('content error', error.toString());
    }
    return new Promise((resolve) => {
      // heads up ! - give some time to browser to load the image in the DOM bfure reading its width
      setTimeout(async () => {
        resolve({
          outputImages: [
            {
              width: document.querySelector<HTMLImageElement>('#knightImageOut3').width,
              height: document.querySelector<HTMLImageElement>('#knightImageOut3').height,
              name: 'out.png',
              content
            }
          ]
        })
      }, 0);
    })
  }, { ...config, page: undefined })
  return result
}

export async function executeAndCompare(config: Config){
  const result = await executeInBrowser(config)
  rm('-rf', 'tmp')
  mkdir('-p', 'tmp')
  writeFileSync('tmp/output.png',result.outputImages[0].content, {encoding: 'base64'})
  cp('test-project1/src/static/knight.png', 'tmp')
  exec('convert tmp/knight.png -rotate 14 tmp/imOut.png')

  const p = exec('convert tmp/imOut.png tmp/output.png -trim +repage -resize "256x256^!" -metric RMSE -format %[distortion] -compare info:')
  const identical = parseInt(p.stdout, 10)
  rm('-rf', 'tmp')
  return {...result, identical}
}

export function wait(ms: number){
  return new Promise(resolve=>{
    setTimeout(() => {
      resolve()
    }, ms);
  })
}