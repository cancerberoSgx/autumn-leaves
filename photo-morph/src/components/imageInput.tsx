import * as React from "react"
import { connect } from "react-redux"
import { addInputImages } from "src/store/dispatchers/imageDispatcher"
import { ImageState, RootState } from "src/store/store"
import { buildInputFile } from "wasm-imagemagick"
import { ImageDropper } from "./imageDropper"
import { AddUrlImageAction , addUrlImage, updateUrl, ActionTypes} from 'src/store/actions';
import { Action } from 'redux';

interface ImageInputProps {
  images: ImageState[], 
  addUrlImage: (url: string)=> AddUrlImageAction
  updateUrl: ()=>Action<ActionTypes.updateUrl> 
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
            <input type="url" id="loadUrl" placeholder="http://some/image.jpg" title="Tip: server must support CORS, for example: https://unsplash.com"></input>
            <button onClick={this.loadUrl.bind(this)}>Load</button>
          </p>
        </li>
      </ul>
    )
  }

  async loadUrl() {
    const url = document.querySelector<HTMLInputElement>("#loadUrl").value
    try {
      const img = await buildInputFile(url)
      await addInputImages([img], [url]) // TODO: pretty name 
    } catch (error) {
      alert("Error loading image: " + error + 'see browser console for more information')
    }
    this.props.addUrlImage(url)
    this.props.updateUrl()
  }
}

const mapStateToProps = (state: RootState) => ({
  images: state.images,
})

export default connect(mapStateToProps, {addUrlImage, updateUrl})(ImageInput)


