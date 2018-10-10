import { ArgumentType, Command, CommandTemplate, Interpolate, SizedImageContext, list } from "imagemagick-browser";

export interface waveContext extends Partial<SizedImageContext> {
  amplitude: number
  wavelength: number
}
// -wave amount -interpolate SOMETHING https://www.imagemagick.org/script/command-line-options.php#wave
export const waveTemplate: CommandTemplate<waveContext> = {
  id: 'wave',
  name: 'wave',
  commands: [["convert", "$INPUT", "-wave", "5x33", "$OUTPUT"]],
  description: `Shear the columns of an image into a sine wave.`,
  template: context => JSON.parse(`[["convert", "$INPUT", "-wave", "${context.amplitude}x${context.wavelength}", "$OUTPUT"]]`) as Command[],
  defaultTemplateContext: {
    amplitude: 5,
    wavelength: 33
  },
  arguments: [
    {
      type: ArgumentType.number,
      id: 'amplitude',
      name: 'amplitude',
      description: 'TODO'
    },
    {
      type: ArgumentType.number,
      id: 'wavelength',
      name: 'wavelength',
      description: 'TODO'
    },
  ]
}
