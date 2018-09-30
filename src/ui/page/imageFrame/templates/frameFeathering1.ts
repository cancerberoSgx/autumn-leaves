import { CommandTemplate, Color, SizedImageContext, ArgumentType } from "imagemagick-browser";
import { Command } from "imagemagick-browser";

export interface FrameFeathering1Context extends Partial<SizedImageContext> {
  strength: number
}

export const frameFeathering1: CommandTemplate<FrameFeathering1Context> = {
  id: 'frameFeathering1',
  name: 'Feathering 1',
  commands: [['convert', '$INPUT', '-alpha', 'set', '-virtual-pixel', 'transparent', '-channel', 'A', '-morphology', 'Distance', 'Euclidean:1,10!', '+channel', '$OUTPUT']],
  description: "TODO",
  template: function (context: FrameFeathering1Context) {
    const s = `[["convert", "$INPUT", "-alpha", "set", "-virtual-pixel", "transparent", "-channel", "A", "-morphology", "Distance", "Euclidean:1,${context.strength}!", "+channel", "$OUTPUT"]]`
    const result = JSON.parse(s) as Command[]
    return result
  },
  defaultTemplateContext: {
    strength: 10
  },
  arguments: [
    { type: ArgumentType.number, id: 'strength', name: 'strength', description: 'TODO' },
  ]
}


// {
//   id: 'frameFeathering1',
//   name: 'frame feathering 1',
//   commands: [['convert', '$INPUT', '-alpha', 'set', '-virtual-pixel', 'transparent', '-channel', 'A', '-morphology', 'Distance', 'Euclidean:1,10!', '+channel', '$OUTPUT']],
//   description: 'The Morphology Distance method provides a true transparent \'Feathering\' of an image\'s edges.'
// },
