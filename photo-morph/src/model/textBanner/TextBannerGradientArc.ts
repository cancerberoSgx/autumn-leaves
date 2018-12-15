import { ArgumentType } from "imagemagick-browser";
import { extractInfoOne } from 'src/util/toCommitInWASMIM';
import { buildInputFile, execute } from "wasm-imagemagick";
import { MagickTemplate, MagickTemplateArgument, MagickTemplateTag, MorphConfig } from "../MagickTemplate";
import { textCommonArguments, prepareDefaultFont } from './textBanners';


export class TextBannerGradientArc implements MagickTemplate {
  name = "Text Banner Gradient Arc"
  id = "textBannerBlurGradientArc"
  description = `TODO`
  tags = [MagickTemplateTag.textBanner]
  arguments = [].concat(textCommonArguments).concat([

    {
      type: ArgumentType.color,
      id: "color1",
      name: "Gradient Color 1",
      description: "First color of the text gradient",
      defaultValue: "#0814fa"
    } as MagickTemplateArgument,

    {
      type: ArgumentType.color,
      id: "color2",
      name: "Gradient Color 2",
      description: "Second color of the text gradient",
      defaultValue: "#fa082c"
    } as MagickTemplateArgument,


    {
      type: ArgumentType.number,
      id: "arc",
      name: "Arc degrees",
      description: "Degrees for the text arc",
      defaultValue: "120"
    } as MagickTemplateArgument,

  ]).filter(a=>a.id!=='textColor')

  async template(config: MorphConfig) {
    const {fontName, inputFiles} = await prepareDefaultFont(config)
    const commands = `
convert -font '${fontName}' -pointsize ${config.arguments.fontSize} \\
  -background none 'label:${config.arguments.text}' \\
  ( +clone -sparse-color Barycentric '0,%h ${config.arguments.color1} %w,0 ${config.arguments.color2}' ) \\
  -compose In -composite \\
  -virtual-pixel transparent -distort arc ${config.arguments.arc} \\
  ( +clone -background black -shadow 100x2+4+4 ) \\ 
  +swap -background ${config.arguments.backgroundColor} -compose over -layers merge +repage \\
  \`uniqueName\`.jpg
    `
    const result = await execute({ inputFiles, commands })
    return result
  }
}

