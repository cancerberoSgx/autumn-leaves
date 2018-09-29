import { MagickOutputFile, MagickInputFile, Command } from '../index'

export async function readImageUrlToUintArray(url: string): Promise<Uint8Array> {
  let fetchedSourceImage = await fetch(url)
  let arrayBuffer = await fetchedSourceImage.arrayBuffer()
  let sourceBytes = new Uint8Array(arrayBuffer)
  return sourceBytes
}

export function loadImg(file: MagickOutputFile, img: HTMLImageElement) {
  img.src = URL.createObjectURL(file.blob)
}

export async function buildInputFiles(urls: string[]): Promise<MagickInputFile[]> {
  // return new Promise(resolve=>)
  const result = await Promise.all(urls.map(async url => {
    const content = await readImageUrlToUintArray(url)
    return {
      content,
      name: url//TODO extract name from url
    }
  }))
  // debugger
  return result
  // const arr = readImageUrlToUintArray()
}

export async function blobToUint8Array(blob: Blob): Promise<Uint8Array> {
  return readImageUrlToUintArray(URL.createObjectURL(blob))
}

export function blobToString(blb: Blob): Promise<string> {

  return new Promise(resolve => {
    const reader = new FileReader();
    reader.addEventListener('loadend', (e) => {
      const text = (e.srcElement as any).result as string;
      resolve(text)
    });
    reader.readAsText(blb);
  })
}

export async function inputFileToUint8Array(el: HTMLInputElement): Promise<{ file: File, content: Uint8Array }[]> {
  return await inputFileFiles(el).map(file => {
    // debugger
    const reader = new FileReader()
    reader.readAsArrayBuffer(file)
    return { file, content: new Uint8Array(reader.result as any) }
  })
}

export function inputFileFiles(el: HTMLInputElement): File[] {
  const files = []
  for (let i = 0; i < el.files.length; i++) {
    const file = el.files.item(i)
    files.push(file)
  }
  return files
}

export async function outputFileToInputFile(outputFile: MagickOutputFile): Promise<MagickInputFile> {
  return {
    name: outputFile.name,
    content: await blobToUint8Array(outputFile.blob)
  }
}

export interface ImageSize {
  width: number,
  height: number
}
export function getImageSize(url: string): Promise<ImageSize> {
  return new Promise(resolve => {

    const img = new Image();
    img.onload = function () {
      resolve({
        width: (this as any).width,
        height: (this as any).height
      })
    }
    img.src = url;
  })
}

export function writeOutputImageToEl(image: MagickOutputFile, el: HTMLImageElement) {
  el.src = URL.createObjectURL(image['blob'])
}