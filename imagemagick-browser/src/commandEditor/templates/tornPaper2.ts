import { CommandTemplate, Color, SizedImageContext, ArgumentType } from "../..";
import { Command } from "../..";

export interface TornPaper2Context extends Partial<SizedImageContext> {
  spread1: number
  spread2: number
  paddingHorizontal: number
  paddingVertical: number
  background: Color
}
export const tornPaper2: CommandTemplate<TornPaper2Context> = {
  id: 'frameTornPaperEdge2',
  name: 'Torn paper 2',
  commands: [["convert", "$INPUT", "-bordercolor", "blue", "-border", "18x18", "-background", "blue", "", "-gravity", "SouthEast", "-splice", "1x1+0+0", "(", "+clone", "-alpha", "extract", "-virtual-pixel", "black", "-spread", "10", "-blur", "0x3", "-threshold", "50%", "-spread", "1", "-blur", "0x.7", ")", "-alpha", "off", "-compose", "Copy_Opacity", "-composite", "-gravity", "SouthEast", "$OUTPUT"]],
  description: 'TODO',
  template: function (context: TornPaper2Context) {
    const s = `[["convert", "$INPUT", "-bordercolor", "${context.background}", "-border", "${context.paddingHorizontal}x${context.paddingVertical}", "-background", "${context.background}", "", "-gravity", "SouthEast", "-splice", "1x1+0+0", "(", "+clone", "-alpha", "extract", "-virtual-pixel", "black", "-spread", "${context.spread1}", "-blur", "0x3", "-threshold", "50%", "-spread", "${context.spread2}", "-blur", "0x.7", ")", "-alpha", "off", "-compose", "Copy_Opacity", "-composite", "-gravity", "SouthEast", "$OUTPUT"]]`

    const result = JSON.parse(s) as Command[]
    return result
  },
  defaultTemplateContext: { // TODO :move defaultValue to arguments[i].defaultVaLue
    background: '#aacf77',
    spread1: 10,
    spread2: 1,
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  arguments: [
    { type: ArgumentType.number, id: 'spread1', name: 'spread1', description: 'TODO' },
    { type: ArgumentType.number, id: 'spread2', name: 'spread2', description: 'TODO' },
    { type: ArgumentType.number, id: 'paddingHorizontal', name: 'paddingHorizontal', description: 'TODO' },
    { type: ArgumentType.number, id: 'paddingVertical', name: 'paddingVertical', description: 'TODO' },
    { type: ArgumentType.color, id: 'background', name: 'background', description: 'TODO' },
  ]
}

  // {
  //   id: 'frameTornPaperEdge2',
  //   name: 'frame torn paper edges 2',
  //   commands:
  //     [["convert", "$INPUT", "-bordercolor", "blue", "-border", "18x18", "-background", "blue", "", "-gravity", "SouthEast", "-splice", "1x1+0+0", "(", "+clone", "-alpha", "extract", "-virtual-pixel", "black", "-spread", "10", "-blur", "0x3", "-threshold", "50%", "-spread", "1", "-blur", "0x.7", ")", "-alpha", "off", "-compose", "Copy_Opacity", "-composite", "-gravity", "SouthEast", "$OUTPUT"]],
  //   description: ' '
  // },
