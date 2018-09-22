import { readImageUrlToUintArray } from '../util/image';

export interface MagickOutputFile {
  name: string
  blob: Blob
}

export interface MagickInputFile {
  name: string
  content: Uint8Array
}

export interface IMagick {
  Call(files: MagickInputFile[], command: string[]): Promise<MagickOutputFile[]>
}

let magickApiObj: IMagick
export function getMagickApi(): IMagick {
  if (!magickApiObj) {
    // HEADS UP we require here and not import it at the top so it starts downloading / running wasm on demand.
    magickApiObj = require('./magickApi')
  }
  return magickApiObj
}

export async function doImageMagick(command: string[]) {
  const url = command[1] // TODO !
  const sourceBytes = await readImageUrlToUintArray(url)

  const files: MagickInputFile[] = [{
    'name': url, // TODO !
    'content': sourceBytes
  }]

  let processedFiles = await getMagickApi().Call(files, command)

  let firstOutputImage = processedFiles[0]
  let rotatedImage = document.getElementById('rotatedImage') as HTMLImageElement

  rotatedImage.src = URL.createObjectURL(firstOutputImage['blob'])
}
