import { ArgumentType, Command, CommandTemplate, Interpolate, SizedImageContext, list } from "../..";
import { CommandTemplateTag } from "../commandTemplate";

export interface swirlContext extends Partial<SizedImageContext> {
  degrees: number
}
// -swirl amount -interpolate SOMETHING https://www.imagemagick.org/script/command-line-options.php#swirl
export const swirlTemplate: CommandTemplate<swirlContext> = {
  id: 'swirl',
  name: 'swirl',
  tags: [CommandTemplateTag.distort, CommandTemplateTag.morphology],
  description: `swirl image pixels about the center.  Degrees defines the tightness of the swirl.`,
  template: context => JSON.parse(`[["convert", "$INPUT", "-swirl", "${context.degrees}", "$OUTPUT"]]`) as Command[],
  defaultTemplateContext: {
    degrees: 55,
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
