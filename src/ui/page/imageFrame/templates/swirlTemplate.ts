import { ArgumentType, Command, CommandTemplate, Interpolate, SizedImageContext, list } from "imagemagick-browser";

export interface swirlContext extends Partial<SizedImageContext> {
  degrees: number
}
// -swirl amount -interpolate SOMETHING https://www.imagemagick.org/script/command-line-options.php#swirl
export const swirlTemplate: CommandTemplate<swirlContext> = {
  id: 'swirl',
  name: 'swirl',
  commands: [["convert", "$INPUT",  "-swirl", "33", "$OUTPUT"]],
  description: `swirl image pixels about the center.  Degrees defines the tightness of the swirl.`,
  template: context => JSON.parse(`[["convert", "$INPUT", "-swirl", "${context.degrees}", "$OUTPUT"]]`) as Command[],
  defaultTemplateContext: {
    degrees: 33,
  },
  arguments: [
    { 
      type: ArgumentType.number, 
      id: 'degrees', 
      name: 'degrees', 
      description: 'TODO' 
    },
  ]
}
