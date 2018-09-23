
import * as promiseMap from 'p-map'
import { ExecuteResult, ExecuteConfig, Command, getMagickApi, MagickInputFile, MagickOutputFile } from './index';
import { outputFileToInputFile } from '../util/image';

export async function execute(config: ExecuteConfig): Promise<ExecuteResult[]> {
  const files: MagickInputFile[] = [] // files generated in between commands are stored and provided by IM on each call to eecuteOne
  async function executor(command: Command): Promise<ExecuteResult> {
    config.inputFiles = config.inputFiles.concat(files) // TODO: review config.command vs config.commands and and remove duplicated
    const result = await executeOne(config, command)
    const inputFiles = await Promise.all(result.outputFiles.map(outputFileToInputFile))
    inputFiles.forEach(file => {
      files.push(file) // TODO: replace content if it already exists
    })
    return result
  }
  config.commands = config.commands ? config.commands : config.command ? [config.command] : []
  return await promiseMap(config.commands, command => executor(command), { concurrency: 1 })
}

export async function executeOne(config: ExecuteConfig, command: Command): Promise<ExecuteResult> {
  const result = { outputFiles: await getMagickApi().Call(config.inputFiles, config.commands[0]) }
  console.log('Executed: ' + JSON.stringify(command), 'Output files: ', result.outputFiles.map(f => f.name));
  return result
}


// export class Executor {
//   files: MagickInputFile[] = []
//   async addFiles(images: (MagickInputFile | MagickOutputFile)[]): Promise<MagickInputFile[]> {
//     const promises = Promise.all(images.map(image => (image as MagickOutputFile).blob ? outputFileToInputFile((image as MagickOutputFile)) : Promise.resolve(image)) as Promise<MagickInputFile>[])
//     const inputImages = await promises
//     this.files = this.files.concat(inputImages)
//     return this.files
//   }
// }

// const files: MagickInputFile[] = []
// async function addFiles(images: (MagickInputFile | MagickOutputFile)[]): Promise<MagickInputFile[]> {
//   const promises = Promise.all(images.map(image => (image as MagickOutputFile).blob ? outputFileToInputFile((image as MagickOutputFile)) : Promise.resolve(image)) as Promise<MagickInputFile>[])
//   const inputImages = await promises
//   this.files = this.files.concat(inputImages)
//   return this.files
// }
