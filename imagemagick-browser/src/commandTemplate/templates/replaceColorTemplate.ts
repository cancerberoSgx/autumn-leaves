import { ArgumentType, Command, CommandTemplate,  SizedImageContext, list, Color } from "../..";
import { CommandTemplateTag } from "../commandTemplate";

export interface replaceColorContext extends Partial<SizedImageContext> {
  opaque: Color
  fill: Color
  fuzz: number
}
// example: convert cow.gif -fuzz 40%  -fill red -opaque black  cow_replace_fuzz.gif
export const replaceColorTemplate: CommandTemplate<replaceColorContext> = {
  id: 'replaceColor',
  name: 'replaceColor',
  tags: [CommandTemplateTag.colors],
  description: `Replace color 'opaque' with color 'fill' optinally with a 'fuzz' tolerance when matching colors`,
  template: context => JSON.parse(`[["convert", "$INPUT", "-fuzz", "${context.fuzz}%", "-fill", "${context.fill}", "-opaque", "${context.opaque}", "$OUTPUT"]]`) as Command[],
  defaultTemplateContext: {
    opaque: '#000000',
    fill: '#ff0000',
    fuzz: 30
  },
  arguments: [
    {
      type: ArgumentType.color,
      id: 'opaque',
      name: 'opaque',
      description: 'TODO'
    },
    {
      type: ArgumentType.color,
      id: 'fill',
      name: 'fill',
      description: 'TODO'
    },
    {
      type: ArgumentType.number,
      id: 'fuzz',
      name: 'fuzz',
      min: 0,
      max: 100,
      description: 'TODO'
    },
  ]
}
