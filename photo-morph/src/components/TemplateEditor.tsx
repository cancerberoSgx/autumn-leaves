import { ArgumentChangeEvent, Argument } from "imagemagick-browser"
import * as React from "react"
import { buildArgumentEditor } from "react-imagemagick"
import { connect } from "react-redux"
import { Action } from "redux"
import { ActionTypes, updateUrl} from "src/store/actions"
import { executeMorph } from "src/store/dispatchers/morphDispatcher"
import { TemplateState, RootState } from "src/store/store"
import { changeMorphArgument, ChangeMorphArgumentAction } from "../store/actions/templates"

interface TemplateEditorProps {
  morph: TemplateState | undefined
  changeMorphArgument: (morphId: string, argumentId: string, argumentValue: any) => ChangeMorphArgumentAction
  updateUrl: () => Action<ActionTypes.updateUrl>
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
      return <div>No morph selected</div>
    }
    return (
      // <div>
        <table>
          {morph.definition.arguments.map((arg, i) =>
            <tr data-text={i+t} key={morph.definition.id + "_" + t+ i + "_" + morph.value[arg.id]}>
            <td>{arg.name} <button onClick={this.argumentHelp.bind(this, arg)}>?</button></td>
            <td>{buildArgumentEditor(arg, morph.value, this.argumentChanged.bind(this), "")}</td>
            </tr>
          )}
        </table>
      // </div>
    )
  }
  
  argumentHelp(arg: Argument) {
    alert(`Description of argument "${arg.name}": "${arg.description}"`)
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

export default connect(mapStateToProps, { changeMorphArgument, updateUrl })(TemplateEditor)


