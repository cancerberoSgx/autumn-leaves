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
  dontShowSelectBox?: boolean
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
        {this.props.dontShowSelectBox ? "" : <div><input type="checkbox" checked={this.props.image.isSelected} onChange={this.selectImage.bind(this)} ></input></div>}
        <a href={this.props.image.href} target="_blank" download={this.props.image.file.name}>{this.props.image.file.name}</a><br />
        <span>Size: {this.props.image.info.image.geometry.width}x{this.props.image.info.image.geometry.height}</span>
      </span>
    )
  }

  selectImage(e: ChangeEvent<HTMLInputElement>) {
    const indexes = {}
    this.props.images.forEach((img, i) => indexes[i] = this.props.image.id === img.id ? e.target.checked : img.isSelected)
    this.props.selectImages(indexes)
  }
}

const mapStateToProps = (state: RootState) => {
  return { images: state.images }
}

export default connect(  mapStateToProps,  { selectImages })(ImageComponent)

