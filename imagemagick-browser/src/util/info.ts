import { MagickInputFile, ExecuteConfig } from "..";
import { execute } from "../execute";
import { blobToString } from "./image";

export interface InfoConfig {
  inputFiles: MagickInputFile[]
}
export interface InfoResult {

}

/** execute convert foo.png json: */
export async function info(infoConfig: InfoConfig): Promise<InfoResult[]> {
  const config: ExecuteConfig = {
    inputFiles: infoConfig.inputFiles,
    commands: [['convert'].concat(infoConfig.inputFiles.map(f => f.name)).concat(['json:outputFile.json'])]
  }
  const result = await execute(config)
  return result.map(async r => JSON.parse(await blobToString(r.outputFiles[0].blob)))
}