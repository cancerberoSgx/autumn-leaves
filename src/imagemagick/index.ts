// import * as MagickApi from './magickApi'

export interface OutputFile {
    name: string
    blob: Blob
}
export interface InputFile {
    name: string
    content: Uint8Array
}
export interface IMagick {
    Call(files: InputFile[], command: string[]): Promise<OutputFile[]>
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
        magickApiObj = require('./magickApi')
    }
    return magickApiObj
}
// Fetch the image to rotate, and call image magick
export async function doImageMagick(url: string = 'rotate.png') {
    // let fetchedSourceImage = await fetch("rotate.png")
    // let arrayBuffer = await fetchedSourceImage.arrayBuffer()
    // let sourceBytes = new Uint8Array(arrayBuffer)

    const sourceBytes = await readUrlContent(url)
    const input = document.querySelector('.input') as HTMLInputElement
    const imArguments = JSON.parse(input.value)

    // calling image magick with one source image, and command to rotate & resize image
    const files: InputFile[] = [{ 'name': 'srcFile.png', 'content': sourceBytes }]
    let processedFiles = await getMagickApi().Call(files, imArguments)

    // response can be multiple files (example split) here we know we just have one
    let firstOutputImage = processedFiles[0]
    debugger
    let rotatedImage = document.getElementById('rotatedImage') as HTMLImageElement

    rotatedImage.src = URL.createObjectURL(firstOutputImage['blob'])
    console.log("created image " + firstOutputImage['name'])
}
