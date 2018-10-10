import { ArgumentType, Command, CommandTemplate, Interpolate, SizedImageContext, list, Color } from "imagemagick-browser";

export interface tintContext extends Partial<SizedImageContext> {
  value: number
  color: Color
}
// -tint amount -interpolate SOMETHING https://www.imagemagick.org/script/command-line-options.php#tint
export const tintTemplate: CommandTemplate<tintContext> = {
  id: 'tint',
  name: 'tint',
  commands: [["convert", "$INPUT", "-fill", '#a72b2b', "-tint", "55", "$OUTPUT"]],
  description: `Shear the columns of an image into a sine tint.`,
  template: context => JSON.parse(`[["convert", "$INPUT", "-fill", "${context.color}", "-tint", "${context.value}", "$OUTPUT"]]`) as Command[],
  defaultTemplateContext: {
    value: 55,
    color: '#a72b2b'
  },
  arguments: [
    {
      type: ArgumentType.number,
      id: 'value',
      name: 'value',
      description: 'TODO'
    },
    {
      type: ArgumentType.color,
      id: 'color',
      name: 'color',
      description: 'TODO'
    },
  ]
}
