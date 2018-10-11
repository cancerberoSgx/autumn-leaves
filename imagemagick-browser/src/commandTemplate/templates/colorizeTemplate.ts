import { ArgumentType, Command, CommandTemplate, Interpolate, SizedImageContext, list, Color } from "../..";

export interface colorizeContext extends Partial<SizedImageContext> {
  value: number
  color: Color
}
// -colorize amount -interpolate SOMETHING https://www.imagemagick.org/script/command-line-options.php#colorize
export const colorizeTemplate: CommandTemplate<colorizeContext> = {
  id: 'colorize',
  name: 'colorize',
  commands: [["convert", "$INPUT","-fill", "#ed9843", "-colorize", "12", "$OUTPUT"]],
  description: `
Colorize the image by an amount specified by value using the color specified by 'color'
Specify the amount of colorization as a percentage. Separate colorization values can be applied to the red, green, and blue channels of the 
image with a comma-delimited list of colorization values (e.g., -colorize 0,0,50).`,
  template: context => JSON.parse(`[["convert", "$INPUT", "-fill", "${context.color}", "-colorize", "${context.value}", "$OUTPUT"]]`) as Command[],
  defaultTemplateContext: {
    value: 10, 
    color: '#ed9843'
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
