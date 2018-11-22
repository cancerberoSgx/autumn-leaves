import { ArgumentType, Color, Command, CommandTemplate,  PointHandler, SizedImageContext,  VirtualPixelMethods, CommandTemplateTag } from "../..";
import { seq } from "../../util/misc";

export interface RotateGifContext extends Partial<SizedImageContext> {
  delay: number
  angleStep: number
  background: Color
}

// https://imagemagick.org/Usage/warping/animate_distort_rot
export const RotateGif: CommandTemplate<RotateGifContext> = {
  id: 'RotateGif',
  name: 'Rotate gif',
  description: "TODO",
  outputFileExtension: '.gif',
  template: function (context: RotateGifContext) {
    const s = `[["convert", "-delay","${context.delay}","$INPUT", "-virtual-pixel", "${context.background}", ${seq(context.angleStep, context.angleStep, 360).map(n=>`"(", "-clone", "0", "-distort", "SRT", "${n}", ")"`)}, "-delete", "0", "-loop", "0", "$OUTPUT"]]`
    const result = JSON.parse(s) as Command[]
    return result
  },
  tags: [CommandTemplateTag.distort],
  defaultTemplateContext: {
    delay: 10,
    angleStep: 5, 
    background: 'white'
  },
  arguments: [
    {
      type: ArgumentType.number,
      id: 'delay',
      name: 'delay',
      description: 'TODO', 
    },
    {
      type: ArgumentType.number,
      id: 'angleStep',
      name: 'Rotation angle step',
      description: 'TODO'
    },
    {
      type: ArgumentType.color,
      id: 'background',
      name: 'Background',
      description: 'TODO'
    },
  ]
}
