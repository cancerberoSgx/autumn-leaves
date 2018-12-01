import * as React from "react";
import { connect } from "react-redux";
import Modal from "react-responsive-modal";
import { RootState, UIState } from "src/store/store";
import { SetUIStateAction, setUIState } from 'src/store/actions/ui';

interface OptionsComponentProps {
  setUIState: (ui: Partial<UIState>)=>SetUIStateAction
  resetLayout: () => void
  ui: UIState
}

interface OptionsComponentState {
  // helpModalOpen: boolean
}

class OptionsComponent extends React.Component<OptionsComponentProps, OptionsComponentState> {

  state: OptionsComponentState = {
    // helpModalOpen: false
  }
  constructor(props: OptionsComponentProps, state: {}) {
    super(props, state)
  }

  render(): React.ReactNode {
    return (
      <div >
        Options: 
        <button onClick={e=>this.props.setUIState({layoutLocked: true})}>Lock layout</button>
        <button onClick={this.props.resetLayout}>Reset layout</button>
        <button onClick={e => this.props.setUIState({helpModalOpen: true})}>Help</button>
        <Modal open={this.props.ui.helpModalOpen} onClose={() => this.props.setUIState({helpModalOpen: false})} center>
          <h2>Photo Morph</h2>
          <p>
            Welcome to Photo Morph editor. Here you can load some pictures from your computer or from internet, select two or more that you want to transform, then select a Morph and after a few seconds the transformation will be applied and you can download the result image. 
          </p>
          <p>
            Morphs will create an animation that simulates morphing from one image to another. In general morphs will take the first selected images, but some of them, like "tile 4 directions" morph support more than two input images. 
          </p>
          <p>
            <strong>IMPORTANT</strong>: As this program runs 100% in the browser, keep in mind that some transformations could take several seconds, particularly if you upload big images. 
          </p>
          <p>
            Also, each time you apply a morph, this will be reflected on the URL, so you can just copy the address and share it with your friends (and me!) in case you discover a cool morph configuration so they cal also apply it to their photos.
          </p>
          <p>
            Last, this page will let you reorder its layout, just drag and drop the boxes as you like. Also you can resize them using the control at the bottom right corner. It will remember the positions next time you enter. Also you have the possibility to disable this functionality using "lockLayout" button. 
          </p>
          <p>
            Enjoy!
          </p>
        </Modal>

      </div>
    )
  }
}

const mapStateToProps = (state: RootState) => ({
  ui: state.uiState
})

export default connect(mapStateToProps, { setUIState })(OptionsComponent)


