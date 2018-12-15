import { ArgumentType } from "imagemagick-browser";
import { extractInfoOne } from 'src/util/toCommitInWASMIM';
import { buildInputFile, execute } from "wasm-imagemagick";
import { MagickTemplate, MagickTemplateArgument, MagickTemplateTag, MorphConfig } from "../MagickTemplate";
import { textCommonArguments, prepareDefaultFont } from './textBanners';


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
  ])

  async template(config: MorphConfig) {
    const {fontName, inputFiles} = await prepareDefaultFont(config)
    const auxResult = await execute({ inputFiles, commands: `convert -font '${fontName}' -pointsize ${config.arguments.fontSize} 'label:${config.arguments.text}' -gravity center  +repage \`uniqueName\`.miff` })
    const info = await extractInfoOne(auxResult.outputFiles[0])
    const w = info.image.geometry.width + (config.arguments.fontSize as number)
    const h = info.image.geometry.height + (config.arguments.fontSize as number)
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

