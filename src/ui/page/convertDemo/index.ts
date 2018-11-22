import {  Command, readImageUrlToUintArray } from 'imagemagick-browser'
import { ExecuteResult, ExecuteConfig, execute } from 'wasm-imagemagick';

export interface ConvertDemoImage {
  sourceUrl: string
  targetId: string
  outFile: string
}


export interface ConvertDemoMagickCallConfig {
  image: ConvertDemoImage
  imArguments: Command
}
export async function DoMagickCall(config: ConvertDemoMagickCallConfig): Promise<ExecuteResult> {
  const content = await readImageUrlToUintArray(config.image.sourceUrl)
  const name = config.image.sourceUrl
  const newFiles = [{ name, content }]
  const files = []
    .filter((f: any) => f.name !== name) // remove file if already there
    .concat(newFiles)
  const c: ExecuteConfig = {
    inputFiles: files,
    commands: [config.imArguments]
  }
  const results = await execute(c)
  return results[0]
}

export function buildImArguments(s: string, image: ConvertDemoImage): Command {
  try {
    let result = JSON.parse(s.replace(/\s{2}/g, ' ')).map((a: string) => a === '$INPUT' ? image.sourceUrl : a === '$OUTPUT' ? image.outFile : a)
    document.querySelector('.error').innerHTML = ''
    return result
  } catch (error) {
    document.querySelector('.error').innerHTML = error + ''
  }
}
