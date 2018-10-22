import { CommandTemplate, Color, SizedImageContext, ArgumentType } from "../..";
import { Command } from "../..";
import { CommandTemplateTag } from "../commandTemplate";

export interface Polaroid3Context extends Partial<SizedImageContext> {
  background: Color
  stroke: Color
  size: number
  rotate: number
}
export const polaroidTemplate3: CommandTemplate<Polaroid3Context> = {
  id: 'framePolaroid3_',
  name: 'Polaroid 3',
  tags: [CommandTemplateTag.decoration, CommandTemplateTag.artistic],
  description: 'TODO',
  template: function (context: Polaroid3Context) {
    const s = `[["convert","-size","150x150","xc:none","-background","none","-fill","white","-stroke","${context.stroke}","-draw","rectangle 0,0  ${context.imageWidth + context.size * 2},${context.imageHeight + context.size * 2}","$INPUT","-geometry","+${context.size}+${context.size}","-composite","-rotate","-${context.rotate}","-draw","rectangle 0,0 ${context.imageWidth + context.size * 2},${context.imageHeight + context.size * 2}","$INPUT","-geometry","+${context.size}+${context.size}","-composite","-rotate","-${context.rotate}","-draw","rectangle 0,0 ${context.imageWidth + context.size * 2},${context.imageHeight + context.size * 2}","$INPUT","-geometry","+${context.size}+${context.size}","-composite","-rotate","+${context.rotate}","-trim","+repage","-background","${context.background}","-flatten","$OUTPUT"]]`

    const result = JSON.parse(s) as Command[]
    return result
  },
  defaultTemplateContext: { // TODO :move defaultValue to arguments[i].defaultVaLue
    stroke: '#046691',
    background: '#ff0000',
    size: 5,
    rotate: 20
  },
  arguments: [
    { type: ArgumentType.color, id: 'background', name: 'background', description: 'TODO' },
    { type: ArgumentType.color, id: 'stroke', name: 'stroke', description: 'TODO' },
    { type: ArgumentType.number, id: 'size', name: 'size', description: 'TODO' },
    { type: ArgumentType.number, id: 'rotate', name: 'rotate', description: 'TODO' },
  ]
}
