import { ArgumentType, Command, CommandTemplate, Interpolate, SizedImageContext, list, Color } from "imagemagick-browser";

export enum Mode {
  'sharpen'='sharpen',
  'blur'='blur',
  "adaptive-sharpen"="adaptive-sharpen", 
  "adaptive-blur"="adaptive-blur"
}
export interface sharpenBlurContext extends Partial<SizedImageContext> {
  mode: Mode
  radius: number
  sigma: number
}
// -sharpenBlur amount -interpolate SOMETHING https://www.imagemagick.org/script/command-line-options.php#sharpenBlur
export const sharpenBlurTemplate: CommandTemplate<sharpenBlurContext> = {
  id: 'sharpenBlur',
  name: 'Sharpen & Blur (optionally adaptive)',
  commands: [["convert", "$INPUT", "-sharpen", '10x3', "$OUTPUT"]],
  description: `Adaptively blur pixels. 'adaptive' ones decrease the effect near edges. A Gaussian operator of the given radius and standard deviation (sigma) is used. If sigma is not given it defaults to 1.`,
  template: context => JSON.parse(`[["convert", "$INPUT", "-${context.mode}", "${context.radius}x${context.sigma}", "$OUTPUT"]]`) as Command[],
  defaultTemplateContext: {
    mode: Mode.sharpen,
    radius: 10, 
    sigma: 3
  },
  arguments: [
    {
      type: ArgumentType.selectOne,
      id: 'mode',
      name: 'mode',
      description: 'TODO',
      list: list(Mode).map(m => ({ name: m, id: m }))
    },
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
  ]
}
