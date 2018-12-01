import { Argument, ArgumentType, Color } from "imagemagick-browser"
import pMap from "p-map"
import { ImageState } from "src/store/store"
import { getUniqueId } from "src/util/misc"
import { asInputFile, execute, MagickInputFile } from "wasm-imagemagick"
import { ColorMorph } from "./colorMorph"
import { ComposeMorph } from "./composeMorph"
import { implodeDeformation, noiseDeformation, spreadDeformation, swirlDeformation, tornPaperDeformation } from "./deformationMorph"
import { Morph } from "./morphTypes"
import { PixelatedMorph } from "./pixelatedMorph"
import { ResizeMorph } from "./resizeMorph"
import { Tile4Morph, TileMorph } from "./tileMorphs"


export const commonArguments: Argument[] = [
  {
    type: ArgumentType.number,
    id: "loop",
    name: "loop",
    description: "Set iterations to zero to repeat the animation an infinite number of times, otherwise the animation repeats itself up to iterations times.",
    defaultValue: 0
  },
]

export const morphs: Morph[] = [
  swirlDeformation,
  spreadDeformation,
  implodeDeformation ,
  tornPaperDeformation, 
  noiseDeformation,

  new ResizeMorph(),
  new ColorMorph(),
  new ComposeMorph(),
  new PixelatedMorph(),
  new TileMorph(),
  new Tile4Morph(),

  // need this because issue not showing editors
  {
    name: "dummy", id: "dummy", description: "", command: "", template: async c => [], arguments: []
  },

]

export async function forceSameSize(config: { inputFiles: ImageState[], backgroundColor?: Color }): Promise<MagickInputFile[]> {
  config.backgroundColor = config.backgroundColor || "white"
  let smallerWidth = config.inputFiles[0].info.image.geometry.width
  let smallerWidthIndex = 0
  config.inputFiles.forEach((f, i) => {
    if (smallerWidth > f.info.image.geometry.width) {
      smallerWidth = f.info.image.geometry.width
      smallerWidthIndex = i
    }
  })
  const referenceFile = config.inputFiles[smallerWidthIndex]
  const newSize = `${referenceFile.info.image.geometry.width}x${referenceFile.info.image.geometry.height}`
  const results = await pMap(config.inputFiles.map(f => f.file), f => execute({ inputFiles: [f], commands: `convert ${f.name} -resize ${newSize}> -size ${newSize} xc:${config.backgroundColor} +swap -gravity center -composite ${getUniqueId()}.miff` }))
  const inputFiles = await pMap(results, r => asInputFile(r.outputFiles[0]))
  return inputFiles
}