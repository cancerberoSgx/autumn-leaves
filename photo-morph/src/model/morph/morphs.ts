import { Argument, ArgumentType, Color } from "imagemagick-browser"
import pMap from "p-map"
import { ImageState } from "src/store/store"
import { getUniqueId, showImages } from "src/util/misc"
import { asInputFile, execute, MagickInputFile, ExecuteResult } from "wasm-imagemagick"
import { ColorMorph } from "./colorMorph"
import { ComposeMorph } from "./composeMorph"
import { implodeDeformation, noiseDeformation, spreadDeformation, swirlDeformation, tornPaperDeformation } from "./deformationMorph"
import { registerMagickTemplates } from "../magickTemplates"
import { MagickTemplate, MagickTemplateArgument } from "../MagickTemplate";
import { PixelatedMorph } from "./pixelatedMorph"
import { ResizeMorph } from "./resizeMorph"
import { Tile4Morph, TileMorph } from "./tileMorphs"


export const morphCommonArguments: MagickTemplateArgument[] = [
  {
    type: ArgumentType.number,
    id: "loop",
    name: "loop",
    description: "Set iterations to zero to repeat the animation an infinite number of times, otherwise the animation repeats itself up to iterations times.",
    defaultValue: 0
  },
]
export function registerAllMagickTemplateMorphs() {

const morphs: MagickTemplate[] = [
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

]
registerMagickTemplates(morphs)
}

export async function forceSameSize(config: { inputFiles: ImageState[], backgroundColor?: Color }): Promise<{inputFiles: MagickInputFile[], referenceImage: ImageState}> {
  config.backgroundColor = config.backgroundColor || "white"
  let smallerWidth = config.inputFiles[0].info.image.geometry.width
  let smallerWidthIndex = 0
  config.inputFiles.forEach((f, i) => {
    if (smallerWidth > f.info.image.geometry.width) {
      smallerWidth = f.info.image.geometry.width
      smallerWidthIndex = i
    }
  })
  const referenceImage = config.inputFiles[smallerWidthIndex]
  const newSize = `${referenceImage.info.image.geometry.width}x${referenceImage.info.image.geometry.height}`
  const results = await pMap(config.inputFiles.map(f => f.file), f => execute({ inputFiles: [f], commands: `convert ${f.name} -resize ${newSize}> -size ${newSize} xc:${config.backgroundColor} +swap -gravity center -composite ${getUniqueId()}.miff` }), {concurrency: 1})
  const inputFiles = await pMap(results, r => asInputFile(r.outputFiles[0]), {concurrency: 1})
  showImages(inputFiles)
  return {inputFiles, referenceImage}
}

