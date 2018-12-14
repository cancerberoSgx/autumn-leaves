import { Argument, ArgumentType } from "imagemagick-browser"
import { getUniqueId } from "src/util/misc"
import { execute } from "wasm-imagemagick"
import { commonArguments } from "./morphs"
import { MagickTemplate, MagickTemplateTag, MagickTemplateArgument } from "../MagickTemplate";

export class ResizeMorph implements MagickTemplate {
  name = "Morph Resize"
  id = "resizeMorph"
  description = `Progressively resizes images and interpolate colors so it simulates an image morph - https:// www.imagemagick.org/Usage/anim_mods/#morph_resize`
  tags = [MagickTemplateTag.morph, MagickTemplateTag.animation]
  command = ""
  arguments = [
    {
      type: ArgumentType.number,
      id: "frames",
      name: "frames",
      description: "Determine how many images to interpolate between each image",
      defaultValue: 6
    } as MagickTemplateArgument
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
