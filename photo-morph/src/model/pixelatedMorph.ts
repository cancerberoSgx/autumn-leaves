import { Argument, ArgumentType, seq } from "imagemagick-browser"
import { getUniqueId } from "src/util/misc"
import { execute } from "wasm-imagemagick"
import { commonArguments, forceSameSize } from "./morphs"
import { Morph, MorphTag } from "./morphTypes"


export class PixelatedMorph implements Morph {
  name = "pixelated"
  id = "pixelated "
  description = `http://www.imagemagick.org/Usage/transform/#pixelate`
  tags = [MorphTag.morph, MorphTag.animation]
  command = ""
  arguments: Argument[] = [
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
    } as Argument,
    {
      type: ArgumentType.number,
      id: "delayShort",
      name: "delayShort",
      description: "how much delay between deformed frames",
      defaultValue: 10
    } as Argument, ,
    {
      type: ArgumentType.number,
      id: "delayLong",
      name: "delayLong",
      description: "how much delay to start and end images",
      defaultValue: 50
    } as Argument,
  ].concat(commonArguments)

  async template(config) {
    const inputFiles = await forceSameSize({ ...config, backgroundColor: config.arguments.backgroundColor })
    const values = seq(1, 1, config.arguments.count).map(n => 60 / (n * 2))

    const newSize = `${config.inputFiles[0].info.image.geometry.width}x${config.inputFiles[0].info.image.geometry.height}`
    const commands = `
    convert ${inputFiles[0].name} f0.miff
    convert ${inputFiles[1].name} f1.miff
    ${values.map((n, i) =>
        `convert f0.miff -${config.arguments.method} ${n}% -scale ${newSize}! f0_${i}.miff
      convert f1.miff -${config.arguments.method} ${n}% -scale ${newSize}! f1_${i}.miff`).join("\n")}
    convert -delay ${config.arguments.delayLong} f0.miff -morph 1 -delay ${config.arguments.delayShort} ${values.map((n, i) => `f0_${i}.miff`).join(" ")} ${values.map((n, i) => `f1_${i}.miff`).reverse().join(" ")} -delay ${config.arguments.delayLong * 2} f1.miff  -loop ${config.arguments.loop} -layers Optimize output${getUniqueId()}.gif
    `
    const result = await execute({ inputFiles, commands })
    return [result.outputFiles[result.outputFiles.length - 1]]
  }

}

