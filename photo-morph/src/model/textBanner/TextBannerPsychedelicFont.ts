import { ArgumentType } from "imagemagick-browser";
import { extractInfoOne } from 'src/util/toCommitInWASMIM';
import { buildInputFile, execute } from "wasm-imagemagick";
import { MagickTemplate, MagickTemplateArgument, MagickTemplateTag, MorphConfig } from "../MagickTemplate";
import { textCommonArguments } from './textBanners';


export class TextBannerPsychedelicFont implements MagickTemplate {
  name = "Text Banner Psychedelic Font"
  id = "textBannerBlurPsychedelicFont"
  description = `By slowly reducing the stroke width size while swapping colors, a psychedelic outline effect `
  tags = [MagickTemplateTag.textBanner]
  arguments = [].concat(textCommonArguments).concat([

    {
      type: ArgumentType.color,
      id: "shadowColor",
      name: "Shadow Color",
      description: "Shadow color",
      defaultValue: "#341785"
    } as MagickTemplateArgument,
    {
      type: ArgumentType.number,
      isInteger: true,
      id: "stepDistance",
      name: "Step Distance",
      description: "Distance between Psychedelic borders?",
      defaultValue: 5
    },
    {
      type: ArgumentType.number,
      isInteger: true,
      id: "stepCount",
      name: "Step Count",
      description: "How many Psychedelic borders should be?",
      defaultValue: 5
    },
  ])

  async template(config: MorphConfig) {
    const fontName = (config.arguments.font + '') || 'helvetica.ttf'
    const inputFiles = config.inputFiles.map(f => f.file).concat(fontName === 'helvetica.ttf' ? [await buildInputFile('helvetica.ttf')] : [])


    const strokeStep = config.arguments.stepDistance as number
    const stepCount = config.arguments.stepCount as number
    const steps = new Array(stepCount).fill(0).map((n, i) => stepCount - i)

    const auxResult = await execute({ inputFiles, commands: `convert -font '${fontName}' -strokewidth ${strokeStep * stepCount}  -pointsize ${config.arguments.fontSize} 'label:${config.arguments.text}' -gravity center  +repage \`uniqueName\`.miff` })
    const info = await extractInfoOne(auxResult.outputFiles[0])
    const w = info.image.geometry.width + 100
    const h = info.image.geometry.height + 50

    const commands = `
convert -size ${w}x${h} xc:${config.arguments.backgroundColor} -gravity center -font '${fontName}' -pointsize ${config.arguments.fontSize} \\
  -fill ${config.arguments.textColor} \\
  ${steps.map(i => `-stroke ${i % 2 !== 0 ? config.arguments.shadowColor : config.arguments.backgroundColor} -strokewidth ${strokeStep * i} -annotate 0 '${config.arguments.text}' \\`
      ).join('\n')}
  -stroke none -annotate 0 '${config.arguments.text}' \\
    \`uniqueName\`.jpg
    `
    const result = await execute({ inputFiles, commands })
    return result
  }
}

