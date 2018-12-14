import { Argument, ArgumentType } from "imagemagick-browser";
import { getUniqueId } from "src/util/misc";
import { execute } from "wasm-imagemagick";
import { MagickTemplate, MagickTemplateTag, MagickTemplateArgument } from "../MagickTemplate";
import { morphCommonArguments, forceSameSize, buildExecuteResultWithError } from "./morphs";


export class TileMorph implements MagickTemplate {
  name = "Morph tile simple"
  id = "tileMorph"
  description = `Morph between two images by cropping horizontally or vertically from left to right or top to bottom`
  tags = [MagickTemplateTag.morph, MagickTemplateTag.animation]
  arguments = [
    {
      type: ArgumentType.color,
      id: "backgroundColor",
      name: "Background Color",
      description: "background color for the smaller image that is enlarged",
      defaultValue: "#ffffff"
    } as MagickTemplateArgument,
    {
      type: ArgumentType.number,
      id: "cropSpeed",
      name: "Crop Speed",
      description: "Horizontal crop speed",
      defaultValue: 9
    } as MagickTemplateArgument,
    {
      type: ArgumentType.selectOne,
      id: "direction",
      name: "Direction",
      list: [{ id: "vertical", name: "vertical" }, { id: "horizontal", name: "horizontal" }, { id: "both", name: "both" }],
      description: "crop direction",
      defaultValue: "horizontal"
    } as MagickTemplateArgument,
  ].concat(morphCommonArguments)

  async template(config) {
    if(config.inputFiles.length<2){
      return buildExecuteResultWithError('Please select 2 or more images in order to create a morph animation')
    }
    const {inputFiles} = await forceSameSize({ ...config, backgroundColor: config.arguments.backgroundColor + "" })
    const commands = `
    convert  \\
    ${inputFiles[0].name} ${inputFiles[1].name} \\
    \( -clone 0 -crop ${config.arguments.direction !== "vertical" ? config.arguments.cropSpeed : 0}x${config.arguments.direction !== "horizontal" ? config.arguments.cropSpeed : 0} \) \\
    -set delay 10  -loop ${config.arguments.loop} -layers Optimize output${getUniqueId()}.gif`
    return await execute({ inputFiles, commands })
  }
}

export class Tile4Morph implements MagickTemplate {
  name = "Morph tile crop 4 directions"
  id = "Tile4Morph"
  description = `(Select 4 images) Morph between 4 images going from left->right then top->bottom, then right->left and finally bottom->top`
  tags = [MagickTemplateTag.morph, MagickTemplateTag.animation]
  command = ""
  arguments = [
    {
      type: ArgumentType.number,
      id: "speed",
      name: "speed",
      description: "The size of the cropped rectangle on each frame. The bigger the faster the animation will be. ",
      defaultValue: 4
    } as MagickTemplateArgument,
    {
      type: ArgumentType.number,
      id: "delayShort",
      name: "delayShort",
      description: "how much delay between deformed frames",
      defaultValue: 10
    } as MagickTemplateArgument, ,
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
    const {inputFiles} = await forceSameSize({ inputFiles: config.inputFiles, backgroundColor: config.arguments.backgroundColor || "white" })
    const commands = `
       convert  -delay ${config.arguments.delayLong} ${inputFiles.map(f => f.name).join(" ")} \\
          -write mpr:stack -delete 0--1 \\
          mpr:stack[0] \( mpr:stack[1] -set delay ${config.arguments.delayShort} -crop ${config.arguments.speed}x0 \) \\
          mpr:stack[1] \( mpr:stack[2] -set delay ${config.arguments.delayShort} -crop 0x${config.arguments.speed} \) \\
          mpr:stack[2] \( mpr:stack[3] -set delay ${config.arguments.delayShort} -crop ${config.arguments.speed}x0 -reverse \) \\
          mpr:stack[3] \( mpr:stack[0] -set delay ${config.arguments.delayShort} -crop 0x${config.arguments.speed} -reverse \) \\
          -loop ${config.arguments.loop} -layers Optimize output${getUniqueId()}.gif`
    return await execute({ inputFiles, commands })
  }
}


