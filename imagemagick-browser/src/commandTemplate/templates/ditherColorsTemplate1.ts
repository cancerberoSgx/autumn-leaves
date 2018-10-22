import { ArgumentType, Command, CommandTemplate, Dither, SizedImageContext, list } from "../..";
import { CommandTemplateTag } from "../commandTemplate";

export interface ditherColorsContext extends Partial<SizedImageContext> {
  colors: number,
  dither: Dither
}
export const ditherColorsTemplate: CommandTemplate<ditherColorsContext> = {
  id: 'ditherColors',
  name: 'Dither Colors',
  description: `Reduce the number of colors interpolating pixels using different dither algorithms`,
  template: context => JSON.parse(`[["convert", "$INPUT", "-dither", "${context.dither}", "-colors", "${context.colors}", "$OUTPUT"]]`) as Command[],
  defaultTemplateContext: {
    colors: 16, 
    dither: Dither.FloydSteinberg
  },
  tags: [CommandTemplateTag.colors],
  arguments: [
    { 
      type: ArgumentType.number, 
      id: 'colors', 
      name: 'colors', 
      description: 'TODO' 
    },
    {
      type: ArgumentType.selectOne,
      id: 'dither',
      name: 'dither',
      description: 'TODO',
      list: list(Dither).map(m => ({ name: m, id: m }))
    },
  ]
}
