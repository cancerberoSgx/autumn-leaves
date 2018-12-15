import { ArgumentType } from "imagemagick-browser";
import { buildExecuteResultWithError, execute } from "wasm-imagemagick";
import { MagickTemplate, MagickTemplateArgument, MagickTemplateTag } from "../MagickTemplate";
import { textCommonArguments, prepareDefaultFont, isFont } from '../textBanner/textBanners';


export class FrameDecorPolaroid implements MagickTemplate {
  name = "Frame Decoration Polaroid"
  id = "FrameDecorPolaroid"
  description = `Simulates a Polaroid picture - alternatively can be used on many images to create thumbnails`
  tags = [MagickTemplateTag.frame]
  arguments = [

    {
      type: ArgumentType.number,
      id: "angle",
      name: "Polaroid Angle",
      description: "must be between -15 and 15",
      defaultValue: 10
    },
    {
      type: ArgumentType.color,
      id: "borderColor",
      name: "Border Color",
      description: "The color of the Polaroid border or frame",
      defaultValue: "#e3d3d3"
    } as MagickTemplateArgument,
    {
      type: ArgumentType.number,
      id: "border",
      name: "Border size",
      description: "The horizontal and vertical size of the border (padding)",
      defaultValue: 5
    },

  ].concat(textCommonArguments.map(a=>a.id==='fontSize' ? {...a, defaultValue: 25} : a.id==='backgroundColor' ? {...a, defaultValue: '#000000'} : a.id==='text' ? {...a, defaultValue: 'My picture: %c %f %wx%h'} : a))

  async template(config) {
    if (config.inputFiles.length < 1) {
      return buildExecuteResultWithError('Please select 1 or more images in order to decorate them')
    }
    const {fontName, inputFiles} = await prepareDefaultFont(config)
    const imageInputFiles = inputFiles.filter(f=>!isFont(f))
    const commands = `
convert ${imageInputFiles[imageInputFiles.length-1].name} -font '${fontName}' -pointsize ${config.arguments.fontSize} \\
  -bordercolor '${config.arguments.borderColor}' -border ${config.arguments.border}x${config.arguments.border} \\
  -background '${config.arguments.backgroundColor}' -fill ${config.arguments.textColor}  -stroke ${config.arguments.textColor}  \\
  -gravity center  -set caption '${config.arguments.text}'  -polaroid ${config.arguments.angle} \`uniqueName\`.png
      `
    return await execute({ inputFiles, commands })
  }
}
