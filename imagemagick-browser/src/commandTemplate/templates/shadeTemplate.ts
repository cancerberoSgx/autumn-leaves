import { ArgumentType, Command, CommandTemplate, SizedImageContext, list, Kernel } from "../..";

export interface shadeContext extends Partial<SizedImageContext> {
  azimuth: number,
  elevation: number
}
export const shadeTemplate: CommandTemplate<shadeContext> = {
  id: 'shade',
  name: 'shade',
  // commands: [["convert", "$INPUT", "-shade", `1x1` , "$OUTPUT"]],
  description: `TODO`,
  template: context => {
    const command = JSON.parse(`[["convert", "$INPUT",  "-shade", "${context.azimuth}x${context.elevation}" , "$OUTPUT"]]`) as Command[]
    return command
  },
  defaultTemplateContext: {
    azimuth: 3,
    elevation: 4
  },
  arguments: [
    {
      type: ArgumentType.number,
      id: 'azimuth',
      name: 'azimuth',
      description: 'TODO'
    },
    {
      type: ArgumentType.number,
      id: 'elevation',
      name: 'elevation',
      description: 'TODO'
    },
  ]
}
