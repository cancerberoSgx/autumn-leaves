import { store } from "src"
import { morphs } from "src/model/morphs"
import { changeStatus, setOutputImage } from "src/store/actions"
import { getUniqueId } from "src/util/misc"
import { asInputFile, asOutputFile, buildImageSrc, execute, extractInfo, getFileNameExtension } from "wasm-imagemagick"

export async function executeMorph(): Promise<void> {
  store.dispatch(changeStatus("executing"))
  const morph = morphs[store. getState().morphs.map((m, i) => m.isSelected ? i : -1).filter(i => i !== -1)[0]]
  const selectedImages = store. getState().images.filter(img => img.isSelected)
  const inputFiles = selectedImages.map(i => i.file)

  // resize the images so they have same dimensions. TODO: move this to the morph command itself
  const newSize = `${selectedImages[0].info.image.geometry.width}x${selectedImages[0].info.image.geometry.height}`
  const extension = getFileNameExtension(inputFiles[1].name)
  const resizeCommands = `convert ${inputFiles[1].name} -resize ${newSize}> -size ${newSize} xc:white +swap -gravity center -composite newImage.${extension}`
  const resizeResult = await execute({ inputFiles, commands: resizeCommands })
  inputFiles[1] = await asInputFile(resizeResult.outputFiles[0])

  const commands = morph.command.replace("$$IMAGES", inputFiles.map(f => f.name).join(" "))
  const result = await execute({ inputFiles, commands })
  const file = result.outputFiles[0]
  store.dispatch(changeStatus("idle"))
  store.dispatch(setOutputImage({
    file: await asInputFile(file),
    href: URL.createObjectURL((await asOutputFile(file)).blob),
    info: (await extractInfo(file))[0],
    isSelected: false,
    src: await buildImageSrc(file),
    id: getUniqueId()
  }))


}