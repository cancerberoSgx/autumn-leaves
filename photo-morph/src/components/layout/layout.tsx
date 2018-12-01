import * as React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { connect } from "react-redux";
import { RootState, Status } from "src/store/store";
import { getFromLS, saveToLS } from "src/util/misc";
import { style } from "typestyle";
import ForkRibbon from "../forkRibbon";
import ImageInput from "../imageInput";
import ImageOuput from "../ImageOuput";
import Images from "../images";
import SelectMorph from "../selectMorph";
import { layouts } from "./layouts";
import Options from "./Options";
import "./react-grid-layout.css";
import "./react-resizable.css";

const ResponsiveReactGridLayout = WidthProvider(Responsive)
const originalLayouts = getFromLS("layouts") || layouts

export interface LayoutProps {
  status: Status
}
export interface LayoutState {
  layouts: any
}

const styles = {
  layoutBox: style({
    background: "#99bbaa",
    border: "2px solid green",
    borderRadius: "5px"
  }),
  layout: style({
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
    layouts: originalLayouts
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
    console.log({ layouts })
    this.setState({ layouts })
  }

  render() {
    return (
      <div>
        <ResponsiveReactGridLayout
          className={styles.layout}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={30}
          layouts={this.state.layouts}
          draggableCancel="input,textarea"
          autoSize={true}
          verticalCompact={true}
          containerPadding={[10, 20]}
          onLayoutChange={this.onLayoutChange.bind(this)}
        >
          <div key="1" className={styles.layoutBox}  >
            <header className={styles.header}>
              <h1 className={styles.headerTitle}>Welcome to Photo Morph</h1>
              <p>Create awesome photo morph animations</p>
            </header>
            <Options   resetLayout={this.resetLayout.bind(this)} />
            <p>
              Status: <span className={this.props.status === "executing" ? styles.executing : ""}>{this.props.status}</span>
            </p>
          </div>
          <div key="2" className={styles.layoutBox} >
            <p className="App-intro">
              <h3>Load some images</h3>
              To get started, upload a couple of images to morph:
              <ImageInput />
            </p>
          </div>
          <div key="3" className={styles.layoutBox}>
            <h3>Your input images</h3>
            <Images />
          </div>
          <div key="4" className={styles.layoutBox}>
            <h3>Select a morph transformation</h3>
            <SelectMorph />
          </div>
          <div key="5" className={styles.layoutBox} >
            <h3>Output images:</h3>
            <ImageOuput />
          </div>
        </ResponsiveReactGridLayout>
        <ForkRibbon />
      </div>
    )
  }
}


const mapStateToProps = (state: RootState) => ({
  status: state.status
})

export default connect(mapStateToProps, {})(Layout)
