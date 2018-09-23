export interface MagickFile {
  name: string
}

export interface MagickOutputFile extends MagickFile {
  blob: Blob
}

export interface MagickInputFile extends MagickFile {
  content: Uint8Array
}

export interface IMagick {
  Call(files: MagickInputFile[], command: string[]): Promise<MagickOutputFile[]>
}

export interface ExecuteConfig {
  inputFiles: MagickInputFile[]
  /** commands to execute, serially */
  commands?: Command[]
  command?: Command
}
export interface ExecuteResult {
  outputFiles: MagickOutputFile[]
}
export type Command = string[]

let magickApiObj: IMagick
export function getMagickApi(): IMagick {
  if (!magickApiObj) {
    // HEADS UP we require here and not import it at the top so it starts downloading / running wasm on demand.
    magickApiObj = require('./magickApi')
  }
  return magickApiObj
}

class Fruit {
  color: string
}

function comer(f: Fruit) {

}

comer({
  color: 'marron'
})