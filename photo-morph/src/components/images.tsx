import * as React from "react"
import { connect } from "react-redux"
import { ImageState, RootState, Status } from "src/store/store"
import { style } from "typestyle"
import Image from "./Image"

export interface ImagesProps {
  images: ImageState[]
  status: Status
}

const styles = {
  root: style({
    overflow: "scroll",
  }),
  loading: style({
    display: "block"
  }),
  notLoading: style({
    display: "none"
  }),
  imageItem: style({
    display: "inline-block"
  }),
}

export class ImagesComponent extends React.Component<ImagesProps, {}> {

  state: {} = {}

  constructor(props: ImagesProps, state: {}) {
    super(props, state)
  }

  render(): React.ReactNode {
    return (
      <div className={`${styles.root}`} >
      Make sure the images you want to morph are selected:
        <p className={this.props.status==="loadingInputImages" ? styles.loading : styles.notLoading}>Loading images, please wait...</p>
        <ul>
          {this.props.images.map((image, i) =>
            <li className={styles.imageItem} key={i}>
              <Image image={image} ></Image>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state: RootState) => {
  return { images: state.images, status: state.status }
}

export default connect(  mapStateToProps)(ImagesComponent)

