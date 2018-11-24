import { FolderDropManagerEvent } from "folder-drop-manager"
import pMap from "p-map"
import * as React from "react"
import { connect } from "react-redux"
import { addImages, AddImagesAction } from "src/store/actions"
import { addInputImages } from "src/store/dispatchers/imageDispatcher"
import { ImageState, RootState } from "src/store/store"
import { buildInputFile, getInputFilesFromHtmlInputElement } from "wasm-imagemagick"
import { ImageDropper, ImageDropperFile } from "./imageDropper"

interface ImageInputProps {
  // addImages: (images: ImageState[]) => AddImagesAction,
  images: ImageState[]
}

class ImageInput extends React.Component<ImageInputProps, {}> {

  state:{}= { }

  constructor(props: ImageInputProps, state: {}) {
    super(props, state)
  }

  render(): React.ReactNode {
    return (
      <div  >
        <input type="file" onChange={e=>addInputImages(e.target)}></input>
        <ImageDropper onChange={e=>addInputImages(e.files)}>Drop here you images or folders</ImageDropper>
      </div>
    )
  }

  // async imageFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
  //   const files = await getInputFilesFromHtmlInputElement(e.target)
  //   addInputImages(e.target.files)
  // }

  // async imageDropperChange(e: FolderDropManagerEvent & { files: ImageDropperFile[] }) {
  //   addInputImages(e.files)
  // }

}

const mapStateToProps = (state: RootState) => ({
  images: state.images,
})

export default connect(mapStateToProps, {  })(ImageInput)


