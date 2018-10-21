import { cd, mkdir, rm, cp, exec } from 'shelljs';
import * as puppeteer from 'puppeteer'
import * as im from '../'
import { writeFileSync } from 'fs';
import { arrayToIMCommand } from '../util/cli';
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

/** internal tool to compare image equality by executing a simple command like `[['convert','tmp/knight.png','-rotate','14','tmp/imOut.png']]`. Source images need to exists in test-project1/src/static/ */
export async function executeAndCompare(config: Config): Promise<Result & {identical: number}>{
  const result = await executeInBrowser(config)
  rm('-rf', 'tmp')
  mkdir('-p', 'tmp')
  writeFileSync('tmp/output.png',result.outputImages[0].content, {encoding: 'base64'})
  // cp('test-project1/src/static/knight.png', 'tmp')
  const c = config.commands[0]
  const command = ['convert', `test-project1/src/static/${c[1]}`].concat(c.slice(2, c.length-1).concat(['tmp/imOut.png']))
  // exec('convert tmp/knight.png -rotate 14 tmp/imOut.png')
  exec(arrayToIMCommand(command))
  console.log('arrayToIMCommand(command)', arrayToIMCommand(command));
  
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