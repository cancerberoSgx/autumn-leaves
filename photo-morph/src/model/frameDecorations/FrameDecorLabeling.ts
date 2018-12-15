import { ArgumentType } from "imagemagick-browser";
import { buildExecuteResultWithError, execute } from "wasm-imagemagick";
import { MagickTemplate, MagickTemplateArgument, MagickTemplateTag } from "../MagickTemplate";
import { textCommonArguments, prepareDefaultFont, isFont } from '../textBanner/textBanners';


export class FrameDecorLabeling implements MagickTemplate {
  name = "Frame Decoration Labeling"
  id = "FrameDecorLabeling"
  description = `Simulates a Labeling picture - alternatively can be used on many images to create thumbnails`
  tags = [MagickTemplateTag.frame]
  arguments = [

    {
      type: ArgumentType.selectOne,
      id: "position",
      name: "Label position",
      description: "The label could be at top, bottom, left or right, in the later two, the text will be rendered vertical",
      list: ['top', 'bottom', 'left', 'right'].map(i => ({ id: i, name: i })),
      defaultValue: 'bottom'
    } as MagickTemplateArgument,

    {
      type: ArgumentType.boolean,
      id: "labelInTheBorder",
      name: "Label in the frame",
      description: "If true, the label will be part of the frame, if false it will be on top of the image",
      defaultValue: true
    } as MagickTemplateArgument,

    {
      type: ArgumentType.number,
      id: "forceVerticalNewLines",
      name: "Force vertical new lines",
      description: "If true, the label will be part of the frame, if false it will be on top of the image",
      defaultValue: -1
    } as MagickTemplateArgument

,
    {
      type: ArgumentType.number,
      id: "labelSize",
      isInteger: false,
      name: "Label size",
      description: "When vertical the width of the label relative to the image (percent), when horizontal the height ",
      defaultValue: 0.3
    } as MagickTemplateArgument


  ].concat(textCommonArguments.map(a => a.id === 'fontSize' ? { ...a, defaultValue: 25 } : a.id === 'text' ? { ...a, defaultValue: 'My Image %wx%h' } : a)).filter(t=>t.id!=='fontSize')

  async template(config) {
    if (config.inputFiles.length < 1) {
      return buildExecuteResultWithError('Please select 1 or more images in order to decorate them')
    }
    const { fontName, inputFiles } = await prepareDefaultFont(config)
    const imageInputFiles = inputFiles.filter(f => !isFont(f))
    const imageFile = imageInputFiles[imageInputFiles.length - 1].name
    const isVertical = ['left', 'right'].indexOf(config.arguments.position) !== -1
    const isClockWise = ['bottom', 'right'].indexOf(config.arguments.position) !== -1
    let text =  isVertical ? config.arguments.text.split('').map((s, i)=>config.arguments.forceVerticalNewLines>0 && i%config.arguments.forceVerticalNewLines===0 && !s.includes('%') ? s+'\\n' : s).join('') :  config.arguments.text
    const files = [imageFile, `label.png`]
    const appendFragment = `${(isClockWise ? files : files.reverse()).join(' ')} ${isVertical ? '+' : '-'}append`
    const info = config.inputFiles.find(f => f.file.name === imageFile).  info
    const labelSize = isVertical ? `${Math.round(config.arguments.labelSize * info.image.geometry.width)}x${info.image.geometry.height}` : `${info.image.geometry.width}x${Math.round(config.arguments.labelSize * info.image.geometry.height)}`

    const commands = `
convert -gravity Center  -background ${config.arguments.backgroundColor} -fill ${config.arguments.textColor} \\
  -font '${fontName}' -size ${labelSize}  'caption:${text}' label.png
convert -background ${config.arguments.backgroundColor} -gravity Center  -geometry +50%+50% ${appendFragment} \`uniqueName\`.png
      `
    const results = await execute({ inputFiles, commands })
    return { ...results, outputFiles: results.outputFiles.filter(f => f.name != 'label.png') }
  }
}
