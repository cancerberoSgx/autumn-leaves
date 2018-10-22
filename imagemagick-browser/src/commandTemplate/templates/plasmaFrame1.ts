import { CommandTemplate, Color, SizedImageContext, ArgumentType } from "../..";
import { Command } from "../..";
import { CommandTemplateTag } from "../commandTemplate";

export interface PlasmaFrame1Context extends Partial<SizedImageContext> {
  mattecolor: Color
  alpha: number
  frameWidth: number
  frameHeight: number
  count: number
}
export const plasmaFrame1: CommandTemplate<PlasmaFrame1Context> = {
  id: 'plasmaFrame1',
  name: 'Plasma 1',
  description: 'TODO',
  tags: [CommandTemplateTag.decoration, CommandTemplateTag.artistic],
  template: function (context: PlasmaFrame1Context) {
    const s = `
      [["convert", "$INPUT", "-matte", 
        "-mattecolor", "${context.mattecolor}${new Number(context.alpha).toString(16)}", 
        "-frame", "${context.frameWidth}x${context.frameHeight}+${context.count}+${context.count}", 
        "(", "-size", "${context.imageWidth * 2 + context.frameWidth}x${context.imageHeight * 2 + context.frameHeight}", 
          "plasma:fractal", "-normalize", "-blur", "0x1", ")", 
        "-compose", "DstOver", "-composite", "$OUTPUT"]]
`
    //TODO: parameterized "fractal" with a select
    //TODO: param blur
    const result = JSON.parse(s) as Command[]
    return result
  },
  defaultTemplateContext: { // TODO :move defaultValue to arguments[i].defaultVaLue
    mattecolor: '#ff0000',
    alpha: 123,
    frameWidth: 10,
    frameHeight: 10,
    count: 3
  },
  arguments: [
    { type: ArgumentType.color, id: 'mattecolor', name: 'mattecolor', description: 'TODO' },
    { type: ArgumentType.number, id: 'alpha', name: 'alpha', description: 'TODO' },
    { type: ArgumentType.number, id: 'frameWidth', name: 'frameWidth', description: 'TODO' },
    { type: ArgumentType.number, id: 'frameHeight', name: 'frameHeight', description: 'TODO' },
    { type: ArgumentType.number, id: 'count', name: 'count', description: 'TODO' },
  ]
}
