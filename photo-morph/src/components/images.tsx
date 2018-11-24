import * as React from "react"
import { ImagesState, ImageState, RootState } from "src/store/store"


export interface ImagesProps  {
  images: ImageState[]
  addImages: (images: string[])=>void
}
export interface ImagesStateR {
}

export class ImagesComponent extends React.Component<ImagesProps, ImagesStateR> {

  state: ImagesStateR = {
    // toggle: true
  }

  constructor(props: ImagesProps, state: ImagesStateR) {
    super(props, state)
  }

  render(): React.ReactNode {
    // debugger
    return (
      <div  >
        <button onClick={()=>this.props.addImages(["foo.png"])}> add</button>
        <ul>
          {this.props.images .map(i=><li>{i.name}</li>)}
        </ul>
      </div>
    )
  }
}
const mapStateToProps = (state: RootState) => {
  return {
    images: state.images.images
  }
}
import { connect } from "react-redux"
import { addImages } from "src/store/actions"
​
export default connect(
  mapStateToProps,
  {addImages}
)(ImagesComponent)
​
