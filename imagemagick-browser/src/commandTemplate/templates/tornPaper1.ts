import { CommandTemplate, Color, SizedImageContext, ArgumentType } from "../..";
import { Command } from "../..";
import { CommandTemplateTag } from "../commandTemplate";

export interface TornPaper1Context extends Partial<SizedImageContext> {
  spread1: number
  spread2: number
}
export const tornPaper1: CommandTemplate<TornPaper1Context> = {
  id: 'frameTornPaperEdge1',
  name: 'Torn paper 1',
  tags: [CommandTemplateTag.artistic],
  description: 'TODO',
  template: function (context: TornPaper1Context) {
    const s = `[["convert", "$INPUT", "(", "+clone", "-alpha", "extract", "-virtual-pixel", "black", "-spread", "${context.spread1}", "-blur", "0x3", "-threshold", "50%", "-spread", "${context.spread1}", "-blur", "0x.7", ")", "-alpha", "off", "-compose", "Copy_Opacity", "-composite", "$OUTPUT"]]`

    const result = JSON.parse(s) as Command[]
    return result
  },
  defaultTemplateContext: { // TODO :move defaultValue to arguments[i].defaultVaLue
    spread1: 10,
    spread2: 10
  },
  arguments: [
    { type: ArgumentType.number, id: 'spread1', name: 'spread1', description: 'TODO' },
    { type: ArgumentType.number, id: 'spread2', name: 'spread2', description: 'TODO' }
  ]
}
