import * as React from "react";
import { connect } from "react-redux";
import Modal from "react-responsive-modal";
import { RootState, UIState } from "src/store/store";
import { SetUIStateAction, setUIState } from 'src/store/actions/ui';
import { saveToLS } from 'src/util/misc';
import { layouts } from './layouts';
import { style } from 'typestyle';
import HelpModal from './HelpModal';
import { translate } from 'src/intl/intl';

interface OptionsComponentProps {
  setUIState: (ui: Partial<UIState>) => SetUIStateAction
  ui: UIState
}

const styles = {
 option: style({
   display: 'inline-block', 
   marginRight: '4px'
 }),
 options: style({
   padding: 0
 })
}
class OptionsComponent extends React.Component<OptionsComponentProps, {}> {

  constructor(props: OptionsComponentProps, state: {}) {
    super(props, state)
  }

  render(): React.ReactNode {
    return (
      <div >
        <ul className={styles.options}>
          <li className={styles.option}>
            <label>
        <input type="checkbox" checked={this.props.ui.layoutLocked} onChange={e => this.props.setUIState({ layoutLocked: e.target.checked })} />
        {translate('lock-layout')}
        </label>
          </li>
          <li className={styles.option}>
          <button onClick={e => {
            saveToLS("layouts", layouts)
            this.props.setUIState({ layouts })
          }}>Reset layout</button>
          </li>
          <li className={styles.option}>
            <button onClick={e => this.props.setUIState({ helpModalOpen: true })}>Help</button>
            </li>
            {/* <li><select onChange={}>Language</select></li> */}
        </ul>
        <HelpModal/>

      </div>
    )
  }
}

const mapStateToProps = (state: RootState) => ({
  ui: state.uiState
})

export default connect(mapStateToProps, { setUIState })(OptionsComponent)


