import { ArgumentType } from "imagemagick-browser";
import { extractInfoOne } from 'src/util/toCommitInWASMIM';
import { buildInputFile, execute } from "wasm-imagemagick";
import { MagickTemplate, MagickTemplateArgument, MagickTemplateTag, MorphConfig } from "../MagickTemplate";
import { textCommonArguments } from './textBanners';


export class TextBannerNeonFont implements MagickTemplate {
  name = "Text Banner Neon Font"
  id = "textBannerBlurNeonFont"
  description = `TODO`
  tags = [MagickTemplateTag.textBanner]
  arguments = [].concat(textCommonArguments).concat([

  ])

  async template(config: MorphConfig) {
    const fontName = (config.arguments.font + '') || 'helvetica.ttf'
    const inputFiles = config.inputFiles.map(f => f.file).concat(fontName === 'helvetica.ttf' ? [await buildInputFile('helvetica.ttf')] : [])

    // convert -fill dodgerblue -background black -font Anaconda -pointsize 72 \
    // label:' I M  Examples ' -bordercolor black -border 30x30 \
    // \( +clone -blur 0x25 -level 0%,50% \) \
    // -compose screen -composite    neon_sign.gif

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

