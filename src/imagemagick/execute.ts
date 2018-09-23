
import * as promiseMap from 'p-map'
import { ExecuteResult, ExecuteConfig, Command, getMagickApi, MagickInputFile, MagickOutputFile } from './index';
import { outputFileToInputFile } from '../util/image';

export class Executor {
  files: MagickInputFile[] = []
  async addFiles(images: (MagickInputFile | MagickOutputFile)[]): Promise<MagickInputFile[]> {
    const promises = Promise.all(images.map(image => (image as MagickOutputFile).blob ? outputFileToInputFile((image as MagickOutputFile)) : Promise.resolve(image)) as Promise<MagickInputFile>[])
    const inputImages = await promises
    this.files = this.files.concat(inputImages)
    return this.files
    // inputImages.forEach(ii=>{
    // this.files.push(ii)
    // })
    // images.forEach(async image => {
    //   Promise.all()
    //   let inputImage: MagickInputFile
    //   if ((image as MagickOutputFile).blob) {
    //     inputImage = await outputFileToInputFile((image as MagickOutputFile)
    //   }
    // })
  }
}

export async function execute(config: ExecuteConfig): Promise<ExecuteResult[]> {
  function executor(command: Command): Promise<ExecuteResult> {
    return executeOne(config, command)
  }
  config.commands = config.commands ? config.commands : config.command ? [config.command] : []
  return await promiseMap(config.commands, command => executor(command), { concurrency: 1 })
}

export async function executeOne(config: ExecuteConfig, command: Command): Promise<ExecuteResult> {
  const result = { outputFiles: await getMagickApi().Call(config.inputFiles, config.commands[0]) }
  console.log('Executed: ' + JSON.stringify(command), 'Output files: ', result.outputFiles.map(f => f.name));
  return result
}
