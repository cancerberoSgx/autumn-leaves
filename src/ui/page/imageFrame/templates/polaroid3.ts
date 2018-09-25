import { CommandTemplate, Color, SizedImageContext, ArgumentType } from "../../../components/commandEditor/CommandTemplate";
import { Command } from "../../../../imagemagick";

export interface Polaroid3Context extends SizedImageContext {
  background: Color
  stroke: Color
  size: number
  rotate: number
}
export const polaroidTemplate3: CommandTemplate = {
  id: 'framePolaroid3_',
  name: 'Polaroid 3',
  commands: [["convert", "-size", "150x150", "xc:none", "-background", "none", "-fill", "white", "-stroke", "grey60", "-draw", "rectangle 0,0  119,155", "$INPUT", "-geometry", "+5+5", "-composite", "-rotate", "-10", "-draw", "rectangle 0,0 119,155", "$INPUT", "-geometry", "+5+5", "-composite", "-rotate", "-10", "-draw", "rectangle 0,0 119,155", "$INPUT", "-geometry", "+5+5", "-composite", "-rotate", "+10", "-trim", "+repage", "-background", "#ff0000", "-flatten", "$OUTPUT"]],
  description: 'TODO',
  template: function (context: Polaroid3Context) {
    const s = `[["convert","-size","150x150","xc:none","-background","none","-fill","white","-stroke","${context.stroke}","-draw","rectangle 0,0  ${context.imageWidth + context.size * 2},${context.imageHeight + context.size * 2}","$INPUT","-geometry","+${context.size}+${context.size}","-composite","-rotate","-${context.rotate}","-draw","rectangle 0,0 ${context.imageWidth + context.size * 2},${context.imageHeight + context.size * 2}","$INPUT","-geometry","+${context.size}+${context.size}","-composite","-rotate","-${context.rotate}","-draw","rectangle 0,0 ${context.imageWidth + context.size * 2},${context.imageHeight + context.size * 2}","$INPUT","-geometry","+${context.size}+${context.size}","-composite","-rotate","+${context.rotate}","-trim","+repage","-background","${context.background}","-flatten","$OUTPUT"]]`
    // console.log(s);

    const result = JSON.parse(s) as Command[]
    return result
  },
  defaultTemplateContext: { // TODO :move defaultValue to arguments[i].defaultVaLue
    stroke: '#046691',
    background: '#ff0000',
    size: 5,
    rotate: 10
  },
  arguments: [
    { type: ArgumentType.color, id: 'background', name: 'background', description: 'TODO' },
    { type: ArgumentType.color, id: 'stroke', name: 'stroke', description: 'TODO' },
    { type: ArgumentType.number, id: 'size', name: 'size', description: 'TODO' },
    { type: ArgumentType.number, id: 'rotate', name: 'rotate', description: 'TODO' },
  ]
}


// {
//   id: 'framePolaroid3',
//   name: 'frame polaroid 3',
//   commands: [["convert", "-size", "150x150", "xc:none", "-background", "none", "-fill", "white", "-stroke", "grey60", "-draw", "rectangle 0,0  119,155", "$INPUT", "-geometry", "+5+5", "-composite", "-rotate", "-10", "-draw", "rectangle 0,0 119,155", "$INPUT", "-geometry", "+5+5", "-composite", "-rotate", "-10", "-draw", "rectangle 0,0 119,155", "$INPUT", "-geometry", "+5+5", "-composite", "-rotate", "+10", "-trim", "+repage", "-background", "LightSteelBlue", "-flatten", "$OUTPUT"]],
//   description: ' '
// },