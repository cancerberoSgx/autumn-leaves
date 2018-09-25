import { CommandTemplate, Color, SizedImageContext, ArgumentType } from "../../../components/commandEditor/CommandTemplate";
import { Command } from "../../../../imagemagick";

export interface Vignette1Context extends SizedImageContext {
    background: Color
    x: number
    y: number
}
export const vignetteTemplate1: CommandTemplate = {
    id: 'frameVignette1',
    name: 'Vignette',
    commands: [['convert', '$INPUT', '-alpha', 'set', '-background', 'none', '-vignette', '0x4', '$OUTPUT']],
    description: 'TODO',
    template: function (context: Vignette1Context) {
        const result = JSON.parse(`[["convert", "$INPUT",  "-alpha", "set", "-background", "${context.background}", "-vignette", "${context.radius}x${context.sigma}", "$OUTPUT"]]`) as Command[]
        return result
    },
    defaultTemplateContext: {
        radius: 12,
        sigma: 2,
        background: '#ed6601'
    },
    arguments: [
        { type: ArgumentType.color, id: 'background', name: 'background', description: 'TODO' },
        { type: ArgumentType.number, id: 'radius', name: 'radius', description: 'TODO' },
        { type: ArgumentType.number, id: 'sigma', name: 'sigma', description: 'TODO' }
    ]
}



// {
//     // name: 'test1',
//     id: 'frameVignette1',
//     name: 'frame Vignette',
//     // commands:[ ['convert', '$INPUT', '-alpha', 'set', '-background', 'none', '-vignette', '0x4', '$OUTPUT'],
//     description: 'The Vignette Operator provides a simple means to add a blurry edge around an image.',
//     commands: [['convert', '$INPUT', '-alpha', 'set', '-background', 'none', '-vignette', '0x4', '$OUTPUT']],
//   },