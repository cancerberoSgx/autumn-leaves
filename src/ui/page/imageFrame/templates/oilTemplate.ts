import { CommandTemplate, Color, SizedImageContext, ArgumentType } from "imagemagick-browser";
import { Command } from "imagemagick-browser";

export interface OilPaintContext extends Partial<SizedImageContext> {
  radius: number
}

export const oilTemplate: CommandTemplate<OilPaintContext> = {
  id: 'OilPaint',
  name: 'Oil Paint',
  commands: [["convert", "$INPUT",  "-paint", "5", "$OUTPUT"]],
  description: 'TODO',
  template: function (context: OilPaintContext) {
    const result = JSON.parse(`[["convert", "$INPUT", "-paint", "${context.radius}", "$OUTPUT"]]`) as Command[]
    return result
  },
  defaultTemplateContext: {
    radius: 10
  },
  arguments: [
    { type: ArgumentType.number, id: 'radius', name: 'radius', description: 'TODO' },
  ]
}
