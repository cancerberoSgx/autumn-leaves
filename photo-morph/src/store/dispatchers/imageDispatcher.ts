import pFilter from "p-filter"
import pMap from "p-map"
import { store } from "src"
import { ImageDropperFile } from "src/components/imageDropper"
import { getUniqueId } from "src/util/misc"
import { asOutputFile, buildImageSrc, buildInputFile, extractInfo, getInputFilesFromHtmlInputElement, isImage, isInputFile, MagickInputFile } from "wasm-imagemagick"
import { addImages, changeStatus } from "../actions"
import { ImageState } from "../store"

export async function addInputImages(e: HTMLInputElement | ImageDropperFile[] | MagickInputFile[] | undefined): Promise<void> {
  store.dispatch(changeStatus("loadingInputImages"))
  let files: MagickInputFile[]
  if (e === undefined) {
    return
  }
  else if (Array.isArray(e)) {
    if (isInputFile(e[0])) {
      files = e as MagickInputFile[]
    }
    else {
      files = await pMap(e as ImageDropperFile[], f => buildInputFile(f.content, f.fileName.substring(f.fileName.lastIndexOf("/") + 1, f.fileName.length)))
    }
  }
  else {
    files = await getInputFilesFromHtmlInputElement(e as HTMLInputElement)
  }
  const validImages = await pFilter(files, img => isImage(img))
  const images: ImageState[] = await pMap(validImages, async file => {
    const imageState: ImageState = {
      file,
      info: (await extractInfo(file))[0],
      isSelected: store.getState().images.filter(img => img.isSelected).length > 1 ? false : true,
      src: await buildImageSrc(file),
      href: URL.createObjectURL((await asOutputFile(file)).blob),
      id: getUniqueId()
    }
    return imageState
  })
  store.dispatch(changeStatus("idle"))
  store.dispatch(addImages(images))
}