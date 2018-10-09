import { ArgumentType, Command, CommandTemplate, SizedImageContext } from "imagemagick-browser";

export interface OilPaintContext extends Partial<SizedImageContext> {
  radius: number,
}

export const oilTemplate: CommandTemplate<OilPaintContext> = {
  id: 'OilPaint',
  name: 'Oil Paint',
  commands: [["convert", "$INPUT",  "-paint", "5", "$OUTPUT"]],
  description: `simulate an oil painting. Each pixel is replaced by the most frequent color in a circular neighborhood whose width is specified with radius.`,
  template: context => JSON.parse(`[["convert", "$INPUT", "-paint", "${context.radius}", "$OUTPUT"]]`) as Command[],
  defaultTemplateContext: {
    radius: 5
  },
  arguments: [
    { type: ArgumentType.number, id: 'radius', name: 'radius', description: 'TODO' },
  ]
}
