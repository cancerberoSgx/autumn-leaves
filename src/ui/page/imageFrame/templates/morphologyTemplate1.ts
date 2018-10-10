import { ArgumentType, Command, CommandTemplate, Morphology, SizedImageContext, list, Kernel } from "imagemagick-browser";

// Syntax: 
// -morphology {method}[:{iterations}]   {kernel}[:[k_args}]

// Examples:
// convert man.gif  -morphology Thinning:-1 Skeleton  man_raw_thinned.gif

export interface morphologyContext extends Partial<SizedImageContext> {
  method: Morphology
  iterations: number,
  kernel: Kernel
  kernelArguments: number
}
export const morphologyTemplate: CommandTemplate<morphologyContext> = {
  id: 'morphology',
  name: 'Morphology',
  commands: [["convert", "$INPUT", "-morphology", `${Morphology.Close}:1`, Kernel.Disk, "$OUTPUT"]],
  description: `TODO`,
  template: context => {
    const command = JSON.parse(`[["convert", "$INPUT", "-morphology", "${context.method + (context.iterations ? `:${context.iterations}` : ``)}", "${context.kernel+ (context.kernelArguments ? `:${context.kernelArguments}` : ``)}", "$OUTPUT"]]`) as Command[]
    return command
  },
  defaultTemplateContext: {
    iterations: 1,
    method: Morphology.Close, 
    kernel: Kernel.Disk, 
    kernelArguments: 2
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
      type: ArgumentType.number, //TODO: it's not a number is text or more
      id: 'kernelArguments',
      name: 'kernelArguments',
      description: 'TODO'
    },
  ]
}
