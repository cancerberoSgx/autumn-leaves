import { Argument, ArgumentType } from "imagemagick-browser"
import { getUniqueId } from "src/util/misc"
import { execute } from "wasm-imagemagick"
import { commonArguments } from "./morphs"
import { Morph, MorphTag } from "../magickTemplateTypes"

export class ResizeMorph implements Morph {
  name = "Resize"
  id = "resizeMorph"
  description = `https:// www.imagemagick.org/Usage/anim_mods/#morph_resize`
  tags = [MorphTag.morph, MorphTag.animation]
  command = ""
  arguments = [
    {
      type: ArgumentType.number,
      id: "frames",
      name: "frames",
      description: "determine how many images to interpolate between each image",
      defaultValue: 6
    } as Argument
  ].concat(commonArguments)

  async template(config) {
    const inputFiles = config.inputFiles.map(i => i.file)
    const commands = `
    convert -morph ${config.arguments.frames} \\
    ${inputFiles[0].name} ${inputFiles[1].name} \\
    -layers TrimBounds -set dispose previous -coalesce \\
    -set delay '%[fx:(t>0&&t<n-1)?10:60]' \\
    -duplicate 1,-2-1  -loop ${config.arguments.loop} -layers Optimize output${getUniqueId()}.gif`
    return await execute({ inputFiles, commands })
  }

}
