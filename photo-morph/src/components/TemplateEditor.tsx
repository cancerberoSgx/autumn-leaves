import { ArgumentChangeEvent, Argument } from "imagemagick-browser"
import * as React from "react"
import { buildArgumentEditor } from "react-imagemagick"
import { connect } from "react-redux"
import { Action } from "redux"
import { ActionTypes, updateUrl} from "src/store/actions"
import { executeMorph } from "src/store/dispatchers/morphDispatcher"
import { TemplateState, RootState, UIState } from "src/store/store"
import { changeMorphArgument, ChangeMorphArgumentAction } from "../store/actions/templates"
import { SetUIStateAction, setUIState } from 'src/store/actions/ui';

interface TemplateEditorProps {
  morph: TemplateState | undefined
  changeMorphArgument: (morphId: string, argumentId: string, argumentValue: any) => ChangeMorphArgumentAction
  updateUrl: () => Action<ActionTypes.updateUrl>
  setUIState: (ui: Partial<UIState>) => SetUIStateAction
}

class TemplateEditor extends React.Component<TemplateEditorProps, {}> {

  state: {} = {}

  constructor(props: TemplateEditorProps, state: {}) {
    super(props, state)
  }

  render(): React.ReactNode {
    const morph = this.props.morph
    const t = new Date().getTime()
    if (!morph) {
      return <div></div>
    }
    return (
        <table>
          {morph.definition.arguments.map((arg, i) =>
            <tr data-text={i+t} key={morph.definition.id + "_" + t+ i + "_" + morph.value[arg.id]}>
            <td>{arg.name}</td>
            <td>{buildArgumentEditor(arg, morph.value, this.argumentChanged.bind(this), "")}</td>
            <td><button style={{margin: 0, padding: '0px 2px 0px 2px', border: 0}} onClick={this.argumentHelp.bind(this, arg)}>?</button></td>
            </tr>
          )}
        </table>
    )
  }
  
  argumentHelp(arg: Argument) {
    this.props.setUIState({tooltipText: `"${arg.name}": "${arg.description}"`, tooltipModalOpen: true})
  }


  async argumentChanged(e: ArgumentChangeEvent<any>) {
    this.props.changeMorphArgument(this.props.morph.definition.id, e.argument.id, e.value)
    this.props.updateUrl()
    await executeMorph()
  }

}

const mapStateToProps = (state: RootState) => ({
  morph: state.templates.find(m => m.isSelected)
})

export default connect(mapStateToProps, { changeMorphArgument, updateUrl, setUIState })(TemplateEditor)


