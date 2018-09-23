import { MagickOutputFile, MagickInputFile } from '../imagemagick';

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
  // const res = await fetch(URL.createObjectURL(blob))
  // return res.arrayBuffer().

  // return new Promise<Uint8Array>(resolve => {
  //   // let arrayBuffer: Uint8Array;
  //   const fileReader = new FileReader();
  //   fileReader.onload = function (event) {
  //     // arrayBuffer = (event.target as any).result;
  //     resolve((event.target as any).result)
  //   };
  //   fileReader.readAsArrayBuffer(blob);
  // })
}

export async function outputFileToInputFile(outputFile: MagickOutputFile): Promise<MagickInputFile> {
  return {
    name: outputFile.name,
    content: await blobToUint8Array(outputFile.blob)
  }
}