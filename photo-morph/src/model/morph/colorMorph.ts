import { Argument, ArgumentType } from "imagemagick-browser"
import { getUniqueId } from "src/util/misc"
import { execute } from "wasm-imagemagick"
import { commonArguments, forceSameSize } from "./morphs"
import { MagickTemplate, MagickTemplateTag, MagickTemplateArgument } from "../MagickTemplate";


export class ColorMorph implements MagickTemplate {
  name = "Morph color"
  id = "colorMorph"
  description = `https://www.imagemagick.org/Usage/anim_mods/#morph_color`
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
      id: "frames",
      name: "frames",
      description: "determine how many images to interpolate between each image",
      defaultValue: 6
    },
  ].concat(commonArguments)

  async template(config) {
    const {inputFiles} = await forceSameSize({ ...config, backgroundColor: config.arguments.backgroundColor })
    const commands = `
      convert ${inputFiles[0].name} ${inputFiles[1].name} \\
        -morph ${config.arguments.frames} \\
        -set delay '%[fx:(t>0&&t<n-1)?10:140]' \\
        -duplicate 1,-2-1 -loop ${config.arguments.loop} -layers Optimize output${getUniqueId()}.gif`
    return await execute({ inputFiles, commands })
  }
}

