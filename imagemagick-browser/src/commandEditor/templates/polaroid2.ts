import { CommandTemplate, Color, SizedImageContext, ArgumentType } from "../..";
import { Command } from "../..";

export interface Polaroid2Context extends Partial<SizedImageContext> {
  background: Color
  bordercolor: Color
}
export const polaroidTemplate2: CommandTemplate<Polaroid2Context> = {
  id: 'framePolaroid2_',
  name: 'Polaroid 2',
  commands: [["convert", "$INPUT", "-bordercolor", "snow", "-background", "black", "+polaroid", "$OUTPUT"]],
  description: 'TODO',
  template: function (context: Polaroid2Context) {
    const s = `[["convert", "$INPUT", "-bordercolor", "${context.bordercolor}", "-background", "${context.background}", "+polaroid", "$OUTPUT"]]`
    const result = JSON.parse(s) as Command[]
    return result
  },
  defaultTemplateContext: { // TODO :move defaultValue to arguments[i].defaultVaLue
    bordercolor: '#046691',
    background: '##ff0000'
  },
  arguments: [
    { type: ArgumentType.color, id: 'background', name: 'background', description: 'TODO' },
    { type: ArgumentType.color, id: 'bordercolor', name: 'bordercolor', description: 'TODO' }
  ]
}

// {
//     id: 'framePolaroid2_',
//     name: 'frame polaroid 2_',
//     commands: [["convert", "$INPUT", "-bordercolor", "snow", "-background", "black", "+polaroid", "$OUTPUT"]],
//     description: ' '
//   },