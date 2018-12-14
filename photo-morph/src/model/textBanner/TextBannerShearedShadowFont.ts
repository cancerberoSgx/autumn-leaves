import { ArgumentType } from "imagemagick-browser";
import { extractInfoOne } from 'src/util/toCommitInWASMIM';
import { buildInputFile, execute } from "wasm-imagemagick";
import { MagickTemplate, MagickTemplateArgument, MagickTemplateTag, MorphConfig } from "../MagickTemplate";
import { textCommonArguments } from './textBanners';


export class TextBannerShearedShadowFont implements MagickTemplate {
  name = "Text Banner Sheared Shadow Font"
  id = "textBannerBlurShearedShadowFont"
  description = `TODO`
  tags = [MagickTemplateTag.textBanner]
  arguments = [].concat(textCommonArguments).concat([

    {
      type: ArgumentType.color,
      id: "shadowColor",
      name: "Shadow Color",
      description: "Shadow color",
      defaultValue: "#5157c7"
    } as MagickTemplateArgument,

    // {
    //   type: ArgumentType.number,
    //   isInteger: true,
    //   id: "shadowAngle",
    //   name: "Shadow Angle",
    //   description: "Shadow Angle",
    //   defaultValue: 130
    // },
  ])

  async template(config: MorphConfig) {
    const fontName = (config.arguments.font + '') || 'helvetica.ttf'
    const inputFiles = config.inputFiles.map(f => f.file).concat(fontName === 'helvetica.ttf' ? [await buildInputFile('helvetica.ttf')] : [])

    const auxResult = await execute({ inputFiles, commands: `convert -font '${fontName}' -pointsize ${config.arguments.fontSize} 'label:${config.arguments.text}' -gravity center  +repage \`uniqueName\`.miff` })
    const info = await extractInfoOne(auxResult.outputFiles[0])
    const w = info.image.geometry.width + (config.arguments.fontSize as number)
    const h = info.image.geometry.height + (config.arguments.fontSize as number)

  //   Sheared Shadow: As the "-annotate" font drawing operator can rotate the vertical dimension separately to the horizontal dimension, you can specify some odd ball rotation 'slewing' or 'shearing' of the font. This is great for making weird shadows, or making your own italic or slanted font.

  //  convert -size 320x115 xc:lightblue  -font Candice -pointsize 72 \
  //          -fill Navy      -annotate 0x0+12+55   'Anthony' \
  //          -fill RoyalBlue -annotate 0x130+25+80 'Anthony' \
  //          font_slewed.jpg

    const commands = `
convert -size ${w}x${h} xc:${config.arguments.backgroundColor} -gravity center -font '${fontName}' -pointsize ${config.arguments.fontSize} \\
  -fill ${config.arguments.textColor}  -annotate 0x0+0+0 '${config.arguments.text}' \\
  -fill ${config.arguments.shadowColor}  -annotate 0x${130}+${(config.arguments.fontSize as number)/3}+${(config.arguments.fontSize as number)/1.5} '${config.arguments.text}' \\
     \`uniqueName\`.jpg
    `
    const result = await execute({ inputFiles, commands })
    return result
  }
}

