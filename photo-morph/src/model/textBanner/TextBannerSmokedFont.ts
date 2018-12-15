import { ArgumentType } from "imagemagick-browser";
import { extractInfoOne } from 'src/util/toCommitInWASMIM';
import { buildInputFile, execute } from "wasm-imagemagick";
import { MagickTemplate, MagickTemplateArgument, MagickTemplateTag, MorphConfig } from "../MagickTemplate";
import { textCommonArguments, prepareDefaultFont } from './textBanners';


export class TextBannerSmokedFont implements MagickTemplate {
  name = "Text Banner Smoked Font"
  id = "textBannerBlurSmokedFont"
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
      defaultValue: 44
    },

    {
      type: ArgumentType.number,
      isInteger: true,
      id: "shadowAngle",
      name: "Shadow Angle",
      description: "Shadow Angle",
      defaultValue: 44
    },
  ])

  async template(config: MorphConfig) {
    const {fontName, inputFiles} = await prepareDefaultFont(config)
    const auxResult = await execute({ inputFiles, commands: `convert -font '${fontName}' -pointsize ${config.arguments.fontSize} 'label:${config.arguments.text}' -gravity center  +repage \`uniqueName\`.miff` })
    const info = await extractInfoOne(auxResult.outputFiles[0])
    const w = info.image.geometry.width + 100
    const h = info.image.geometry.height + 50

    const commands = `
convert -size ${w}x${h} xc:${config.arguments.backgroundColor} -gravity center -font '${fontName}' -pointsize ${config.arguments.fontSize} \\
  -fill ${config.arguments.shadowColor} -annotate 0 '${config.arguments.text}' -motion-blur 0x${config.arguments.shadowIntensity}+${config.arguments.shadowAngle} \\
  -background ${config.arguments.backgroundColor} -wave 3x35 \\
  -fill ${config.arguments.textColor}  -annotate 0 '${config.arguments.text}' \\
    \`uniqueName\`.jpg
    `

    console.log(commands);
    
    const result = await execute({ inputFiles, commands })
    return result
  }
}

