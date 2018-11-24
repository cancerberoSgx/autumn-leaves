import * as React from "react"
import { ChangeEvent } from "react"
import { connect } from "react-redux"
import { selectImages, SelectImagesAction } from "src/store/actions"
import { ImageState, RootState } from "src/store/store"
import { style } from "typestyle"

​

export interface ImagesProps  {
  images: ImageState[]
  selectImages: (indexes: {[index: number]: boolean})=> SelectImagesAction
}
export interface ImagesStateR {
}

const styles = {
  image: style({
    maxWidth: "50%",
    maxHeight: "200px",
  }),
  root: style({
    overflow: "scroll"
  }),
}
export class ImagesComponent extends React.Component<ImagesProps, ImagesStateR> {

  state: ImagesStateR = {
  }

  constructor(props: ImagesProps, state: ImagesStateR) {
    super(props, state)
  }

  render(): React.ReactNode {
    return (
      <div className={styles.root} >
        {/* <ImageInput/> */}
        {/* <button onClick={()=>this.props.addImages([])}> add</button> */}
        {/* <ul>
          {this.props.images .map(i=><li>{i.name}</li>)}
        </ul> */}

         {/* <p>Here your will be your images, select a couple, or more to make a photo morph animation: </p> */}
            {this.props.images.map((image, i) =>
              <div  key={i}>
                <img className={styles.image} src={image.src}></img>
                <br />
                <input type="checkbox" checked={image.isSelected[i]} onChange={this.selectImage.bind(this)} data-image-index={i}></input>
                <a href={image.href} target="_blank" download={image.name}>{image.name}</a>
                <p>Size: {image.info.image.geometry.width}x{image.info.image.geometry.height}</p>
              </div>
            )}


      </div>
    )
  }

  selectImage(e: ChangeEvent<HTMLInputElement>) {
    const indexes = {}
    this.props.images.forEach((img, i)=>indexes[i] = parseInt(e.target.getAttribute("data-image-index"))===i ? e.target.checked : img.isSelected)
    this.props.selectImages(indexes)
    return indexes
    // Object.keys(this.props.images)
    // this.state.imagesSelected[e.target.getAttribute("data-image-index")] = e.target.checked
    // this.setState({ ...this.state })
  }
}

const mapStateToProps = (state: RootState) => {
  // debugger
  return {images: state.images}
}

export default connect(
  mapStateToProps,
  {selectImages
  }
)(ImagesComponent)
​
