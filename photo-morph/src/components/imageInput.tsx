import { FolderDropManagerEvent } from "folder-drop-manager"
import pFilter from "p-filter"
import pMap from "p-map"
import * as React from "react"
import { connect } from "react-redux"
import { addImages, AddImagesAction } from "src/store/actions"
import { ImageState } from "src/store/store"
import { getUniqueId } from "src/util/misc"
import { asOutputFile, buildImageSrc, buildInputFile, extractInfo, getInputFilesFromHtmlInputElement, isImage, MagickInputFile } from "wasm-imagemagick"
import { ImageDropper, ImageDropperFile } from "./imageDropper"

interface ImageInputProps {
  addImages: (images: ImageState[]) => AddImagesAction
}


class ImageInput extends React.Component<ImageInputProps, {}> {

  state:{}= {
  }

  constructor(props: ImageInputProps, state: {}) {
    super(props, state)
  }

  render(): React.ReactNode {
    return (
      <div  >
        <input type="file" onChange={this.imageFilesChange.bind(this)}></input>
        <ImageDropper onChange={this.imageDropperChange.bind(this)}>Drop here you images or folders</ImageDropper>
      </div>
    )
  }

  async imageFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = await getInputFilesFromHtmlInputElement(e.target)
    this.addImages(files)
  }

  async imageDropperChange(e: FolderDropManagerEvent & { files: ImageDropperFile[] }) {
    const files = await pMap(e.files, f => buildInputFile(f.content, f.fileName.substring(f.fileName.lastIndexOf("/"), f.fileName.length)))
    this.addImages(files)
  }

  async addImages(files: MagickInputFile[]): Promise<void> {
    const validImages = await pFilter(files, img => isImage(img))
    const images: ImageState[] = await pMap(validImages, async i => {
      const imageState: ImageState = {
        name: i.name,
        file: i,
        info: (await extractInfo(i))[0],
        isSelected: false,
        src: await buildImageSrc(i),
        href: URL.createObjectURL((await asOutputFile(i)).blob),
        id: getUniqueId()
      }
      return imageState
    })
    this.props.addImages(images)
  }
}

export default connect(null, { addImages })(ImageInput)


