import { CommonArguments, Morph } from "src/model/morphTypes"
import { ExtractInfoResult, MagickInputFile } from "wasm-imagemagick"

export interface RootState {
  images: ImageState[]
  morphs: MorphState[]
  outputImage: ImageState | false
  status: Status,
  urlState: UrlState
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

export interface UrlState {
  selectedMorph?: string
  selectedMorphValue?: CommonArguments
}