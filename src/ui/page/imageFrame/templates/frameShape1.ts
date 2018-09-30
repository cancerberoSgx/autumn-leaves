import { CommandTemplate, Color, SizedImageContext, ArgumentType } from "imagemagick-browser";
import { Command } from "imagemagick-browser";

export interface FrameShape1Context extends Partial<SizedImageContext> {
  horizontal: number
  vertical: number
}

export const frameShape1: CommandTemplate<FrameShape1Context> = {
  id: 'frameShape1',
  name: 'Shape 1',
  commands: [["convert", "$INPUT", "-alpha", "set", "-compose", "DstOut", "(", "-size", "60x15", "xc:none", "-draw", "polygon 0,0  0,14 19,0", "-write", "mpr:triangle", "", "+delete", ")", "(", "mpr:triangle", ")", "-gravity", "northwest", "-composite", "(", "mpr:triangle", "-flip", ")", "-gravity", "southwest", "-composite", "(", "mpr:triangle", "-flop", ")", "-gravity", "northeast", "-composite", "(", "mpr:triangle", "-rotate", "180", ")", "-gravity", "southeast", "-composite", "$OUTPUT"]],
  description: "TODO",
  template: function (context: FrameShape1Context) {
    const s = `[["convert", "$INPUT", "-alpha", "set", "-compose", "DstOut", "(", "-size", "${context.horizontal + context.vertical}x${context.horizontal + context.vertical}", "xc:none", "-draw", "polygon 0,0  0,${context.horizontal} ${context.vertical},0", "-write", "mpr:triangle", "", "+delete", ")", "(", "mpr:triangle", ")", "-gravity", "northwest", "-composite", "(", "mpr:triangle", "-flip", ")", "-gravity", "southwest", "-composite", "(", "mpr:triangle", "-flop", ")", "-gravity", "northeast", "-composite", "(", "mpr:triangle", "-rotate", "180", ")", "-gravity", "southeast", "-composite", "$OUTPUT"]]`
    const result = JSON.parse(s) as Command[]
    return result
  },
  defaultTemplateContext: {
    horizontal: 14,
    vertical: 19
  },
  arguments: [
    { type: ArgumentType.number, id: 'horizontal', name: 'horizontal', description: 'TODO' },
    { type: ArgumentType.number, id: 'vertical', name: 'vertical', description: 'TODO' },
  ]
}


// {
//   id: 'frameShape1',
//   name: 'frame shape 1',
//   commands: [["convert", "$INPUT", "-alpha", "set", "-compose", "DstOut", "(", "-size", "20x15", "xc:none", "-draw", "polygon 0,0  0,14 19,0", "-write", "mpr:triangle", "", "+delete", ")", "(", "mpr:triangle", ")", "-gravity", "northwest", "-composite", "(", "mpr:triangle", "-flip", ")", "-gravity", "southwest", "-composite", "(", "mpr:triangle", "-flop", ")", "-gravity", "northeast", "-composite", "(", "mpr:triangle", "-rotate", "180", ")", "-gravity", "southeast", "-composite", "$OUTPUT"]],
//   description: ' '
// },