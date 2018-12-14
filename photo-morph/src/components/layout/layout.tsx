import * as React from "react"
import { Responsive, WidthProvider } from "react-grid-layout"
import { connect } from "react-redux"
import { setUIState, SetUIStateAction } from "src/store/actions/ui"
import { RootState, Status, UIState } from "src/store/store"
import { saveToLS } from "src/util/misc"
import { style } from "typestyle"
import ForkRibbon from "../forkRibbon"
import ImageInput from "../imageInput"
import ImageOuput from "../ImageOuput"
import Images from "../images"
import Options from "./Options"
import "./react-grid-layout.css"
import "./react-resizable.css"
import SelectTemplate from '../SelectTemplate';
import SelectTemplateType from '../SelectTemplateType';

const ResponsiveReactGridLayout = WidthProvider(Responsive)

export interface LayoutProps {
  status: Status
  ui: UIState
  setUIState: (ui: Partial<UIState>)=>SetUIStateAction
}

const styles = {
  layoutBox: style({
    background: "#99bbaa",
    border: "2px solid green",
    borderRadius: "5px"
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

class Layout extends React.PureComponent<LayoutProps, {}> {

  constructor(props) {
    super(props)
  }

  onLayoutChange(layout, layouts) {
    saveToLS("layouts", layouts)
    console.log({ layouts })
    this.props.setUIState({layouts})
  }

  render() {
    return (
      <div>
        <ResponsiveReactGridLayout
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={30}
          layouts={this.props.ui.layouts}
          breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 320}}
          draggableCancel="input,textarea"
          autoSize={true}
          verticalCompact={true}
          // containerPadding={[10, 20]}
          onLayoutChange={this.onLayoutChange.bind(this)}
          isDraggable={!this.props.ui.layoutLocked}
          isResizable={!this.props.ui.layoutLocked}
        >
          <div key="1" className={styles.layoutBox}  >
            <header className={styles.header}>
              <h1 className={styles.headerTitle}>Welcome to Photo Morph</h1>
              <p>Create awesome photo morph animations</p>
            </header>

        <h3>Filter by kind of magic</h3>
        <SelectTemplateType />
        <h3>Options: </h3>
            <Options />
            <p>
              Status: <span className={this.props.status === "executing" ? styles.executing : ""}>{this.props.status}</span>
            </p>
          </div>
          <div key="2" className={styles.layoutBox} >
            <p className="App-intro">
              <h3>Load some images</h3>
              <ImageInput />
            </p>
          </div>
          <div key="3" className={styles.layoutBox}>
            <h3>Your input images</h3>
            <Images />
          </div>
          <div key="4" className={styles.layoutBox}>
            <SelectTemplate />
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
  status: state.status,
  ui: state.uiState
})

export default connect(mapStateToProps, {setUIState})(Layout)
