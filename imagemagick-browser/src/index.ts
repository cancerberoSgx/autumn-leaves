export interface MagickFile {
  name: string
}

export interface MagickOutputFile extends MagickFile {
  blob: Blob
}

export interface MagickInputFile extends MagickFile {
  /** is nto really optional: content must be set in order to execute() to work. But we leave it optional so higher level APIs can be build by extending it. */
  content?: Uint8Array
}

export interface IMagick {
  Call(files: MagickInputFile[], command: string[]): Promise<MagickOutputFile[]>
}

export type Command = string[]

export interface ExecuteConfig {
  inputFiles: MagickInputFile[]
  /** commands to execute, serially */
  commands: Command[]
}
export interface ExecuteResult {
  outputFiles: MagickOutputFile[]
}

let magickApiObj: IMagick
export function getMagickApi(): IMagick {
  if (!magickApiObj) {
    // HEADS UP we require here and not import it at the top so it starts downloading / running wasm on demand.
    magickApiObj = require('wasm-imagemagick')
  }
  return magickApiObj
}

export * from './execute'

export * from './util/image'
export * from './util/cli'
export * from './util/misc'

export * from './commandEditor/commandTemplate'
export * from './options/virtualPixel'
export * from './options/filter'

export * from './list'

export * from './chain'

export * from './commandEditor/templates'

// TODO: Example of organizing in modules: 

// import DoubleT from './lang/Double'

// export namespace templates {
//   export type Double = DoubleT
//   export type Class<T> = ClassT<T>
//   export type ClassLoader = ClassLoaderT
//   export type Runtime = RuntimeT
//   export type Enum<E>/* <E extends EnumT<E>> */ = EnumT<E /* extends EnumT */>/*  */ // TODO: can't do this!. investigate & report to TS
//   export type Object = ObjectT
//   export type Runnable = RunnableT
//   export type Iterable<E> = IterableT<E>
//   export type AutoCloseable = AutoCloseableT

//   export namespace reflect {
//     export type Proxy = ProxyT
//     export type Method = MethodT
//     export type InvocationHandler = InvocationHandlerT
//   }
// }

// export const templates = {
//   Double: DoubleT,
// }

