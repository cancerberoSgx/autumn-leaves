import { ArgumentType, Command, CommandTemplate, Interpolate, SizedImageContext, list, Color } from "imagemagick-browser";

export interface replaceColorContext extends Partial<SizedImageContext> {
  opaque: Color
  fill: Color
  fuzz: number
}
// example: convert cow.gif -fuzz 40%  -fill red -opaque black  cow_replace_fuzz.gif
export const replaceColorTemplate: CommandTemplate<replaceColorContext> = {
  id: 'replaceColor',
  name: 'replaceColor',
  commands: [["convert", "$INPUT", "-fuzz", "40%", "-fill", "red", "-opaque", "black", "$OUTPUT"]],
  description: `Shear the columns of an image into a sine replaceColor.`,
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
