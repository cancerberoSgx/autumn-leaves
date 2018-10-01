
import * as promiseMap from 'p-map'
import { ExecuteResult, ExecuteConfig, Command, getMagickApi, MagickInputFile, MagickOutputFile } from './index';
import { outputFileToInputFile } from './util/image';

export async function execute(config: ExecuteConfig): Promise<ExecuteResult[]> {
  const files: MagickInputFile[] = [] // files generated in between commands are stored and provided by IM on each call to eecuteOne
  async function executor(command: Command): Promise<ExecuteResult> {
    const t0 = performance.now()
    config.inputFiles = config.inputFiles.concat(files) // TODO: review config.command vs config.commands and and remove duplicated
    const result = await executeOne(config)
    const inputFiles = await Promise.all(result.outputFiles.map(outputFileToInputFile))
    inputFiles.forEach(file => {
      files.push(file) // TODO: replace content if it already exists
    })
    executeListeners.forEach(l => l({ command, took: performance.now() - t0 }))
    return result
  }
  return await promiseMap(config.commands, command => executor(command), { concurrency: 1 })
}

export async function executeOne(config: ExecuteConfig): Promise<ExecuteResult> {
  const command = config.commands[0]
  const result = { outputFiles: await getMagickApi().Call(config.inputFiles, command) }
  // console.log('Executed: ' + JSON.stringify(command), 'Output files: ', result.outputFiles.map(f => f.name));
  return result
}


// execute event emitter

export interface ExecuteEvent {
  command: Command
  took: number
}
export type ExecuteListener = (event: ExecuteEvent) => void

let executeListeners: ExecuteListener[] = []
export function addExecuteListener(l: ExecuteListener) {
  executeListeners.push(l)
}