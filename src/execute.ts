
import * as promiseMap from 'p-map'
import { ExecuteResult, ExecuteConfig, Command, getMagickApi } from './imagemagick';
export async function execute(config: ExecuteConfig): Promise<ExecuteResult[]> {
  function executor(command: Command): Promise<ExecuteResult> {

    return executeOne(config, command)
  }
  const results = await promiseMap(config.commands, command => executor(command), { concurrency: 1 })
  return results
  // return { outputFiles: await getMagickApi().Call(config.inputFiles, config.commands[0]) }
}
export async function executeOne(config: ExecuteConfig, command: Command): Promise<ExecuteResult> {
  const result = { outputFiles: await getMagickApi().Call(config.inputFiles, config.commands[0]) }
  console.log('Executed: ' + JSON.stringify(command), 'Output files: ', result.outputFiles.map(f => f.name));
  return result
}
