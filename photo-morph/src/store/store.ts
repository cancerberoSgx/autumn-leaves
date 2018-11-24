import { CommonArguments, Morph } from "src/model/morphs"
import { ExtractInfoResult, MagickInputFile } from "wasm-imagemagick"

export interface RootState {
  images: ImageState[]
  morphs: MorphState[]
  outputImage: ImageState | false
  status: Status
}

export type Status = "idle" | "loadingInputImages" | "executing"

export interface ImageState {
  file: MagickInputFile
  src: string
  isSelected: boolean
  info: ExtractInfoResult
  href: string
  id: string
}

export interface MorphState {
  isSelected: boolean
  definition: Morph
  value: CommonArguments
}
