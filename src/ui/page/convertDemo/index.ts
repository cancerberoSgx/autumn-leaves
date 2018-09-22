import { ConvertDemoImage } from './data'
import { readImageUrlToUintArray } from '../../../util/image'
import { getMagickApi } from '../../../imagemagick'

export async function DoMagickCall(config: any) {
  const content = await readImageUrlToUintArray(config.image.sourceUrl)
  const name = config.image.sourceUrl
  const newFiles = [{ name, content }]
  const files = (config.files || [])
    .filter((f: any) => f.name !== name) // remove file if already there
    .concat(newFiles)
  let processedFiles = await getMagickApi().Call(files, config.imArguments)
  return { processedFiles }
}

export function arrayToIMCommand(command: string[]): string {
  return command
    // if it contain spaces or is parenthesis then quote it
    .map(c => (c.trim().match(/\s/) || (c.trim() === '(' || c.trim() === ')')) ? `'${c}'` : c)
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
