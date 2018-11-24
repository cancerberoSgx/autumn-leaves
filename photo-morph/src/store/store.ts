import { ExtractInfoResult, MagickInputFile } from "wasm-imagemagick"

export interface RootState {
  images: ImageState[]
  morphs: MorphState[]
  outputImage: ImageState|false
}

// export interface ImagesState {
//   images: ImageState[]
// }

export interface ImageState {
  name: string
  file: MagickInputFile
  src: string
  isSelected: boolean
  info: ExtractInfoResult
  href: string
}

export  interface MorphState {
  name: string
  isSelected: boolean
  description: string
}

// export interface MorphsState {
//   morphs: MorphState
// }