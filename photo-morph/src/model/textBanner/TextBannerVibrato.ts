import { Argument, ArgumentType } from "imagemagick-browser"
import { getUniqueId } from "src/util/misc"
import { execute, buildInputFile } from "wasm-imagemagick"
import { MagickTemplate, MagickTemplateTag, MagickTemplateArgument, MorphConfig } from "../MagickTemplate";
import { store } from 'src';
import { textCommonArguments } from './textBanners';


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
    // const firstTTFInputFile = store.getState().images.find(i=>i.info.image.format.toLowerCase()==='ttf')
    const fontName = (config.arguments.font+'')  || 'helvetica.ttf'
    const inputFiles = config.inputFiles.map(f=>f.file).concat(fontName==='helvetica.ttf' ? [await buildInputFile('helvetica.ttf')]: [])

    // convert -background lightblue -font helvetica.ttf -pointsize 72 \
    // -fill navy  'label:Sebastian' \
    // -background lightblue -rotate 85  -wave 2x5   -rotate -85 \
    // -gravity center  +repage `uniqueName`.jpg

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

