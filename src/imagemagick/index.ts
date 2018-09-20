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

export async function readUrlContent(url: string): Promise<Uint8Array> {
  let fetchedSourceImage = await fetch(url)
  let arrayBuffer = await fetchedSourceImage.arrayBuffer()
  let sourceBytes = new Uint8Array(arrayBuffer)
  return sourceBytes
}

let magickApiObj: IMagick
export function getMagickApi(): IMagick {
  if (!magickApiObj) {
    // HEADS UP we require here and not import it at the top so it starts downloading / running wasm on demand.
    magickApiObj = require('./magickApi')
  }
  return magickApiObj
}
// Fetch the image to rotate, and call image magick
export async function doImageMagick(url: string = 'gnu.jpg') {

  const sourceBytes = await readUrlContent(url)

  // calling image magick with one source image, and command to rotate & resize image
  const files: MagickInputFile[] = [{ 'name': 'gnu.jpg', 'content': sourceBytes }]

  const input = document.querySelector('.input') as HTMLInputElement
  const imArguments = JSON.parse(input.value)

  let processedFiles = await getMagickApi().Call(files, imArguments)

  // response can be multiple files (example split) here we know we just have one
  let firstOutputImage = processedFiles[0]
  let rotatedImage = document.getElementById('rotatedImage') as HTMLImageElement

  rotatedImage.src = URL.createObjectURL(firstOutputImage['blob'])
  // console.log("created image " + firstOutputImage['name'])
}
