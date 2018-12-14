import { ArgumentType, list } from "imagemagick-browser";
import { extractInfoOne } from 'src/util/toCommitInWASMIM';
import { buildInputFile, execute, IMKernel } from "wasm-imagemagick";
import { MagickTemplate, MagickTemplateArgument, MagickTemplateTag, MorphConfig } from "../MagickTemplate";
import { textCommonArguments } from './textBanners';


export class TextBannerConicalFont implements MagickTemplate {
  name = "Text Banner ConicalFont"
  id = "textBannerBlurConicalFont"
  description = `TODO`
  tags = [MagickTemplateTag.textBanner, MagickTemplateTag.distort, MagickTemplateTag['3d']]
  arguments = [].concat(textCommonArguments).concat([

    {
      type: ArgumentType.boolean,
      id: "performInBackground",
      name: "Perform In Background",
      description: "If true the conical effect will be done in the background instead on the text",
      defaultValue: false
    } as MagickTemplateArgument,
    {
      type: ArgumentType.number,
      isInteger: true,
      id: "strokeWidth",
      name: "Stroke Width",
      description: "Stroke width, use larger numbers than zero to make the font look bolder",
      defaultValue: 2
    },
    {
      type: ArgumentType.number,
      isInteger: true,
      id: "shadeAzimuth",
      name: "Shade Azimuth",
      description: "",
      defaultValue: 135
    },
    {
      type: ArgumentType.number,
      isInteger: true,
      id: "shadeElevation",
      name: "Shade Elevation",
      description: "",
      defaultValue: 30
    },
    {
      type: ArgumentType.selectOne,
      id: "kernel",
      name: "Kernel",
      description: "Kernel to use in the morphology distance transformation that simulates the 3D effect",
      defaultValue: IMKernel.Euclidean, 
      list: [IMKernel.Manhattan, IMKernel.Chebyshev, IMKernel.Euclidean, IMKernel.DoG, IMKernel.Octagonal, IMKernel.LineJunctions].map(k=>({id: k, name: k}))//
      // list: list(IMKernel).map(k=>({id: k, name: k}))
    },
  ])

  async template(config: MorphConfig) {
    const fontName = (config.arguments.font + '') || 'helvetica.ttf'
    const inputFiles = config.inputFiles.map(f => f.file).concat(fontName === 'helvetica.ttf' ? [await buildInputFile('helvetica.ttf')] : [])

    const auxResult = await execute({ inputFiles, commands: `convert -font '${fontName}' -pointsize ${config.arguments.fontSize} 'label:${config.arguments.text}' -gravity center  +repage \`uniqueName\`.miff` })
    const info = await extractInfoOne(auxResult.outputFiles[0])
    const w = info.image.geometry.width + 100
    const h = info.image.geometry.height + 50

    // convert -size 320x100 xc:black -font Candice -pointsize 72 \
    // -fill white   -annotate +25+65 'Anthony' \
    // -gamma 2  +level 0,1000 -white-threshold 999 \
    // -morphology Distance Euclidean:4,1000 -auto-level \
    // -shade 135x30 -auto-level +level 10,90% font_conic.jpg
    const backgroundColor = config.arguments.performInBackground ? 'white' : 'black'
    const textColor= config.arguments.performInBackground ? 'black': 'white'
    const commands = `
convert -size ${w}x${h} xc:${backgroundColor} -gravity center -font '${fontName}' -pointsize ${config.arguments.fontSize}  \\
  -stroke ${textColor} -strokewidth ${config.arguments.strokeWidth} -fill ${textColor}  -annotate 0 '${config.arguments.text}' \\
  -gamma 2  +level 0,1000 -white-threshold 999 \\
  -morphology Distance ${config.arguments.kernel}:4,1000 -auto-level \\
  -shade ${config.arguments.shadeAzimuth}x${config.arguments.shadeElevation} -auto-level +level 10,90% \\
  \`uniqueName\`.jpg
    `
    const result = await execute({ inputFiles, commands })
    return result
  }
}

