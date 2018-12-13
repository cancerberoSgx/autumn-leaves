import { Argument } from "imagemagick-browser"
import { ImageState } from "src/store/store"
import { MagickOutputFile, ExecuteResult } from "wasm-imagemagick"

export interface Morph<Config extends MorphConfig = MorphConfig> {
  name: string
  description: string
  // command: string
  tags?: MorphTag[]
  id: string
  arguments?: Argument[]
  template(config: Config): Promise<ExecuteResult>
}

export interface MorphConfig {
  inputFiles: ImageState[]
  arguments: CommonArguments
}
export interface CommonArguments extends Arguments { frames: number, loop: number, imageWidth: number, imageHeight: number }

export interface Arguments { [key: string]: (string | number | boolean) }

export enum MorphTag {
  animation,
  info,
  drawing,
  gradient,
  morph,
  color,
  append,
  format,
  distort
}