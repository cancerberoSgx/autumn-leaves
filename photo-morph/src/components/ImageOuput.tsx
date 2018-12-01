import * as React from "react"
import { connect } from "react-redux"
import { ImageState, RootState, Status } from "src/store/store"
import { style } from "typestyle"
import Image from "./Image"

interface ImageOutputProps {
  outputImage: ImageState
  status: Status
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
        {this.props.outputImage ? <Image image={this.props.outputImage} dontShowSelectBox={true} /> : ""}
      </div>
    )
  }

}

const mapStateToProps = (state: RootState) => ({
  outputImage: state.outputImage,
  status: state.status
})

export default connect(mapStateToProps, {  })(ImageOutput)


