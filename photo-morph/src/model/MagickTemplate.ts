import { Argument } from "imagemagick-browser";
import { ImageState } from "src/store/store";
import { ExecuteResult } from "wasm-imagemagick";
export interface MagickTemplate<Config extends MorphConfig = MorphConfig> {
  name: string;
  description: string;
  tags: MagickTemplateTag[];
  id: string;
  arguments: MagickTemplateArgument[];
  template(config: Config): Promise<ExecuteResult>;
}
export interface MorphConfig {
  inputFiles: ImageState[];
  arguments: ArgumentValues;
}
export interface MagickTemplateArgument extends Argument {
  description: string;
}
export interface MorphCommonArgumentValues extends ArgumentValues {
  frames: number;
  loop: number;
  imageWidth: number;
  imageHeight: number;
}
export interface ArgumentValues {
  [key: string]: (string | number | boolean);
}
export enum MagickTemplateTag {
  animation,
  info,
  drawing,
  gradient,
  morph,
  color,
  append,
  format,
  distort,
  frame,
  textBanner,
  all
}