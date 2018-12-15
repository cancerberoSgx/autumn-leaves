import { ArgumentType } from "imagemagick-browser";
import { extractInfoOne } from 'src/util/toCommitInWASMIM';
import { buildInputFile, execute } from "wasm-imagemagick";
import { MagickTemplate, MagickTemplateArgument, MagickTemplateTag, MorphConfig } from "../MagickTemplate";
import { textCommonArguments, prepareDefaultFont } from './textBanners';


export class TextBannerGradientArc implements MagickTemplate {
  name = "Text Banner General"
  id = "textBannerGeneral"
  description = `A general tool to create text banners that try to expose several IM tools and configurations. It represents a text that can be vertical, arc, rotated, circular, with all text attributes supported by IM like letter/word spacing, stroke, etc, that can be filled with color, gradient or tile images, shadows and the same for its background.  Also supports configuration to feet a given area or to render with a given font size, alignment, wrap, etc`
  tags = [MagickTemplateTag.textBanner]
  arguments = [].concat(textCommonArguments).concat([

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

