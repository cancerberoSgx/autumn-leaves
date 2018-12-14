import * as React from "react"
import { connect } from "react-redux"
import { ImageState, RootState, Status } from "src/store/store"
import { style } from "typestyle"
import Image from "./Image"
import { addInputImages } from 'src/store/dispatchers/imageDispatcher';
import { addImages, AddImagesAction } from 'src/store/actions';

interface ImageOutputProps {
  outputImage: ImageState
  status: Status
  addImages: (files: ImageState[])=> AddImagesAction
}

const styles = {
  loading: style({
    display: "block"
  }),
  notLoading: style({
    display: "none"
  }),
}

class ImageOutput extends React.Component<ImageOutputProps, {}> {

  state:{}= { }

  constructor(props: ImageOutputProps, state: {}) {
    super(props, state)
  }

  render(): React.ReactNode {
    return (
      <div  >
        <p className={this.props.status==="executing" ? styles.loading : styles.notLoading}>Executing, please wait...</p>
        {this.props.outputImage ? <div>
          <Image image={this.props.outputImage} dontShowSelectBox={true} />
          <br/>
          <button onClick={this.moveToInputImages.bind(this)}>Move to input images list</button>
        </div> : ""}
      </div>
    )
  }

  moveToInputImages(){
    this.props.addImages([this.props.outputImage])
  }
}

const mapStateToProps = (state: RootState) => ({
  outputImage: state.outputImage,
  status: state.status
})

export default connect(mapStateToProps, { addImages })(ImageOutput)


