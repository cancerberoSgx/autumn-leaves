import { MagickInputFile, getFileName } from "wasm-imagemagick";

export async function readImageUrlToUintArray(url: string): Promise<Uint8Array> {
  let fetchedSourceImage = await fetch(url)
  let arrayBuffer = await fetchedSourceImage.arrayBuffer()
  let sourceBytes = new Uint8Array(arrayBuffer)
  return sourceBytes
}

export async function readInputImageFromUrl(url: string, imageName?: string): Promise<MagickInputFile> {
  const content = await readImageUrlToUintArray(url)
  let name = imageName || getFileName(url)
  return { name, content }
}

export async function inputFileToUint8Array(el: HTMLInputElement): Promise<{ file: File, content: Uint8Array }[]> {
  return Promise.all(inputFileFiles(el).map(async file => {
    const array = await new Promise<Uint8Array>(resolve => {
      const reader = new FileReader()
      reader.addEventListener('loadend', (e) => {
        resolve(new Uint8Array(reader.result as any))
      });
      reader.readAsArrayBuffer(file)
    })
    return { file, content: array }
  }))
}
export function inputFileFiles(el: HTMLInputElement): File[] {
  const files = []
  for (let i = 0; i < el.files.length; i++) {
    const file = el.files.item(i)
    files.push(file)
  }
  return files
}

export function getOutputImageNameFor(inputImageName: string, extension: string = inputImageName.substring(inputImageName.indexOf('.'), inputImageName.length)): string {
  extension = extension === '.tiff' ? '.png' : extension
  return inputImageName.substring(0, inputImageName.indexOf('.')) + 'Output' + extension
}

export interface ImageSize {
  width: number,
  height: number
}