import { MagickInputFile, ExecuteConfig, execute, blobToString } from "wasm-imagemagick";
import { ExtractInfoResult } from "wasm-imagemagick/dist/src/util/imageExtractInfoTypes";

export interface InfoConfig {
  inputFiles: MagickInputFile[],
  what?: InfoWhat
}
export enum InfoWhat {
  'json'='json',
  'txt'='txt',
}
export async function info(infoConfig: InfoConfig): Promise<ExtractInfoResult> {
  infoConfig.what=infoConfig.what||InfoWhat.json

  const outputFile = infoConfig.what===InfoWhat.json ? 'json:outputFile.json' : infoConfig.what===InfoWhat.txt ? 'ouputFile.txt' : undefined

  const config: ExecuteConfig = {
    inputFiles: infoConfig.inputFiles,
    commands: [['convert'].concat(infoConfig.inputFiles.map(f => f.name)).concat([outputFile])]
  }
  
  try {
   
  const result = await execute(config)
  const content = await blobToString(result[0].outputFiles[0].blob) as any
  
  return JSON.parse(content)
   
  } catch (error) {
    console.log('ERROR', error);
    throw error
  }

}


