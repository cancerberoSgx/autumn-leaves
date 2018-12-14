import { store } from "src"
import { MorphCommonArgumentValues, MagickTemplate } from "src/model/MagickTemplate";
import { changeStatus, setOutputImage } from "src/store/actions"
import { getUniqueId } from "src/util/misc"
import { extractInfoOne } from "src/util/toCommitInWASMIM"
import { asInputFile, buildImageSrc } from "wasm-imagemagick"

export async function executeMorph(): Promise<void> {
  const selectedImages = store.getState().images.filter(img => img.isSelected)
  if (selectedImages.length < 2) {
    return // TODO: error
  }
  store.dispatch(changeStatus("executing"))
  const morph = store.getState().templates.find(m => m.isSelected)
  const result = await morph.definition.template({ arguments: morph.value, inputFiles: selectedImages })
  if (result.exitCode !== 0) {
    alert("ERROR: " + result.stderr.join("\n"))
    store.dispatch(changeStatus("idle"))
    return
  }
  const file = result.outputFiles[result.outputFiles.length - 1]
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

export function getDefaultArguments(m: MagickTemplate): MorphCommonArgumentValues {
  const r = {}
  m.arguments.filter(a => a).forEach(a => r[a.id] = a.defaultValue)
  return { frames: 6, loop: 0, ...r, imageWidth: 0, imageHeight: 0 }
}
