import * as React from "react"
import { connect } from "react-redux"
import { ImageState, RootState, Status } from "src/store/store"
import { style } from "typestyle"
import Image from "./Image"
import { addMissingImagesFromUrlState } from 'src/store/dispatchers/imageDispatcher';

export interface ImagesProps {
  images: ImageState[]
  // selectedImageUrls: string[]
  status: Status
}

const styles = {
  root: style({
    overflowY: "scroll",
    height: '100%'
  //   '-webkit-overflow-scrolling': 'touch'
  }),
  loading: style({
    display: "block"
  }),
  notLoading: style({
    display: "none"
  }),
  imageItem: style({
    display: "inline-block", 
    maxWidth: '40%'
  }),
  inner: style({
    // height: 'calc(100% + 1px)'
  }),
}

export class ImagesComponent extends React.Component<ImagesProps, {}> {

  state: {} = {}

  constructor(props: ImagesProps, state: {}) {
    super(props, state)
  }

  render(): React.ReactNode {
    return (
      <div className={styles.root} >
      Make sure the images you want to morph are selected:
        <p className={this.props.status==="loadingInputImages" ? styles.loading : styles.notLoading}>Loading images, please wait...</p>
        <ul className={styles.inner}>
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
  return { 
    images: state.images, 
    status: state.status , 
    // selectedImageUrls: state.urlState.selectedImageUrls
  }
}

export default connect(  mapStateToProps)(ImagesComponent)

