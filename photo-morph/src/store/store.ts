import { ExtractInfoResult, MagickInputFile } from "wasm-imagemagick"

export interface RootState {
  images: ImagesState
}

export interface ImagesState {
  images: ImageState[]
  // morphs: MorphState[]
}

export interface ImageState {
  name: string
  // file: MagickInputFile
  // src: string
  // isSelected: boolean
  // info: ExtractInfoResult
}

export  interface MorphState {
  name: string
  isSelected: boolean
}