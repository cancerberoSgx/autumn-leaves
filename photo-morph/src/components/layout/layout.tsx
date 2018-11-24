import * as React from "react"
import { Responsive, WidthProvider } from "react-grid-layout"
import { connect } from "react-redux"
import { ImageState, RootState, Status } from "src/store/store"
import { getFromLS, saveToLS } from "src/util/misc"
import { style } from "typestyle"
import Image from "../Image"
import ImageInput from "../imageInput"
import Images from "../images"
import SelectMorph from "../selectMorph"
import { layouts } from "./layouts"
import "./react-grid-layout.css"
import "./react-resizable.css"

const ResponsiveReactGridLayout = WidthProvider(Responsive)
const originalLayouts = getFromLS("layouts") || layouts

export interface LayoutProps {
  outputImage: ImageState
  status: Status
}
export interface LayoutState {
  layouts: any
}

const styles = {
  text: style({
    border: "2px solid green",
    padding: "6px"
  }),
  header: style({
    textAlign: "center"
  }),
  headerTitle: style({
    fontSize: "1.4em"
  }),
  executing: style({
    color: "red", 
    fontSize: "1.2em",
    fontWeight: "bold"
  }),
}
class Layout extends React.PureComponent<LayoutProps, LayoutState> {
  state: LayoutState = {
    layouts: originalLayouts// JSON.parse(JSON.stringify(originalLayouts))
  }

  constructor(props) {
    super(props)
  }

  resetLayout() {
    saveToLS("layouts", layouts)
    this.setState({ layouts })
  }

  onLayoutChange(layout, layouts) {
    saveToLS("layouts", layouts)
    // console.log({layouts})
    this.setState({ layouts })
  }

  render() {
    return (
      <div>
        <ResponsiveReactGridLayout
          className="layout"
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={30}
          layouts={this.state.layouts}
          draggableCancel="input,textarea"
          onLayoutChange={this.onLayoutChange.bind(this)}
        >
          <div key="1" className={styles.text}  >
            <header className={styles.header}>
              <h1 className={styles.headerTitle}>Welcome to Photo Morph</h1>
              <p>Create awesome photo morph animations</p>
            </header>
            <p>Options:
        <button onClick={this.resetLayout.bind(this)}>Reset Layout</button>
            </p>
            <p>
              Status: <span className={this.props.status==="executing" ? styles.executing : ""}>{this.props.status}</span>
            </p>
          </div>
          <div key="2" className={styles.text} >
            <p className="App-intro">
              To get started, upload a couple of photos using the file choose or drag&drop some files from your desktop in the pink square:
              <ImageInput />
            </p>
          </div>
          <div key="3" className={styles.text}>
            <Images />
          </div>
          <div key="4" className={styles.text}>
            <SelectMorph />
          </div>
          <div key="5" className={styles.text} >
            {this.props.outputImage ? <Image image={this.props.outputImage} dontShowSelectBox={true}/> : ""}
          </div>
        </ResponsiveReactGridLayout>
      </div>
    )
  }
}


const mapStateToProps = (state: RootState) => ({
  outputImage: state.outputImage,
  status: state.status
})

export default connect(mapStateToProps, {})(Layout)
