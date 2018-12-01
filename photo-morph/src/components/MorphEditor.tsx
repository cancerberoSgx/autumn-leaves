import { ArgumentChangeEvent } from "imagemagick-browser"
import * as React from "react"
import { buildArgumentEditor } from "react-imagemagick"
import { connect } from "react-redux"
import { Action } from "redux"
import { ActionTypes, updateUrl} from "src/store/actions"
import { executeMorph } from "src/store/dispatchers/morphDispatcher"
import { MorphState, RootState } from "src/store/store"
import { changeMorphArgument, ChangeMorphArgumentAction } from "../store/actions/morphs"

interface MorphEditorProps {
  morph: MorphState | undefined
  changeMorphArgument: (morphId: string, argumentId: string, argumentValue: any) => ChangeMorphArgumentAction
  updateUrl: () => Action<ActionTypes.updateUrl>
}

class MorphEditor extends React.Component<MorphEditorProps, {}> {

  state: {} = {}

  constructor(props: MorphEditorProps, state: {}) {
    super(props, state)
  }

  render(): React.ReactNode {
    const morph = this.props.morph
    if (!morph) {
      return <div>No morph selected</div>
    }
    return (
      <div>
        <p>{morph.definition.name}</p>
        <ul>
          {morph.definition.arguments.map((arg, i) =>
            <li data-text={new Date().getTime()} key={morph.definition.id + "_" + i + "_" + morph.value[arg.id]}>{arg.name}: {buildArgumentEditor(arg, morph.value, this.argumentChanged.bind(this), "")}</li>
          )}
        </ul>
      </div>
    )
  }

  async argumentChanged(e: ArgumentChangeEvent<any>) {
    this.props.changeMorphArgument(this.props.morph.definition.id, e.argument.id, e.value)
    this.props.updateUrl()
    await executeMorph()
  }

}

const mapStateToProps = (state: RootState) => ({
  morph: state.morphs.find(m => m.isSelected)
})

export default connect(mapStateToProps, { changeMorphArgument, updateUrl })(MorphEditor)


