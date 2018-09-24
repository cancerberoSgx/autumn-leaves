import { Command } from '../../../imagemagick';
import { ImageSize } from '../../../util/image';
export interface TemplateContext {
}
export interface SizedImageContext extends TemplateContext {
  imageSizes: ImageSize[]
}
export interface CommandTemplate {
  id: string;
  name: string;
  command?: Command;
  commands?: Command[];
  description?: string;
  template?(context: TemplateContext): Command[];
  arguments?: Argument[]
}

export interface ArgumentEditorProps<T> {
  argument?: Argument
  initialValue?: T
}
export interface ArgumentEditorState<T> {
  value?: T
}


export type Color = string

export enum ArgumentType {
  color = 'color',
  number = 'number',
  text = 'text',
  file = 'file', // configurable file / multi file / extension filter / see component/ChooseImage
  point = 'point', // can be implemented differently: 1 input, two inputs or a point clicked on an image by the user
  rectangle = 'rectangle'// can be implemented differently: 1 input, two inputs or a rectangle drawn by the user over an image
}
export interface Thing {
  id: string
  name?: string
  description?: string
}
export interface Argument extends Thing {
  type?: ArgumentType
  // toIMCommandFragment(): string[]
}
export interface IMCommand extends Thing {
  type: 'convert' // TODO: wont work on other commands than convert right now
  arguments: Argument[]
  toIMCommand(): Command
}