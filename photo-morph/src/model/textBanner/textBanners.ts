import { ArgumentType } from "imagemagick-browser";
import { store } from 'src';
import { MagickTemplateArgument, MorphConfig } from '../MagickTemplate';
import { registerMagickTemplates } from '../magickTemplates';
import { TextBannerCometFont } from './TextBannerCometFont';
import { TextBannerConicalFont } from './TextBannerConicalFont';
import { TextBannerGradientArc } from './TextBannerGradientArc';
import { TextBannerPsychedelicFont } from './TextBannerPsychedelicFont';
import { TextBannerShearedShadowFont } from './TextBannerShearedShadowFont';
import { TextBannerSmokedFont } from './TextBannerSmokedFont';
import { TextBannerVibratoFont } from './TextBannerVibrato';
import { TextBannerNeonFont } from './TextBannerNeonFont';
import { TextBannerAquaFont } from './TextBannerAquaFont';
import { TextBannerBeveledFont } from './TextBannerBeveledFont';
import { MagickInputFile, buildInputFile, MagickFile, isMagickFile, getFileNameExtension } from 'wasm-imagemagick';
import { ImageState } from 'src/store/store';

export function registerAllTextBanners() {
  const all = [
    new TextBannerVibratoFont(),
    new TextBannerCometFont(),
    new TextBannerSmokedFont(),
    new TextBannerPsychedelicFont(),
    new TextBannerShearedShadowFont(),
    new TextBannerConicalFont(),
    new TextBannerGradientArc(),
    new TextBannerNeonFont(),
    new TextBannerAquaFont(),
    new TextBannerBeveledFont()
  ]
  registerMagickTemplates(all)
}

export function isFont(i: ImageState | MagickFile): boolean {
  const exts = ['ttf', 'otf']
  if (isMagickFile(i)) {
    return exts.indexOf(getFileNameExtension(i).toLowerCase()) !== -1
  }
  else {
    return exts.indexOf(i.info.image.format.toLowerCase()) !== -1
  }
}

export async function prepareDefaultFont(config: MorphConfig): Promise<{ inputFiles: MagickInputFile[], fontName: string }> {
  const fontName = (config.arguments.font + '') || defaultFontFile
  const inputFiles = config.inputFiles.map(f => f.file).concat(fontName === defaultFontFile ? [await buildInputFile(defaultFontFile)] : [])
  return { fontName, inputFiles }
}
export const defaultFontFile = 'helvetica.ttf'

export function fontArgument(id:string,name:string=id, description:string=id){
  return {
    type: ArgumentType.selectOne,
    id,
    name,
    description,
    list: () => store.getState().images.filter(isFont).map(i => ({ id: i.file.name, name: i.file.name })).concat([{ id: defaultFontFile, name: defaultFontFile }]),
    defaultValue: defaultFontFile
  }

}
export const textCommonArguments = [
  {
    type: ArgumentType.text,
    id: "text",
    name: "Text",
    description: "Text",
    defaultValue: "Cool Banner"
  },
  fontArgument('font', 'Font', "Font file to use. By default helvetica.ttf will be automatically loaded. To use other fonts, just load .ttf files as if they were images and they will be available for selection in this list. ",),
  {
    type: ArgumentType.color,
    id: "backgroundColor",
    name: "Background Color",
    description: "background color",
    defaultValue: "#ffffff"
  },
  {
    type: ArgumentType.color,
    id: "textColor",
    name: "Text Color",
    description: "Text color",
    defaultValue: "#000000"
  },
  {
    type: ArgumentType.number,
    isInteger: true,
    id: "fontSize",
    name: "Font size ",
    description: "Font size (in points)",
    defaultValue: 72
  },

] as MagickTemplateArgument[]

