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
  
  return Promise.all(
    result.map(async r => {
    // try {
    return await blobToString(r.outputFiles[0].blob) as any
    // } catch (error) {
    //   console.log('ERRROR', error);
    //   throw error
      
    // }
  }))
  // const p = await Promise.all(result.map(async r => {
  //   const rr = await blobToString(r.outputFiles[0].blob)
  //   // console.log('SEBA', rr);
    
  //   const out =  JSON.parse(rr) as InfoResult
  //   return out
  // }))
  // return p
  // // return p.map((r: any)=>r) // TODO: hack for fixing [][] to be []
}



// the following is infoResult json output as .d.ts using http://json2ts.com/

export interface InfoResult {
  image: InfoResultImage;
}

export interface InfoResultGeometry {
  width: number;
  height: number;
  x: number;
  y: number;
}

export interface InfoResultResolution {
  x: number;
  y: number;
}

export interface InfoResultPrintSize {
  x: number;
  y: number;
}

export interface InfoResultChannelDepth {
  alpha: number;
  red: number;
  green: number;
  blue: number;
}

export interface InfoResultOverall {
  min: number;
  max: number;
  mean: number;
  standardDeviation: number;
  kurtosis: number;
  skewness: number;
  entropy: number;
}

export interface InfoResultImageStatistics {
  Overall: InfoResultOverall;
}

export interface InfoResultAlpha {
  min: number;
  max: number;
  mean: number;
  standardDeviation: number;
  kurtosis: number;
  skewness: number;
  entropy: number;
}

export interface InfoResultRed {
  min: number;
  max: number;
  mean: number;
  standardDeviation: number;
  kurtosis: number;
  skewness: number;
  entropy: number;
}

export interface InfoResultGreen {
  min: number;
  max: number;
  mean: number;
  standardDeviation: number;
  kurtosis: number;
  skewness: number;
  entropy: number;
}

export interface InfoResultBlue {
  min: number;
  max: number;
  mean: number;
  standardDeviation: number;
  kurtosis: number;
  skewness: number;
  entropy: number;
}

export interface InfoResultChannelStatistics {
  Alpha: InfoResultAlpha;
  Red: InfoResultRed;
  Green: InfoResultGreen;
  Blue: InfoResultBlue;
}

export interface InfoResultRedPrimary {
  x: number;
  y: number;
}

export interface InfoResultGreenPrimary {
  x: number;
  y: number;
}

export interface InfoResultBluePrimary {
  x: number;
  y: number;
}

export interface InfoResultWhitePrimary {
  x: number;
  y: number;
}

export interface InfoResultChromaticity {
  redPrimary: InfoResultRedPrimary;
  greenPrimary: InfoResultGreenPrimary;
  bluePrimary: InfoResultBluePrimary;
  whitePrimary: InfoResultWhitePrimary;
}

export interface InfoResultPageGeometry {
  width: number;
  height: number;
  x: number;
  y: number;
}

export interface InfoResultProperties {
  'date:create': Date;
  'date:modify': Date;
  'jpeg:colorspace': string;
  'jpeg:sampling-factor': string;
  'png:bKGD': string;
  'png:IHDR.bit-depth-orig': string;
  'png:IHDR.bit_depth': string;
  'png:IHDR.color-type-orig': string;
  'png:IHDR.color_type': string;
  'png:IHDR.interlace_method': string;
  'png:IHDR.width,height': string;
  'png:pHYs': string;
  'png:sRGB': string;
  'png:text': string;
  'png:text-encoded profiles': string;
  signature: string;
}

export interface InfoResult8bim2 {
  length: number;
}

export interface InfoResultProfiles {
  '8bim': InfoResult8bim2;
}

export interface InfoResultImage {
  name: string;
  baseName: string;
  format: string;
  formatDescription: string;
  mimeType: string;
  class: string;
  geometry: InfoResultGeometry;
  resolution: InfoResultResolution;
  printSize: InfoResultPrintSize;
  units: string;
  type: string;
  baseType: string;
  endianess: string;
  colorspace: string;
  depth: number;
  baseDepth: number;
  channelDepth: InfoResultChannelDepth;
  pixels: number;
  imageStatistics: InfoResultImageStatistics;
  channelStatistics: InfoResultChannelStatistics;
  alpha: string;
  renderingIntent: string;
  gamma: number;
  chromaticity: InfoResultChromaticity;
  matteColor: string;
  backgroundColor: string;
  borderColor: string;
  transparentColor: string;
  interlace: string;
  intensity: string;
  compose: string;
  pageGeometry: InfoResultPageGeometry;
  dispose: string;
  iterations: number;
  compression: string;
  orientation: string;
  properties: InfoResultProperties;
  profiles: InfoResultProfiles;
  tainted: boolean;
  filesize: string;
  numberPixels: string;
  pixelsPerSecond: string;
  userTime: string;
  elapsedTime: string;
  version: string;
}

