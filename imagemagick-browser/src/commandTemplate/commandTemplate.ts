import { Command } from '..';

// TODO: maybe it's better to remove this interface for stricter typechecking
export interface TemplateContext {
  // [key: string]: any
}

export interface SizedImageContext extends TemplateContext {
  imageWidth?: number,
  imageHeight?: number
}

/**
 * General representation of objects that know how to print a command. Optionally support `arguments` metadata of a command 
 * together with implementation of the command in `template()`
 */
export interface CommandTemplate<Context=TemplateContext> {
  id: string;
  name: string;
  // /** initial value */
  command?: Command;
  // /** initial value */
  // commands?: Command[];
  description?: string;
  /** implementation of the template. Tip use js template strings and JSON.parse like: 
   * ```JSON.parse(`[["convert" "input.png", "-rotate", ${context.amount} ]]`)``` */
  template?(context: Context): Command[];
  defaultTemplateContext?: Context;
  /** metadata for arguments */
  arguments?: Argument[];
  tags?: CommandTemplateTag[]
  outputFileExtension?: string
}

export type Color = string

export enum ArgumentType {
  color = 'color',
  number = 'number',
  boolean = 'boolean',
  text = 'text',
  selectOne = 'select-single', // select list single item selection
  imagePoints = 'imagePoints',
  file = 'file', // configurable file / multi file / extension filter / see component/ChooseImage
  point = 'point', // can be implemented differently: 1 input, two inputs or a point clicked on an image by the user
  rectangle = 'rectangle'// can be implemented differently: 1 input, two inputs or a rectangle drawn by the user over an image
}

export interface Argument {
  type?: ArgumentType
  id: string
  name?: string
  description?: string
  /** if type is selectOne then user must provide items for the list here */
  list?: { name: string, id: string }[]
  points?: PointHandler[]
  /** validation for type=='number' */
  min?: number
  /** validation for type=='number' */
  max?: number
  /** increment for type=='number' */
  step?: number
  defaultValue?: any
  /** in case of a type===number then this indicates if the number being edited is a float or an integer */
  isInteger?: boolean
}

export interface Point {
  x: number
  y: number
}

export interface Rectangle {
  x: number
  y: number
  width: number
  height: number
}

export interface PointHandler extends Point {
  id: string
  name?: string
  color?: Color
}

// tagging

export enum CommandTemplateTag {
  'artistic' = 'artistic',
  'distort' = 'distort',
  'decoration' = 'decoration',
  'colors' = 'colors',
  'edgeDetection' = 'edgeDetection',
  'morphology' = 'morphology'
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

export interface ArgumentEditorState<T> {
  value: T
}

export interface CommandEditorProps {
  commandTemplate: CommandTemplate
  templateContext: TemplateContext
  onChange: (event: CommandChangeEvent) => void
}