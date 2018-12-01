import * as React from "react"
import { connect } from "react-redux"
import { addInputImages } from "src/store/dispatchers/imageDispatcher"
import { ImageState, RootState } from "src/store/store"
import { buildInputFile } from "wasm-imagemagick"
import { ImageDropper } from "./imageDropper"

interface ImageInputProps {
  images: ImageState[]
}

class ImageInput extends React.Component<ImageInputProps, {}> {

  state: {} = {}

  constructor(props: ImageInputProps, state: {}) {
    super(props, state)
  }

  render(): React.ReactNode {
    return (
      <ul  >
        <li>
          <p>
            <input type="file" onChange={e => addInputImages(e.target)}></input>
          </p>
        </li>
        <li>
          <ImageDropper onChange={e => addInputImages(e.files)}>Drop here you images or folders</ImageDropper>
        </li>
        <li>
          <p>
            <input type="url" id="loadUrl" placeholder="http://some/image.jpg"></input>
            <button onClick={this.loadUrl.bind(this)}>Load</button>
          </p>
        </li>
      </ul>
    )
  }

  async loadUrl() {
    const url = document.querySelector<HTMLInputElement>("#loadUrl").value
    addInputImages([await buildInputFile(url)]) // TODO: pretty name    
  }
}


const mapStateToProps = (state: RootState) => ({
  images: state.images,
})

export default connect(mapStateToProps, {})(ImageInput)


