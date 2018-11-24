import * as React from "react"
import { ChangeEvent } from "react"
import { connect } from "react-redux"
import { selectImages, SelectImagesAction } from "src/store/actions"
import { ImageState, RootState } from "src/store/store"
import { style } from "typestyle"

export interface ImageProps {
  images: ImageState[]
  image: ImageState
  selectImages: (indexes: { [index: number]: boolean }) => SelectImagesAction
}

const styles = {
  image: style({
    maxWidth: "50%",
    maxHeight: "200px",
  }),
}
export class ImageComponent extends React.Component<ImageProps, {}> {

  state: {} = {  }

  constructor(props: ImageProps, state: {}) {
    super(props, state)
  }

  render(): React.ReactNode {
    return (
      <span>
        <img className={styles.image} src={this.props.image.src}></img>
        <br />
        <input type="checkbox" checked={this.props.image.isSelected} onChange={this.selectImage.bind(this)} data-image-index={this.props.image.id}></input><br />
        <a href={this.props.image.href} target="_blank" download={this.props.image.name}>{this.props.image.name}</a><br />
        <span>Size: {this.props.image.info.image.geometry.width}x{this.props.image.info.image.geometry.height}</span>
      </span>
    )
  }

  selectImage(e: ChangeEvent<HTMLInputElement>) {
    const indexes = {}
    this.props.images.forEach((img, i) => indexes[i] = parseInt(e.target.getAttribute("data-image-index"), 10) === i ? e.target.checked : img.isSelected)
    this.props.selectImages(indexes)
  }
}

const mapStateToProps = (state: RootState) => {
  return { images: state.images }
}

export default connect(  mapStateToProps,  { selectImages })(ImageComponent)

