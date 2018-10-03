import { MagickInputFile, Command, ExecuteResult, ExecuteConfig } from '..';
import { execute } from '../execute';

export interface Fragment {
  type: FragmentType
  toCommand(): Command
}

export enum FragmentType {
  rotate = 'rotate',
  image = 'image'
}


export interface Chain {
  inputImages: MagickInputFile[]
  firstCommand: string

  image(image: MagickInputFile | string): Chain
  images(images: MagickInputFile[]): Chain
  toCommand(): Command
  execute(): Promise<ExecuteResult>
  rotate(degrees: number): Chain
}
