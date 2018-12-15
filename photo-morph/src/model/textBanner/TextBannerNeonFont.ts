import { ArgumentType } from "imagemagick-browser";
import { extractInfoOne } from 'src/util/toCommitInWASMIM';
import { buildInputFile, execute } from "wasm-imagemagick";
import { MagickTemplate, MagickTemplateArgument, MagickTemplateTag, MorphConfig } from "../MagickTemplate";
import { textCommonArguments, prepareDefaultFont } from './textBanners';


export class TextBannerNeonFont implements MagickTemplate {
  name = "Text Banner Neon Font"
  id = "textBannerBlurNeonFont"
  description = `TODO`
  tags = [MagickTemplateTag.textBanner]
  arguments = [].concat(textCommonArguments).concat([

  ])

  async template(config: MorphConfig) {
    const {fontName, inputFiles} = await prepareDefaultFont(config)
    const commands = `
convert -fill ${'dodgerblue' || config.arguments.textColor} -font '${fontName}' -pointsize ${config.arguments.fontSize} \\
  -background ${'black'||config.arguments.backgroundColor} 'label:${config.arguments.text}' \\
  -bordercolor ${'black'||config.arguments.textColor} -border 30x30 \\
  ( +clone -blur 0x25 -level '0%,50%' ) \\
  -compose screen -composite \\
  \`uniqueName\`.jpg
    `
    const result = await execute({ inputFiles, commands })
    return result
  }
}

