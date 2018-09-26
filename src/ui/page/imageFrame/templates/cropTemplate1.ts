import { CommandTemplate, Color, SizedImageContext, ArgumentType } from "../../../components/commandEditor/CommandTemplate";
import { Command } from "../../../../imagemagick";

export interface Crop1Context extends SizedImageContext {
    background: Color
    horizontalMargin: number
    verticalMargin: number
}
export const cropTemplate1: CommandTemplate = {
    id: 'crop1',
    name: 'Simple Crop',
    commands: [["convert", "$INPUT", "-quiet", "-crop", "119x165-9-6!", "-background", "black", "-flatten", "$OUTPUT"]],
    description: 'TODO',
    template: function (context: Crop1Context) {
        const result = JSON.parse(`[["convert", "$INPUT", "-quiet", "-crop", "${context.imageWidth + context.horizontalMargin * 2}x${context.imageHeight + context.verticalMargin * 2}-${context.horizontalMargin}-${context.verticalMargin}!", "-background", "${context.background}", "-flatten", "$OUTPUT"]]`) as Command[]
        console.log('>>>', context);

        return result
    },
    defaultTemplateContext: {
        horizontalMargin: 12,
        verticalMargin: 10,
        background: '#ededed'
    },
    arguments: [
        { type: ArgumentType.color, id: 'background', name: 'background', description: 'TODO' },
        { type: ArgumentType.number, id: 'horizontalMargin', name: 'horizontalMargin', description: 'TODO' },
        { type: ArgumentType.number, id: 'verticalMargin', name: 'verticalMargin', description: 'TODO' }
    ]
}