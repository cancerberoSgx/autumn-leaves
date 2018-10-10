import { ArgumentType, Command, CommandTemplate, Interpolate, SizedImageContext, list } from "imagemagick-browser";

export interface sketchContext extends Partial<SizedImageContext> {
  radius: number
  sigma: number
  angle: number
}
// -sketch amount -interpolate SOMETHING https://www.imagemagick.org/script/command-line-options.php#sketch
export const sketchTemplate: CommandTemplate<sketchContext> = {
  id: 'sketch',
  name: 'sketch',
  commands: [["convert", "$INPUT",  "-sketch", "3x2+55", "$OUTPUT"]],
  description: `simulate a pencil sketch.
Sketch with the given radius, standard deviation (sigma), and angle. The angle given is the angle toward which the image is sketched. That is the direction people would consider the object is coming from.`,
  template: context => JSON.parse(`[["convert", "$INPUT", "-sketch", "${context.radius}x${context.sigma}+${context.angle}", "$OUTPUT"]]`) as Command[],
  defaultTemplateContext: {
    radius: 3,
    sigma: 2,
    angle: 55,
  },
  arguments: [
    { 
      type: ArgumentType.number, 
      id: 'radius', 
      name: 'radius', 
      description: 'TODO' 
    },
    { 
      type: ArgumentType.number, 
      id: 'sigma', 
      name: 'sigma', 
      description: 'TODO' 
    },
    { 
      type: ArgumentType.number, 
      id: 'angle', 
      name: 'angle', 
      description: 'TODO' 
    },
  ]
}