import { CommonArguments, Morph } from "src/model/morphTypes"
import { ExtractInfoResult, MagickInputFile } from "wasm-imagemagick"

export interface RootState {
  images: ImageState[]
  morphs: MorphState[]
  outputImage: ImageState | false
  status: Status,
  urlState: UrlState,
  uiState: UIState
}
export interface UIState {
  layoutLocked: boolean
  helpModalOpen: boolean
  layouts: any
}

export type Status = "idle" | "loadingInputImages" | "executing"

export interface ImageState {
  file: MagickInputFile
  src: string
  isSelected: boolean
  info: ExtractInfoResult
  href: string
  id: string
  fromUrl?: string
}

export interface MorphState {
  isSelected: boolean
  definition: Morph
  value: CommonArguments
}

export interface UrlState {
  selectedMorph?: string
  selectedMorphValue?: CommonArguments
  selectedImageUrls: string[]
}