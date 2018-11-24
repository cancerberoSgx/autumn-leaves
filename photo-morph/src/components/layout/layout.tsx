import * as React from "react"
import { Responsive, WidthProvider } from "react-grid-layout"
import { style } from "typestyle"
import App from "../App"
import { ImageDropper } from "../imageDropper"
import { morphs } from "../../model/morphs"
import { layouts } from "./layouts"
import "./react-grid-layout.css"
import "./react-resizable.css"


const ResponsiveReactGridLayout = WidthProvider(Responsive)
const originalLayouts = getFromLS("layouts") || layouts

export interface LayoutProps {
  app: App
}
export interface LayoutState {
  layouts: any
}

const styles = {
  text: style({
    border: "2px solid green"
  }), image: style({
    maxWidth: "50%",
    maxHeight: "200px",
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
export class ResponsiveLocalStorageLayout extends React.PureComponent<LayoutProps, LayoutState> {
  state: LayoutState = {
    layouts: JSON.parse(JSON.stringify(originalLayouts))
  }
  constructor(props) {
    super(props)
  }
  // static get defaultProps() {
  //   return {
  //     className: "layout",
  //     cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  //     rowHeight: 30
  //   }
  // }
  resetLayout() {
    this.setState({ layouts: {} })
  }
  onLayoutChange(layout, layouts) {
    console.log(layout, layouts)

    saveToLS("layouts", layouts)
    this.setState({ layouts })
  }

  render() {
    return (
      <div>
        <button onClick={this.resetLayout.bind(this.props.app)}>Reset Layout</button>
        <ResponsiveReactGridLayout
          className="layout"
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={30}
          layouts={this.state.layouts}
          onLayoutChange={this.onLayoutChange.bind(this.props.app)}
        >
          <div key="1" className={styles.text} data-grid={{ w: 2, h: 3, x: 0, y: 0, minW: 2, minH: 3 }}>
            <header className={styles.header}>
              {/* <img src={logo} className="App-logo" alt="logo" /> */}
              <h1 className={styles.headerTitle}>Welcome to Photo Morph</h1>
              <p>Create awesome photo morph animations</p>
            </header>
          </div>
          <div key="2" className={styles.text} data-grid={{ w: 2, h: 3, x: 2, y: 0, minW: 2, minH: 3 }}>
            <p className="App-intro">
              To get started, upload a couple of photos using the file choose or drag&drop some files from your desktop in the pink square:
        </p>
            <input type="file" onChange={this.props.app.imageFilesChange.bind(this.props.app)}></input>
            <ImageDropper onChange={this.props.app.imageDropperChange.bind(this.props.app)}>Drop here you images or folders</ImageDropper>
          </div>
          <div key="3" className={styles.text} data-grid={{ w: 2, h: 3, x: 4, y: 0, minW: 2, minH: 3 }}>
            <p>Here your will be your images, select a couple, or more to make a photo morph animation: </p>
            {this.props.app.state.imagesSrc.map((src, i) =>
              <div className={styles.imageContainer} key={i}>
                <img className={styles.image} src={src}></img>
                <br />
                <input type="checkbox" checked={this.props.app.state.imagesSelected[i]} onChange={this.props.app.imageSelected.bind(this.props.app)} data-image-index={i}></input>
                <a href={this.props.app.state.imagesUrls[i]} target="_blank">{this.props.app.state.images[i].name}</a>
                <p>Size: {this.props.app.state.imagesInfo[i].image.geometry.width}x{this.props.app.state.imagesInfo[i].image.geometry.height}</p>
              </div>
            )}
          </div>
          <div key="4" className={styles.text} data-grid={{ w: 2, h: 3, x: 6, y: 0, minW: 2, minH: 3 }}>
            <p>Select a Morph</p>
            <select onChange={this.props.app.morphSelected.bind(this.props.app)}>
              {morphs.map(m => <option>{m.name}</option>)}
            </select>
            <p><strong>{morphs[this.props.app.state.morphSelectedIndex].name}</strong>{morphs[this.props.app.state.morphSelectedIndex].description}</p>
            <br />
            <img id="morphImage"></img>
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

// if (require.main === module) {
//   require("../test-hook.jsx")(module.exports);
// }