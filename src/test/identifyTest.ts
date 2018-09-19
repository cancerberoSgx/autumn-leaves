import { InputFile } from '../imagemagick';

Module = {
  noInitialRun: true,
  print: function (text: string) { console.log(`>> stdout >> ${text}`); module_output = text; },
  printErr: function (text: string) { console.log(`>> stderr >> ${text}`); }

}
var module_output = '';

export interface WasmModule {
  noInitialRun: boolean
  print: (text: string) => void
  printErr: (text: string) => void
};

declare let Module: any

// export function setWasmModule(m: WasmModule): void {
//   // @ts-ignore
//   Module = m
// };

export function callMainWasm(args: any[]): any {
  // @ts-ignore
  return Module['callMain'](args)
};

export interface Result {

}

// let moduleSet = false;


export function magick(command: string[]): Promise<Result> {
  // if (typeof Module === 'undefined') {
  //   setWasmModule({
  //     // (global as any).Module = {
  //     noInitialRun: true,
  //     print: function (text: string) { console.log(`>> stdout >> ${text}`); module_output = text; },
  //     printErr: function (text: string) { console.log(`>> stderr >> ${text}`); }
  //     // }
  //     // moduleSet = true
  //   })
  // }
  console.log(`running command ${command}`)
  try {
    const a = callMainWasm(command);
    console.log(`got format ${module_output}`)
    // if (formatToMatch == form) { matched = true }
  }
  catch (e) {
    console.log(`failed to identify ${command}`)
    console.log(`exception ${e}`)
  }

  return Promise.resolve<Result>(null)

}

function test() {
  const commands = ['identify', 'rose:']
  magick(commands)
}
test()