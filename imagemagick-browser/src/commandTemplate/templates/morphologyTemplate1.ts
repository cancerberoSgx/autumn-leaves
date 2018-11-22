import { ArgumentType, Command, CommandTemplate,  SizedImageContext, list, } from "../..";
import { CommandTemplateTag } from "../commandTemplate";
import { IMMorphology, IMKernel } from "wasm-imagemagick";

// Syntax: 
// -morphology {method}[:{iterations}]   {kernel}[:[k_args}]

// Examples:
// convert man.gif  -morphology Thinning:-1 Skeleton  man_raw_thinned.gif

export interface morphologyContext extends Partial<SizedImageContext> {
  method: IMMorphology
  iterations: number,
  kernel: IMKernel
  kernelArguments: number
}
export const morphologyTemplate: CommandTemplate<morphologyContext> = {
  id: 'morphology',
  name: 'Morphology',
  tags: [CommandTemplateTag.distort, CommandTemplateTag.morphology],
  description: `TODO`,
  template: context => {
    const command = JSON.parse(`[["convert", "$INPUT", "-morphology", "${context.method + (context.iterations ? `:${context.iterations}` : ``)}", "${context.kernel+ (context.kernelArguments ? `:${context.kernelArguments}` : ``)}", "$OUTPUT"]]`) as Command[]
    return command
  },
  defaultTemplateContext: {
    iterations: 1,
    method: IMMorphology.Close, 
    kernel: IMKernel.Disk, 
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
      list: list(IMMorphology).map(m => ({ name: m, id: m }))
    },
    {
      type: ArgumentType.selectOne,
      id: 'kernel',
      name: 'kernel',
      description: 'TODO',
      list: list(IMKernel).map(m => ({ name: m, id: m }))
    },
    {
      type: ArgumentType.number, //TODO: it's not a number is text or more
      id: 'kernelArguments',
      name: 'kernelArguments',
      description: 'TODO'
    },
  ]
}
