import { CommandTemplate, Color, SizedImageContext, ArgumentType } from "../..";
import { Command } from "../..";
import { CommandTemplateTag } from "../commandTemplate";

export interface Vignette1Context extends Partial<SizedImageContext> {
    background: Color
    radius: number
    sigma: number
}
export const vignetteTemplate1: CommandTemplate<Vignette1Context> = {
    id: 'frameVignette1',
    name: 'Vignette',
    description: 'TODO',
    tags: [CommandTemplateTag.artistic, CommandTemplateTag.decoration],
    template: function (context: Vignette1Context) {
        const result = JSON.parse(`[["convert", "$INPUT",  "-alpha", "set", "-background", "${context.background}", "-vignette", "${context.radius}x${context.sigma}", "$OUTPUT"]]`) as Command[]
        return result
    },
    defaultTemplateContext: {
        background: '#8a1717',
        radius: 13,
        sigma: 12,
    },
    arguments: [
        { type: ArgumentType.color, id: 'background', name: 'background', description: 'TODO' },
        { type: ArgumentType.number, id: 'radius', name: 'radius', description: 'TODO' },
        { type: ArgumentType.number, id: 'sigma', name: 'sigma', description: 'TODO' }
    ]
}