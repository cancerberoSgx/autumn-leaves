import { store } from "src"
import { forceSameSize } from "src/model/morphs"
import { CommonArguments, Morph } from "src/model/morphTypes"
import { changeStatus, setOutputImage } from "src/store/actions"
import { getUniqueId } from "src/util/misc"
import { extractInfoOne } from "src/util/toCommitInWASMIM"
import { asInputFile, buildImageSrc, execute, MagickOutputFile } from "wasm-imagemagick"

export async function executeMorph(): Promise<void> {
  const selectedImages = store. getState().images.filter(img => img.isSelected)
  if(selectedImages.length<2){
    return // TODO: error
  }
  store.dispatch(changeStatus("executing"))
  const morph = store. getState().morphs.find(m => m.isSelected)
  let file: MagickOutputFile
  if(morph.definition.command) {
    const inputFiles = await forceSameSize({inputFiles: store.getState().images, backgroundColor: morph.value.backgroundColor ? morph.value.backgroundColor + "" : "white"})
    const commands = morph.definition.command.replace("$$IMAGES", inputFiles.map(f => f.name).join(" "))
    const result = await execute({ inputFiles, commands })
    file = result.outputFiles[result.outputFiles.length-1]
  }
  else if(morph.definition.template){
    const outputFiles = await morph.definition.template({arguments:morph.value, inputFiles: selectedImages})
    file = outputFiles[outputFiles.length-1]
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
  m.arguments.filter(a=>a).forEach(a=>r[a.id]=a.defaultValue)
  return {frames: 6, loop: 0, ...r, imageWidth: 0, imageHeight: 0}
}
