import { CommandTemplate, Color, SizedImageContext, ArgumentType } from "imagemagick-browser";
import { Command } from "imagemagick-browser";

export interface shadowFrame1Context extends Partial<SizedImageContext> {
  background: Color
  intensity: number
  size: number
  offsetX: number
}
export const shadowFrame1: CommandTemplate<shadowFrame1Context> = {
  id: 'shadowFrame1',
  name: 'shadow 1',
  commands: [["convert", "$INPUT", "-page", "+4+4", "-alpha", "set", "(", "+clone", "-background", "navy", "-shadow", "60x4+4+4", ")", "+swap", "-background", "none", "-mosaic", "$OUTPUT"]],
  description: 'TODO',
  template: function (context: shadowFrame1Context) {
    const s = `[["convert", "$INPUT", "-page", "+4+4", "-alpha", "set", "(", "+clone", "-background", "${context.background}${/* new Number(context.alpha).toString(16) */''}", "-shadow", "${context.intensity}x${context.size}+${context.offsetX}+4", ")", "+swap", "-background", "none", "-mosaic", "$OUTPUT"]]`
    const result = JSON.parse(s) as Command[]
    return result
  },
  defaultTemplateContext: { // TODO :move defaultValue to arguments[i].defaultVaLue
    background: '#ff5500',
    intensity: 132,
    size: 3,
    offsetX: 7
  },
  arguments: [
    { type: ArgumentType.color, id: 'background', name: 'background', description: 'TODO' },
    { type: ArgumentType.number, id: 'intensity', name: 'intensity', description: 'TODO' },
    { type: ArgumentType.number, id: 'size', name: 'size', description: 'TODO' },
    { type: ArgumentType.number, id: 'offsetX', name: 'offsetX', description: 'TODO' },
  ]
}

// {
//   id: 'frameShadow1',
//   name: 'frame shadow soft',
//   commands: [["convert", "$INPUT", "-page", "+4+4", "-alpha", "set", "(", "+clone", "-background", "navy", "-shadow", "60x4+4+4", ")", "+swap", "-background", "none", "-mosaic", "$OUTPUT"]],
//   description: ' '
// },