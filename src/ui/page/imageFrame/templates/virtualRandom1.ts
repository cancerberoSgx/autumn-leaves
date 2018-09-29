import { CommandTemplate, Color, SizedImageContext, ArgumentType } from "imagemagick-browser";
import { Command } from "imagemagick-browser";

export interface VirtualRandom1Context extends SizedImageContext {
  width: number
  height: number
  type: 'Random' | 'Dither'
}

export const virtualRandom1: CommandTemplate = {
  id: 'virtualRandom1',
  name: 'Virtual Random 1',
  commands: [["convert", "$INPUT", "-set", "option:distort:viewport", "70x70-19-19", "-virtual-pixel", "Random", "-filter", "point", "-distort", "SRT", "0", "+repage", "$OUTPUT"]],
  description: "TODO",
  template: function (context: VirtualRandom1Context) {
    const s = `[["convert", "$INPUT", "-set", "option:distort:viewport", "${context.imageWidth + context.width * 2}x${context.imageHeight + context.height * 2}-${context.width}-${context.height}", "-virtual-pixel", "${context.type || 'Dither'}", "-filter", "point", "-distort", "SRT", "0", "+repage", "$OUTPUT"]]`

    const result = JSON.parse(s) as Command[]
    return result
  },
  defaultTemplateContext: {
    width: 50,
    height: 20,
    type: 'Dither'
  },
  arguments: [
    { type: ArgumentType.number, id: 'width', name: 'width', description: 'TODO' },
    { type: ArgumentType.number, id: 'height', name: 'height', description: 'TODO' },
    {
      type: ArgumentType.selectOne,
      id: 'type',
      name: 'type',
      description: 'TODO',
      list: [{ name: 'Dither', id: 'Dither' }, { name: 'Random', id: 'Random' }]
    },
  ]
}


// {
//   id: 'virtualRandom1',
//   name: 'virtual random 1',
//   commands: [['convert', '$INPUT', '-set', 'option:distort:viewport', '70x70-19-19', '-virtual-pixel', 'Random', '-filter', 'point', '-distort', 'SRT', '0', '+repage', '$OUTPUT']],
//   description: 'pick random pixels of the image to build the frame'
// },
