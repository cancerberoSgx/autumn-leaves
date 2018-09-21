import { ConvertDemoImage } from './data';

import * as Magick from '../../../imagemagick/magickApi'

export async function DoMagickCall(config: any) {
  let fetchedSourceImage = await fetch(config.image.sourceUrl)
  let arrayBuffer = await fetchedSourceImage.arrayBuffer()
  let content = new Uint8Array(arrayBuffer)

  const name = config.image.sourceUrl
  const newFiles = [{ name, content }]
  const files = (config.files || [])
    .filter((f: any) => f.name !== name) // remove file if already there
    .concat(newFiles)
  let processedFiles = await Magick.Call(files, config.imArguments)
  return Promise.resolve({ processedFiles })
}

export function arrayToIMCommand(command: string[]): string {
  return command
    .map(c => c.match(/\s/) ? `'${c}'` : c)
    .map(c => c.replace(/\(/gm, '\\('))
    .map(c => c.replace(/\)/gm, '\\)'))
    .join(' ')
}

export function buildImArguments(s: string, image: ConvertDemoImage): string[] {
  try {
    let result = JSON.parse(s.replace(/\s{2}/g, ' ')).map((a: string) => a === '$INPUT' ? image.sourceUrl : a === '$OUTPUT' ? image.outFile : a)
    document.querySelector('.error').innerHTML = ''
    return result
  } catch (error) {
    document.querySelector('.error').innerHTML = error + ''
  }
}
export function toCliArg(arg: string): string {
  return arg.match(/[\s()]/) ? `'${arg}'` : arg // quote if includes spaces or parenthesis
}
