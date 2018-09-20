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
// export const Magick: IMagick = MagickApi as any

export async function readUrlContent(url: string): Promise<Uint8Array> {
    let fetchedSourceImage = await fetch("rotate.png")
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
export async function doImageMagick(url: string = 'rotate.png') {

    const sourceBytes = await readUrlContent(url)
    const input = document.querySelector('.input') as HTMLInputElement
    const imArguments = JSON.parse(input.value)

    // calling image magick with one source image, and command to rotate & resize image
    const files: MagickInputFile[] = [{ 'name': 'srcFile.png', 'content': sourceBytes }]
    let processedFiles = await getMagickApi().Call(files, imArguments)

    // response can be multiple files (example split) here we know we just have one
    let firstOutputImage = processedFiles[0]
    let rotatedImage = document.getElementById('rotatedImage') as HTMLImageElement

    rotatedImage.src = URL.createObjectURL(firstOutputImage['blob'])
    // console.log("created image " + firstOutputImage['name'])
}
