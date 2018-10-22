import { ArgumentType, Command, CommandTemplate, Interpolate, SizedImageContext, list, Color } from "../..";
import { CommandTemplateTag } from "../commandTemplate";

export interface shearContext extends Partial<SizedImageContext> {
  xDegrees: number
  yDegrees: number
  background: Color
}
// -shear Xdegrees[xYdegrees]  https://www.imagemagick.org/script/command-line-options.php#shear
export const shearTemplate: CommandTemplate<shearContext> = {
  id: 'shear',
  name: 'shear',
  tags: [CommandTemplateTag.distort],
  description: `Shear the image along the x-axis and/or y-axis. https://www.imagemagick.org/script/command-line-options.php#shear`,
  template: context => JSON.parse(`[["convert", "$INPUT", "-background", "${context.background}", "-shear", "${context.xDegrees}x${context.yDegrees}", "$OUTPUT"]]`) as Command[],
  defaultTemplateContext: {
    xDegrees: 50,
    yDegrees: 20,
    background: '#ededed'
  },
  arguments: [
    {
      type: ArgumentType.number,
      id: 'xDegrees',
      name: 'xDegrees',
      description: 'TODO'
    },
    {
      type: ArgumentType.number,
      id: 'yDegrees',
      name: 'yDegrees',
      description: 'TODO'
    },
    {
      type: ArgumentType.color,
      id: 'background',
      name: 'background',
      description: 'TODO'
    },
  ]
}
