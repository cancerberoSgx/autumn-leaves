import { ArgumentType } from "imagemagick-browser";
import { execute } from "wasm-imagemagick";
import { MagickTemplate, MagickTemplateArgument, MagickTemplateTag, MorphConfig } from "../MagickTemplate";
import { prepareDefaultFont, textCommonArguments } from './textBanners';

export class TextBannerVibratoFont implements MagickTemplate {
  name = "Text Banner Vibrato Font"
  id = "textBannerVibratoFont"
  description = `TODO`
  tags = [MagickTemplateTag.textBanner]
  arguments = [].concat(textCommonArguments).concat([
    {
      type: ArgumentType.number,
      isInteger: false,
      id: "intensity",
      name: "Intensity",
      description: "Vibrato effect intensity",
      defaultValue: 1.01
    } as MagickTemplateArgument,
    ])

  async template(config: MorphConfig) {
    const {fontName, inputFiles} = await prepareDefaultFont(config)
    const commands = `
convert -background ${config.arguments.backgroundColor} -font '${fontName}' -pointsize ${config.arguments.fontSize} \\
  -fill ${config.arguments.textColor}  'label:${config.arguments.text}' \\
  -background ${config.arguments.backgroundColor} -rotate 85  -wave ${config.arguments.intensity as number*2}x${config.arguments.intensity as number*5}   -rotate -85 \\
  -gravity center  +repage \`uniqueName\`.jpg
    `
    const result = await execute({ inputFiles, commands })
    return result
  }
}

