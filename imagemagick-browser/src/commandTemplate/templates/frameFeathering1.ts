import { ArgumentType, Command, CommandTemplate, SizedImageContext } from "../..";
import { CommandTemplateTag } from "../commandTemplate";

export interface FrameFeathering1Context extends Partial<SizedImageContext> {
  strength: number
}

export const frameFeathering1: CommandTemplate<FrameFeathering1Context> = {
  id: 'frameFeathering1',
  name: 'Feathering 1',
  description: "TODO",
  tags: [CommandTemplateTag.decoration],
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