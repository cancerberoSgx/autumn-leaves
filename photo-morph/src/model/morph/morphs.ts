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

//TODO: 

// <%
// 
// const seq = n => new Array(n).fill(0).map((m, i)=>i)
// const random = (min, max) => Math.trunc(Math.random() * (max - min) + min)
// const randomPath = (w=W, h=H) =>  `path "M ${seq(random(pathMinPoints, pathMaxPoints)).map(i=>`${random(0, w)},${random(0, h)}`).join(' ')} Z"`
// 
// const delay = 10
// const morph = 4
// const frameCount = 8
// const frames = seq(frameCount)
// const W=200
// const H=100
// const pathMinPoints = 4
// const pathMaxPoints = 12
// %>
// 
// convert rose: -resize <%=W%>x<%=H%>! 1.miff
// convert fn.png -resize <%=W%>x<%=H%>! 2.miff
// 
// <%
// frames.forEach(i=>{
  // %>
// cut 1.miff '<%=randomPath()%>' 1<%=i%>.miff 1<%=i%>section.miff
// cut 2.miff '<%=randomPath()%>' 2<%=i%>.miff 2<%=i%>section.miff  
// paste <%=i===0?'2.miff' : `2${i-1}pasted.miff` %>  1<%=i%>section.miff 0x0 2<%=i%>pasted.miff
// paste <%=i===0?'1.miff' : `1${i-1}pasted.miff` %>  2<%=i%>section.miff 0x0 1<%=i%>pasted.miff
  // <%
// })
// %>
// 
// // convert -delay <%= delay%>  -morph <%=morph%>  1.miff <%= frames.map(i=>`1${i}section.miff`).join(' ')%> <%= frames.map(i=>`2${i}section.miff`).reverse().join(' ')%>  2.miff   <%= frames.map(i=>`2${i}section.miff`).join(' ')%> <%= frames.map(i=>`1${i}section.miff`).reverse().join(' ')%>  out1.gif
// 
// 
// // convert -delay <%= delay%>  -morph <%=morph%>  1.miff <%= frames.map(i=>`1${i}pasted.miff`).join(' ')%> -morph <%= morph*4%> 2.miff -morph <%=morph%>  <%= frames.map(i=>`2${i}pasted.miff`).join(' ')%> -morph <%= morph*4%> i.miff  2pastedOut.gif