import { CommandTemplate, Color, SizedImageContext, ArgumentType } from "../../../components/commandEditor/CommandTemplate";
import { Command } from "imagemagick-browser";

export interface VirtualRandom1Context extends SizedImageContext {
  width: number
  height: number
}

export const virtualRandom1: CommandTemplate = {
  id: 'virtualRandom1',
  name: 'Virtual Random 1',
  commands: [["convert", "$INPUT", "-set", "option:distort:viewport", "70x70-19-19", "-virtual-pixel", "Random", "-filter", "point", "-distort", "SRT", "0", "+repage", "$OUTPUT"]],
  description: "TODO",
  template: function (context: VirtualRandom1Context) {
    const s = `[["convert", "$INPUT", "-set", "option:distort:viewport", "${context.imageWidth + context.width * 2}x${context.imageHeight + context.height * 2}-${context.width}-${context.height}", "-virtual-pixel", "Random", "-filter", "point", "-distort", "SRT", "0", "+repage", "$OUTPUT"]]`

    const result = JSON.parse(s) as Command[]
    return result
  },
  defaultTemplateContext: { // TODO :move defaultValue to arguments[i].defaultVaLue
    width: 50,
    height: 20
  },
  arguments: [
    { type: ArgumentType.number, id: 'width', name: 'width', description: 'TODO' },
    { type: ArgumentType.number, id: 'height', name: 'height', description: 'TODO' },
  ]
}


// {
//   id: 'virtualRandom1',
//   name: 'virtual random 1',
//   commands: [['convert', '$INPUT', '-set', 'option:distort:viewport', '70x70-19-19', '-virtual-pixel', 'Random', '-filter', 'point', '-distort', 'SRT', '0', '+repage', '$OUTPUT']],
//   description: 'pick random pixels of the image to build the frame'
// },
