import { Argument, ArgumentType } from "imagemagick-browser"
import { getUniqueId } from "src/util/misc"
import { execute } from "wasm-imagemagick"
import { commonArguments, forceSameSize } from "./morphs"
import { CommonArguments, Morph, MorphConfig, MorphTag } from "../magickTemplateTypes"


export class TileMorph implements Morph {
  name = "tile"
  id = "tileMorph"
  description = `https://www.imagemagick.org/Usage/anim_mods/#morph_color`
  tags = [MorphTag.morph, MorphTag.animation]
  command = ""
  arguments = [
    {
      type: ArgumentType.color,
      id: "backgroundColor",
      name: "Background Color",
      description: "background color for the smaller image that is enlarged",
      defaultValue: "#ffffff"
    } as Argument,
    {
      type: ArgumentType.number,
      id: "cropSpeed",
      name: "Crop Speed",
      description: "Horizontal crop speed",
      defaultValue: 9
    } as Argument,
    {
      type: ArgumentType.selectOne,
      id: "direction",
      name: "Direction",
      list: [{ id: "vertical", name: "vertical" }, { id: "horizontal", name: "horizontal" }, { id: "both", name: "both" }],
      description: "crop direction",
      defaultValue: "horizontal"
    } as Argument,
  ].concat(commonArguments)

  async template(config) {
    const inputFiles = await forceSameSize({ ...config, backgroundColor: config.arguments.backgroundColor + "" })
    const commands = `
    convert  \\
    ${inputFiles[0].name} ${inputFiles[1].name} \\
    \( -clone 0 -crop ${config.arguments.direction !== "vertical" ? config.arguments.cropSpeed : 0}x${config.arguments.direction !== "horizontal" ? config.arguments.cropSpeed : 0} \) \\
    -set delay 10  -loop ${config.arguments.loop} -layers Optimize output${getUniqueId()}.gif`
    return await execute({ inputFiles, commands })
    // return result.outputFiles
  }
}

export class Tile4Morph implements Morph {
  name = "tile 4 directions"
  id = "Tile4Morph"
  description = `https:// www.imagemagick.org/Usage/anim_mods/#morph_color`
  tags = [MorphTag.morph, MorphTag.animation]
  command = ""
  arguments = [
    {
      type: ArgumentType.number,
      id: "speed",
      name: "speed",
      description: "speed",
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
    const inputFiles = await forceSameSize({ inputFiles: config.inputFiles, backgroundColor: config.arguments.backgroundColor || "white" })
    const commands = `
       convert  -delay ${config.arguments.delayLong} ${inputFiles.map(f => f.name).join(" ")} \\
          -write mpr:stack -delete 0--1 \\
          mpr:stack[0] \( mpr:stack[1] -set delay ${config.arguments.delayShort} -crop ${config.arguments.speed}x0 \) \\
          mpr:stack[1] \( mpr:stack[2] -set delay ${config.arguments.delayShort} -crop 0x${config.arguments.speed} \) \\
          mpr:stack[2] \( mpr:stack[3] -set delay ${config.arguments.delayShort} -crop ${config.arguments.speed}x0 -reverse \) \\
          mpr:stack[3] \( mpr:stack[0] -set delay ${config.arguments.delayShort} -crop 0x${config.arguments.speed} -reverse \) \\
          -loop ${config.arguments.loop} -layers Optimize output${getUniqueId()}.gif`
    return await execute({ inputFiles, commands })
    // return result.outputFiles
  }
}


