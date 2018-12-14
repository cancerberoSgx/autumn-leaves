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
  ])

  async template(config: MorphConfig) {
    const fontName = (config.arguments.font + '') || 'helvetica.ttf'
    const inputFiles = config.inputFiles.map(f => f.file).concat(fontName === 'helvetica.ttf' ? [await buildInputFile('helvetica.ttf')] : [])

    const auxResult = await execute({ inputFiles, commands: `convert -font '${fontName}' -strokewidth 25  -pointsize ${config.arguments.fontSize} 'label:${config.arguments.text}' -gravity center  +repage \`uniqueName\`.miff` })
    const info = await extractInfoOne(auxResult.outputFiles[0])
    const w = info.image.geometry.width + 100
    const h = info.image.geometry.height + 50


    // # Psychedelic Font: In a similar way by slowly reducing the stroke width size while swapping colors, a psychedelic outline effect can be easily generated.
    // convert -size 320x100 xc:lightblue -font \`buildFile 'helvetica.ttf'\` -pointsize 72 -fill white \\
    // -stroke black -strokewidth 25 -annotate +25+65 'Seba' \\
    // -stroke white -strokewidth 20 -annotate +25+65 'Seba' \\
    // -stroke black -strokewidth 15 -annotate +25+65 'Seba' \\
    // -stroke white -strokewidth 10 -annotate +25+65 'Seba' \\
    // -stroke black -strokewidth  5 -annotate +25+65 'Seba' \\
    // -stroke none                  -annotate +25+65 'Seba' \\
    // \`uniqueName\`.png
    
    const commands = `
convert -size ${w}x${h} xc:${config.arguments.backgroundColor} -gravity center -font '${fontName}' -pointsize ${config.arguments.fontSize} \\
  -fill ${config.arguments.textColor} \\
  -stroke ${config.arguments.shadowColor} -strokewidth 25 -annotate 0 '${config.arguments.text}' \\
  -stroke ${config.arguments.backgroundColor} -strokewidth 20 -annotate 0 '${config.arguments.text}' \\
  -stroke ${config.arguments.shadowColor} -strokewidth 15 -annotate 0 '${config.arguments.text}' \\
  -stroke ${config.arguments.backgroundColor} -strokewidth 10 -annotate 0 '${config.arguments.text}' \\
  -stroke  ${config.arguments.shadowColor} -strokewidth 5 -annotate 0 '${config.arguments.text}' \\
  -stroke none -annotate 0 '${config.arguments.text}' \\
    \`uniqueName\`.jpg
    `

    console.log(commands);
    
    const result = await execute({ inputFiles, commands })
    return result
  }
}

