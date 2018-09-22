export interface State {
  imagePool: ImageRef[]
  selectedImages: ImageRef[]
}
export interface ImageRef {
  name: string
}
// export enum CommandTypes { convert = 'convert' }

// export interface Command {
//   type: string
// }
// export interface ConvertCommand extends Command {
//   type: CommandTypes.convert
//   operations: Operation[]
// }

export enum ConvertMorphologies { 'Convolve' = 'Convolve', 'Hit-and-Miss' = 'Hit-and-Miss' }

// export interface Operation {
// }
// export interface ConvertMorphology extends Operation {
//   kernel?: string
//   morphology?: string
//   type: ConvertMorphologies
//   // type: ConvertMorphologies.
// }
// export class ConvertMorphologyConvolveImpl1 implements ConvertMorphologyConvolve {
//   kernel?: string;
//   morphology?: string;
//   type: CommandTypes = CommandTypes.convert
// }