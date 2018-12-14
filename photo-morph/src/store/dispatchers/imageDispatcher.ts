import pFilter from "p-filter"
import pMap from "p-map"
import { store } from "src"
import { ImageDropperFile } from "src/components/imageDropper"
import { getUniqueId } from "src/util/misc"
import { asOutputFile, buildImageSrc, buildInputFile, extractInfo, getInputFilesFromHtmlInputElement, isImage, isInputFile, MagickInputFile, execute, asInputFile } from "wasm-imagemagick"
import { addImages, changeStatus, selectMorph } from "../actions"
import { ImageState } from "../store"
import { extractInfoOne } from 'src/util/toCommitInWASMIM';

export async function addInputImages(e: HTMLInputElement | ImageDropperFile[] | MagickInputFile[] | undefined, urls?: string[]): Promise<void> {
  store.dispatch(changeStatus("loadingInputImages"))
  let files: MagickInputFile[]
  if (e === undefined) {
    return
  }
  else if (Array.isArray(e)) {
    if (e.length && isInputFile(e[0])) {
      files = e as MagickInputFile[]
    }
    else {
      files = await pMap(e as ImageDropperFile[], f => buildInputFile(f.content, f.fileName.substring(f.fileName.lastIndexOf("/") + 1, f.fileName.length)), {concurrency: 1})
    }
  }
  else {
    files = await getInputFilesFromHtmlInputElement(e as HTMLInputElement)
  }
  const validImages = await pFilter(files, img => isImage(img), {concurrency: 1})
  const fixedImages = await fixImageSizes(validImages)
  const images: ImageState[] = await pMap(fixedImages, async (file, i) => {
    const imageState: ImageState = {
      file,
      info: (await extractInfo(file))[0],
      isSelected: store.getState().images.filter(img => img.isSelected).length > 1 ? false : true,
      src: await buildImageSrc(file),
      href: URL.createObjectURL((await asOutputFile(file)).blob),
      id: getUniqueId(), 
      fromUrl: urls && urls[i]
    }
    return imageState
  }, {concurrency: 1})
  store.dispatch(changeStatus("idle"))
  store.dispatch(addImages(images))

  // we want to dispatch selectTempate too because some arguments editor might be showing options dependent on the input files (like font selectOne editor for textBanners)
  const selectedTemplate = store.getState().templates.find(t=>t.isSelected)
  if(selectedTemplate){
    store.dispatch(selectMorph(selectedTemplate.definition.id))
  }
}

export async function fixImageSizes(images: MagickInputFile[]) : Promise<MagickInputFile[]>{
  const fixedImages = await pMap(images, async image=>{
    const info = await extractInfoOne(image)
    if(info.image.format.toLowerCase()!=='ttf' && info.image.format.toLowerCase()!=='otf' && (info.image.geometry.height>500 || info.image.geometry.width>500)){
      const out = await execute({inputFiles: [image], commands: `convert ${image.name} -resize ${500}x${500} foo.${info.image.format.toLowerCase()}`})
      return await asInputFile(out.outputFiles[0])
    }
    return image
  }, {concurrency: 1})
  return fixedImages
}

export async function addMissingImagesFromUrlState(): Promise<void> {
  const state= store.getState()
  const fromUrls = state.images.map(i=>i.fromUrl)
  const notLoaded = state.urlState.selectedImageUrls.filter(url=>fromUrls.indexOf(url)===-1)
  const files = await pMap(notLoaded, url=>buildInputFile(url), {concurrency: 1})
  return await addInputImages(files, notLoaded)
}