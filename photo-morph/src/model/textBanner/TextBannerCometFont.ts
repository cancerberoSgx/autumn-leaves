import { ArgumentType } from "imagemagick-browser";
import { extractInfoOne } from 'src/util/toCommitInWASMIM';
import { buildInputFile, execute } from "wasm-imagemagick";
import { MagickTemplate, MagickTemplateArgument, MagickTemplateTag, MorphConfig } from "../MagickTemplate";
import { textCommonArguments, prepareDefaultFont } from './textBanners';


export class TextBannerCometFont implements MagickTemplate {
  name = "Text Banner Comet Font"
  id = "textBannerBlurCometFont"
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
      id: "shadowLength",
      name: "Shadow Length",
      description: "Shadow Length",
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
    {
      type: ArgumentType.number,
      isInteger: true,
      id: "strokeWidth",
      name: "Stroke Width",
      description: "Stroke width (character borders), use larger numbers than zero to make the font look bolder",
      defaultValue: 1
    },
    {
      type: ArgumentType.color,
      id: "strokeColor",
      name: "Stroke Color",
      description: "Color of the stroke (character borders)",
      defaultValue: "black"
    } as MagickTemplateArgument,

  ])

  async template(config: MorphConfig) {
    const {fontName, inputFiles} = await prepareDefaultFont(config)

    const auxResult = await execute({ inputFiles, commands: `convert -font '${fontName}' -pointsize ${config.arguments.fontSize} 'label:${config.arguments.text}' -gravity center  +repage \`uniqueName\`.miff` })
    const info = await extractInfoOne(auxResult.outputFiles[0])
    const w = info.image.geometry.width + 100
    const h = info.image.geometry.height + 50

    const commands = `
convert -size ${w}x${h} xc:${config.arguments.backgroundColor} -gravity center -font '${fontName}' -pointsize ${config.arguments.fontSize} \\
  -fill ${config.arguments.shadowColor} -annotate 0 '${config.arguments.text}' -motion-blur 0x${config.arguments.shadowLength}+${config.arguments.shadowAngle} \\
  -fill ${config.arguments.textColor} -stroke ${config.arguments.strokeColor} -strokewidth ${config.arguments.strokeWidth} -annotate 0 '${config.arguments.text}' -motion-blur 0x1+${config.arguments.shadowAngle} \\
    +repage \`uniqueName\`.jpg
    `
    const result = await execute({ inputFiles, commands })
    return result
  }
}

