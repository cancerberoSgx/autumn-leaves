import { MagickInputFile, getFileName } from "wasm-imagemagick";

import {inputFileFiles, inputFileToUint8Array, readImageUrlToUintArray} from 'misc-utils-of-mine-dom'

export {inputFileFiles, inputFileToUint8Array, readImageUrlToUintArray}

export async function readInputImageFromUrl(url: string, imageName?: string): Promise<MagickInputFile> {
  const content = await readImageUrlToUintArray(url)
  let name = imageName || getFileName(url)
  return { name, content }
}

export function getOutputImageNameFor(inputImageName: string, extension: string = inputImageName.substring(inputImageName.indexOf('.'), inputImageName.length)): string {
  extension = extension === '.tiff' ? '.png' : extension
  return inputImageName.substring(0, inputImageName.indexOf('.')) + 'Output' + extension
}

export interface ImageSize {
  width: number,
  height: number
}