import { Command } from 'imagemagick-browser'
export interface TemplateContext {
  [key: string]: string | number
}
export interface SizedImageContext extends TemplateContext {
  // imageSizes: ImageSize[]
  imageWidth: number,
  imageHeight: number
}
/**
 * metadata of a command in `arguments` together with implementation of command in `template`
 */
export interface CommandTemplate {
  id: string;
  name: string;
  command?: Command;
  commands?: Command[];
  description?: string;
  template?(context: TemplateContext): Command[];
  defaultTemplateContext?: TemplateContext
  arguments?: Argument[]
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
export interface Argument {
  type?: ArgumentType
  id: string
  name?: string
  description?: string
}

// UI / react base framework types

export interface ArgumentChangeEvent<T> {
  value: T
  argument: Argument
  changeEvent?: React.ChangeEvent
}
export interface CommandChangeEvent {
  value: Command[]
  commandTemplate: CommandTemplate
}
export interface ArgumentEditorProps<T> {
  argument?: Argument
  value?: T
  onChange: (event: ArgumentChangeEvent<T>) => void
}
export interface CommandEditorProps {
  commandTemplate: CommandTemplate
  templateContext: TemplateContext
  // commands: Command[]
  // initialValue?: T
  onChange: (event: CommandChangeEvent) => void
}
export interface ArgumentEditorState<T> {
  value: T
}
