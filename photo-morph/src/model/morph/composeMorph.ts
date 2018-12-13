import { Argument, ArgumentType, seq } from "imagemagick-browser"
import { execute } from "wasm-imagemagick"
import { commonArguments, forceSameSize } from "./morphs"
import { MagickTemplate, MagickTemplateTag } from "../magickTemplates"
import { getUniqueId } from 'src/util/misc';

export class ComposeMorph implements MagickTemplate {
  name = "compose"
  id = "composeMorph"
  description = `http://www.imagemagick.org/Usage/compose/#dissolve`
  tags = [MagickTemplateTag.morph, MagickTemplateTag.animation]
  arguments: Argument[] = [
    {
      type: ArgumentType.color,
      id: "backgroundColor",
      name: "Background Color",
      description: "background color for the smaller image that is enlarged",
      defaultValue: "#ffffff"
    },
    {
      type: ArgumentType.selectOne,
      id: "method",
      name: "Method",
      list: [{ id: "dissolve", name: "dissolve" }, { id: "blend", name: "blend" }],
      description: "compose method",
      defaultValue: "dissolve"
    } as Argument,
    {
      type: ArgumentType.number,
      id: "morph",
      name: "morph",
      description: "determine how many many intermediate morph images to interpolate between each deformed frame",
      defaultValue: 4
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
    const {inputFiles} = await forceSameSize({ ...config, backgroundColor: config.arguments.backgroundColor })
    const list = seq(1, 1, 10).map(i => i * 10)
    const commands = `
    ${list.map(i =>
        `
convert ${inputFiles[0].name} ${inputFiles[1].name}-alpha on-compose ${config.arguments.method} -define compose:args=${i} -gravity South -composite compose_output_${i}.miff`).join("\n")}

convert -delay ${config.arguments.delayLong} ${inputFiles[0].name} -morph ${config.arguments.morph} \\
  -delay ${config.arguments.delayShort} ${list.map(i => `compose_output_${i}.miff`).join(" ")} \\
  -delay ${config.arguments.delayLong * 2} ${inputFiles[1].name} \\
  -delay ${config.arguments.delayShort} ${list.map(i => `compose_output_${i}.miff`).reverse().join(" ")} \\
  -loop ${config.arguments.loop} -layers Optimize out${getUniqueId()}.gif
    `
    return  await execute({ inputFiles, commands })
  }

}