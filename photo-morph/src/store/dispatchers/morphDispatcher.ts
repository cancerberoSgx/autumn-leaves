import { store } from "src"
import { CommonArguments, Morph } from "src/model/morphs"
import { changeStatus, setOutputImage } from "src/store/actions"
import { getUniqueId } from "src/util/misc"
import { extractInfoOne } from "src/util/toCommitInWASMIM"
import { asInputFile, buildImageSrc, execute, getFileNameExtension, MagickOutputFile } from "wasm-imagemagick"

export async function executeMorph(): Promise<void> {
  const selectedImages = store. getState().images.filter(img => img.isSelected)
  if(selectedImages.length<2){
    return // TODO: error
  }
  store.dispatch(changeStatus("executing"))
  const morph = store. getState().morphs.find(m => m.isSelected)
  // const morph = morphs[store. getState().morphs.map((m, i) => m.isSelected ? i : -1).filter(i => i !== -1)[0]]
  const inputFiles = selectedImages.map(i => i.file)
  let file: MagickOutputFile
  if(morph.definition.command) {

  // resize the images so they have same dimensions. TODO: move this to the morph command itself
  const newSize = `${selectedImages[0].info.image.geometry.width}x${selectedImages[0].info.image.geometry.height}`
  const extension = getFileNameExtension(inputFiles[1].name)
  const resizeCommands = `convert ${inputFiles[1].name} -resize ${newSize}> -size ${newSize} xc:white +swap -gravity center -composite newImage.${extension}`
  const resizeResult = await execute({ inputFiles, commands: resizeCommands })
  inputFiles[1] = await asInputFile(resizeResult.outputFiles[0])

  const commands = morph.definition.command.replace("$$IMAGES", inputFiles.map(f => f.name).join(" "))
  const result = await execute({ inputFiles, commands })
  file = result.outputFiles[0]

  }
  else if(morph.definition.template){
    const outputFiles = await morph.definition.template({arguments:morph.value, inputFiles: selectedImages})
    file = outputFiles[0]
  }

  const outputImage = {
    file: await asInputFile(file),
    href: URL.createObjectURL(file.blob),
    info: await extractInfoOne(file),
    isSelected: false,
    src: await buildImageSrc(file),
    id: getUniqueId()
  }
  store.dispatch(changeStatus("idle"))
  store.dispatch(setOutputImage(outputImage))
}

export function getDefaultArguments(m: Morph): CommonArguments{
  const r = {}
  m.arguments.forEach(a=>r[a.id]=a.defaultValue)
  return {frames: 6, loop: 0, ...r, imageWidth: 0, imageHeight: 0}
}