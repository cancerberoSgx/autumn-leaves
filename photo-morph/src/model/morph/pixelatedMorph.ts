import { Argument, ArgumentType, seq } from "imagemagick-browser"
import { getUniqueId } from "src/util/misc"
import { execute } from "wasm-imagemagick"
import { morphCommonArguments, forceSameSize, buildExecuteResultWithError } from "./morphs"
import { MagickTemplate, MagickTemplateTag, MagickTemplateArgument } from "../MagickTemplate";


export class PixelatedMorph implements MagickTemplate {
  name = "pixelated"
  id = "pixelated "
  description = `http://www.imagemagick.org/Usage/transform/#pixelate`
  tags = [MagickTemplateTag.morph, MagickTemplateTag.animation]
  arguments = [
    {
      type: ArgumentType.color,
      id: "backgroundColor",
      name: "Background Color",
      description: "background color for the smaller image that is enlarged",
      defaultValue: "#ffffff"
    },
    {
      type: ArgumentType.number,
      id: "count",
      name: "Pixelation amount",
      description: "The larger, the more pixelated the images will be in the animation",
      defaultValue: 10
    },
    {
      type: ArgumentType.selectOne,
      id: "method",
      name: "Method",
      list: [{ id: "sample", name: "sample" }, { id: "scale", name: "scale" }, { id: "resize", name: "resize" }],
      description: "compose method",
      defaultValue: "sample"
    } as MagickTemplateArgument,
    {
      type: ArgumentType.number,
      id: "delayShort",
      name: "delayShort",
      description: "how much delay between deformed frames",
      defaultValue: 10
    } as MagickTemplateArgument,
    {
      type: ArgumentType.number,
      id: "delayLong",
      name: "delayLong",
      description: "how much delay to start and end images",
      defaultValue: 50
    } as MagickTemplateArgument,
  ].concat(morphCommonArguments)

  async template(config) {
    if(config.inputFiles.length<2){
      return buildExecuteResultWithError('Please select 2 or more images in order to create a morph animation')
    }
    const {inputFiles, referenceImage} = await forceSameSize({ ...config, backgroundColor: config.arguments.backgroundColor })
    const values = seq(1, 1, config.arguments.count).map(n => 60 / (n * 2))

    const newSize = `${referenceImage.info.image.geometry.width}x${referenceImage.info.image.geometry.height}`
    const commands = `
    ${values.map((n, i) =>        `
convert ${inputFiles[0].name} -${config.arguments.method} ${n}% -scale ${newSize}! f0_${i}.miff
convert ${inputFiles[1].name} -${config.arguments.method} ${n}% -scale ${newSize}! f1_${i}.miff`)
      .join("\n")}
    convert -delay ${config.arguments.delayLong} ${inputFiles[0].name} -morph 1 -delay ${config.arguments.delayShort} \\
    ${values.map((n, i) => `f0_${i}.miff`).join(" ")} \\
    ${values.map((n, i) => `f1_${i}.miff`).reverse().join(" ")} \\
    -delay ${config.arguments.delayLong * 2} ${inputFiles[1].name} \\
    -loop ${config.arguments.loop} -layers Optimize output${getUniqueId()}.gif
    `
    return await execute({ inputFiles, commands })
  }

}

