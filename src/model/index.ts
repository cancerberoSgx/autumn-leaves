export interface Transformation {
  /** returns this transformation as accepted directly by wasm-imagemagick Call() */
  toIMArguments(): string[]
}




export interface GenericStringArgument extends Transformation {
  value: string
}

export class GenericStringArgumentImpl1 implements GenericStringArgument {
  constructor(public value: string) {
  }
  toIMArguments(): string[] {
    return JSON.parse(this.value)
  }
}