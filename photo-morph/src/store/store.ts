import { ArgumentValues, MagickTemplate, MorphCommonArgumentValues } from "src/model/MagickTemplate";
import { MagickTemplateType } from "src/model/MagickTemplateTypes"
import { ExtractInfoResult, MagickInputFile } from "wasm-imagemagick"

export interface RootState {
  images: ImageState[]
  templates: TemplateState[]
  templateTypes: TemplateTypeState[]
  outputImage: ImageState | false
  status: Status,
  urlState: UrlState,
  uiState: UIState
}
export interface UIState {
  layoutLocked: boolean
  helpModalOpen: boolean
  tooltipModalOpen: boolean
  tooltipText: string
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

export interface TemplateState {
  isSelected: boolean
  definition: MagickTemplate
  value: ArgumentValues
}

export interface TemplateTypeState {
  isSelected: boolean
  definition: MagickTemplateType
}

export interface UrlState {
  selectedMorph?: string
  selectedMorphValue?: ArgumentValues
  selectedTemplateType?: string
  selectedImageUrls: string[]
}