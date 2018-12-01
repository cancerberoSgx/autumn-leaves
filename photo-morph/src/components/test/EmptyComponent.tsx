import * as React from "react"
import { connect } from "react-redux"
import { changeMorphArgument, ChangeMorphArgumentAction } from "src/store/actions"
import { MorphState, RootState } from "src/store/store"

interface EmptyComponentProps {
  morph: MorphState | undefined
  changeMorphArgument: (morphId: string, argumentId: string, argumentValue: any) => ChangeMorphArgumentAction
}

class EmptyComponent extends React.Component<EmptyComponentProps, {}> {

  constructor(props: EmptyComponentProps, state: {}) {
    super(props, state)
  }

  render(): React.ReactNode {
    return (
      <div >
        <button onClick={e => this.props.changeMorphArgument(this.props.morph.definition.id, this.props.morph.definition.arguments[0].id, 123)}>{this.props.morph.definition.name}</button>
      </div>
    )
  }
}

const mapStateToProps = (state: RootState) => ({
  images: state.images,
})

export default connect(mapStateToProps, { changeMorphArgument })(EmptyComponent)


