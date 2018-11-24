import { ArgumentChangeEvent } from "imagemagick-browser"
import * as React from "react"
import { buildArgumentEditor } from "react-imagemagick"
import { connect } from "react-redux"
import { store } from "src"
import { executeMorph } from "src/store/dispatchers/morphDispatcher"
import { MorphState, RootState } from "src/store/store"
import { changeMorphArgument, ChangeMorphArgumentAction } from "../store/actions/morphs"

interface MorphEditorProps {
  morph: MorphState | undefined
  changeMorphArgument: (morphId: string, argumentId: string, argumentValue: any) => ChangeMorphArgumentAction
}

class MorphEditor extends React.Component<MorphEditorProps, {}> {

  state: {} = {}

  constructor(props: MorphEditorProps, state: {}) {
    super(props, state)
  }

  render(): React.ReactNode {
    const morph = this.props.morph
    // debugger
    if (!morph) {
      return <div></div>
    }
    return (
      <div>
        <p>{morph.definition.name}</p>
        <ul>
          {morph.definition.arguments.map((arg, i) =>
            <li key={i}>{arg.name}: {buildArgumentEditor(arg, morph.value, this.argumentChanged.bind(this), "")}</li>
          )}
        </ul>
      </div>
    )
  }

  async argumentChanged(e: ArgumentChangeEvent<any>) {
    this.props.changeMorphArgument(this.props.morph.definition.id, e.argument.id, e.value)
    await executeMorph()
  }

}

const mapStateToProps = (state: RootState) => ({
  morph: state.morphs.find(m => m.isSelected)
})

export default connect(mapStateToProps, { changeMorphArgument })(MorphEditor)


