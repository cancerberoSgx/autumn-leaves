import * as React from "react"
import { Responsive, WidthProvider } from "react-grid-layout"
import { style } from "typestyle"
import ImageInput from "../imageInput"
import Images from "../images"
import SelectMorph from "../selectMorph"
import { layouts } from "./layouts"
import "./react-grid-layout.css"
import "./react-resizable.css"

const ResponsiveReactGridLayout = WidthProvider(Responsive)
const originalLayouts = getFromLS("layouts") || layouts

export interface LayoutProps {
}
export interface LayoutState {
  layouts: any
}

const styles = {
  text: style({
    border: "2px solid green"
  }),
  header: style({
    textAlign: "center"
  }),
  headerTitle: style({
    fontSize: "1.4em"
  }),
  imageContainer: style({
    display: "inline"
  }),
}
export class Layout extends React.PureComponent<LayoutProps, LayoutState> {
  state: LayoutState = {
    layouts: JSON.parse(JSON.stringify(originalLayouts))
  }
  constructor(props) {
    super(props)
  }
  resetLayout() {
    this.setState({ layouts: {} })
  }
  onLayoutChange(layout, layouts) {
    saveToLS("layouts", layouts)
    this.setState({ layouts })
  }

  render() {
    return (
      <div>
        <button onClick={this.resetLayout.bind(this)}>Reset Layout</button>
        <ResponsiveReactGridLayout
          className="layout"
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={30}
          layouts={this.state.layouts}
          onLayoutChange={this.onLayoutChange.bind(this)}
        >
          <div key="1" className={styles.text} data-grid={{ w: 2, h: 3, x: 0, y: 0, minW: 2, minH: 3 }}>
            <header className={styles.header}>
              <h1 className={styles.headerTitle}>Welcome to Photo Morph</h1>
              <p>Create awesome photo morph animations</p>
            </header>
          </div>
          <div key="2" className={styles.text} data-grid={{ w: 2, h: 3, x: 2, y: 0, minW: 2, minH: 3 }}>
            <p className="App-intro">
              To get started, upload a couple of photos using the file choose or drag&drop some files from your desktop in the pink square:
        <ImageInput />
            </p>
          </div>
          <div key="3" className={styles.text} data-grid={{ w: 2, h: 3, x: 4, y: 0, minW: 2, minH: 3 }}>
            <p>Here your will be your images, select a couple, or more to make a photo morph animation: </p>
            <Images />
          </div>
          <div key="4" className={styles.text} data-grid={{ w: 2, h: 3, x: 6, y: 0, minW: 2, minH: 3 }}>
            <p>Select a Morph</p>
            <SelectMorph></SelectMorph>
          </div>
        </ResponsiveReactGridLayout>
      </div>
    )
  }
}

function getFromLS(key) {
  let ls = {}
  if (window.localStorage) {
    try {
      ls = JSON.parse(window.localStorage.getItem("rgl-8")) || {}
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key]
}

function saveToLS(key, value) {
  if (window.localStorage) {
    window.localStorage.setItem(
      "rgl-8",
      JSON.stringify({
        [key]: value
      })
    )
  }
}
