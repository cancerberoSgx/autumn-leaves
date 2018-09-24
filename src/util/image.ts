import { MagickOutputFile, MagickInputFile, Command } from '../imagemagick'

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
export function commandsToString(commands: Command[]): string {
  return JSON.stringify(commands, null, 2)
}

export async function inputFileToUint8Array(el: HTMLInputElement): Promise<{ file: File, content: Uint8Array }[]> {
  return await inputFileFiles(el).map(file => {
    // debugger
    const reader = new FileReader()
    reader.readAsArrayBuffer(file)
    return { file, content: new Uint8Array(reader.result as any) }
  })
  // return null as any
  // el.files.map(file=>{
  // })
}
// export function fileToUint8Array(file: File) {
//   const fileReader = new FileReader()
// }

export function inputFileFiles(el: HTMLInputElement): File[] {
  const files = []
  for (let i = 0; i < el.files.length; i++) {
    const file = el.files.item(i)
    files.push(file)
    // console.log({file});
  }
  return files
}


// export async function inputFileToUint8Array(el: HTMLInputElement): Promise<Uint8Array> {
//   return new Promise<Uint8Array>(resolve => {
//     // // let arrayBuffer: Uint8Array
//     // const fileReader = new FileReader()
//     // fileReader.onload = function (event) {
//     //   const arrayBuffer = this.result
//     //   const array = new Uint8Array(arrayBuffer as any)
//     //   const binaryString = String.fromCharCode.apply(null, array)
//     //   resolve(binaryString)
//     // }
//     // fileReader.readAsArrayBuffer(this.files[0])
//   })
// }

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
      // alert((this as any).width + 'x' + (this as any).height);
    }
    img.src = url;
  })
}