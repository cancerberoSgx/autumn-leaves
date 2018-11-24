import * as React from "react"
import { connect } from "react-redux"
import { ImageState, RootState } from "src/store/store"
import { style } from "typestyle"
import Image from "./Image"

export interface ImagesProps {
  images: ImageState[]
}

const styles = {
  root: style({
    overflow: "scroll",
    height: "100%"
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
      <div className={styles.root} >
        <p>Here your will be your images, select a couple, or more to make a photo morph animation: </p>
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
  return { images: state.images }
}

export default connect(  mapStateToProps, {  })(ImagesComponent)

