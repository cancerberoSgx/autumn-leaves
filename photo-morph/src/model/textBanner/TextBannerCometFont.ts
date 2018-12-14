import { Argument, ArgumentType } from "imagemagick-browser"
import { getUniqueId } from "src/util/misc"
import { execute, buildInputFile, extractInfo } from "wasm-imagemagick"
import { MagickTemplate, MagickTemplateTag, MagickTemplateArgument, MorphConfig } from "../MagickTemplate";
import { store } from 'src';
import { textCommonArguments } from './textBanners';
import { extractInfoOne } from 'src/util/toCommitInWASMIM';


export class TextBannerBlurShadowFont implements MagickTemplate {
  name = "Text Banner Comet Font"
  id = "textBannerBlurSCometFont"
  description = `TODO`
  tags = [MagickTemplateTag.textBanner]
  arguments = [].concat(textCommonArguments).concat([

    {
      type: ArgumentType.color,
      id: "shadowColor",
      name: "Shadow Color",
      description: "Shadow color",
      defaultValue: "#120044"
    } as MagickTemplateArgument,

    {
      type: ArgumentType.number,
      isInteger: true,
      id: "shadowIntensity",
      name: "Shadow Intensity",
      description: "Shadow intensity",
      defaultValue: 25
    },

    {
      type: ArgumentType.number,
      isInteger: true,
      id: "shadowAngle",
      name: "Shadow Angle",
      description: "Shadow Angle",
      defaultValue: 65
    },
  ])

  async template(config: MorphConfig) {
    const fontName = (config.arguments.font + '') || 'helvetica.ttf'
    const inputFiles = config.inputFiles.map(f => f.file).concat(fontName === 'helvetica.ttf' ? [await buildInputFile('helvetica.ttf')] : [])

    const auxResult = await execute({ inputFiles, commands: `convert -font '${fontName}' -pointsize ${config.arguments.fontSize} 'label:${config.arguments.text}' -gravity center  +repage \`uniqueName\`.miff` })
    const info = await extractInfoOne(auxResult.outputFiles[0])
    const w = info.image.geometry.width + 100
    const h = info.image.geometry.height + 50

    const commands = `
convert -size ${w}x${h} xc:${config.arguments.backgroundColor} -gravity center -font '${fontName}' -pointsize ${config.arguments.fontSize} \\
  -fill ${config.arguments.shadowColor} -annotate 0 '${config.arguments.text}' -motion-blur 0x${config.arguments.shadowIntensity}+${config.arguments.shadowAngle} \\
  -fill ${config.arguments.textColor}  -annotate 0 '${config.arguments.text}' -motion-blur 0x1+${config.arguments.shadowAngle} \\
    +repage \`uniqueName\`.jpg
    `
    const result = await execute({ inputFiles, commands })
    return result
  }
}

