import { ArgumentType, Command, CommandTemplate, Morphology, SizedImageContext, list, Kernel } from "imagemagick-browser";

// Syntax: 
// -morphology {method}[:{iterations}]   {kernel}[:[k_args}]

// Examples:
// convert man.gif  -morphology Thinning:-1 Skeleton  man_raw_thinned.gif

export interface morphologyContext extends Partial<SizedImageContext> {
  method: Morphology
  iterations: number,
  kernel: Kernel
  kernelArguments: string
}
const ourKernels = [
  // because we need to introduce complex kernelArguments to some to work - we leave only simple ones 
  Kernel.Rectangle, Kernel.Prewitt, Kernel.Prewitt
]
export const morphologyTemplate: CommandTemplate<morphologyContext> = {
  id: 'morphology',
  name: 'Morphology',
  commands: [["convert", "$INPUT", "-morphology", `${Morphology.Close}:1`, Kernel.Disk, "$OUTPUT"]],
  description: `Reduce the number of colors interpolating pixels using different dither algorithms`,
  template: context => {
    const command = JSON.parse(`[["convert", "$INPUT", "-morphology", "${context.method + (context.iterations ? `:${context.iterations}` : ``)}", "${context.kernel+ (context.kernelArguments ? `:${context.kernelArguments}` : ``}", "$OUTPUT"]]`) as Command[]
    console.log({ command });
    return command
  },
  defaultTemplateContext: {
    iterations: 1,
    method: Morphology.Close, 
    kernel: Kernel.Disk, 
    kernelArguments: '3'
  },
  arguments: [
    {
      type: ArgumentType.number,
      id: 'iterations',
      name: 'iterations',
      description: 'TODO'
    },
    {
      type: ArgumentType.selectOne,
      id: 'method',
      name: 'method',
      description: 'TODO',
      list: list(Morphology).map(m => ({ name: m, id: m }))
    },
    {
      type: ArgumentType.selectOne,
      id: 'kernel',
      name: 'kernel',
      description: 'TODO',
      list: list(Kernel).map(m => ({ name: m, id: m }))
    },
    {
      type: ArgumentType.text,
      id: 'kernelArguments',
      name: 'kernelArguments',
      description: 'TODO'
    },
  ]
}
