import * as React from "react"
import { ChangeEvent } from "react"
import {CommandEditor} from "react-imagemagick"
import { connect } from "react-redux"
import { morphs } from "src/model/morphs"
import { selectMorph, SelectMorphAction } from "src/store/actions"
import { MorphState, RootState } from "src/store/store"
import { executeMorph } from "../store/dispatchers/morphDispatcher"
import MorphEditor from "./MorphEditor"

export interface SelectMorphProps {
  selectMorph: (index: number) => SelectMorphAction
  morphs: MorphState[]
}

class SelectMorph extends React.Component<SelectMorphProps, {}> {

  state: {} = {  }

  constructor(props: SelectMorphProps, state: {}) {
    super(props, state)
  }

  render(): React.ReactNode {
    const selectedOptionIndex = this.props.morphs.map((m, i) => m.isSelected ? i + 1 : -1).filter(i => i !== -1)[0] || 0
    const selectedMorph = selectedOptionIndex !== 0 && this.props.morphs[selectedOptionIndex]
    // debugger
    return (
      <div>
        {!selectedMorph ? <p>Select a Morph</p> : ""}
        <select onChange={this.morphSelected.bind(this)}>
          <option selected={0 === selectedOptionIndex}>Select a morph</option>
          {this.props.morphs.map((m, i) =>
            <option key={i} selected={i + 1 === selectedOptionIndex}>{m.definition.name}</option>
          )}
        </select>
        {selectedMorph ? <div>
          <p>
            <strong>{this.props.morphs.find(m => m.isSelected).definition.name}</strong>: {this.props.morphs.find(m => m.isSelected).definition.description}</p>

          <MorphEditor /> 
        </div> : ""}
      </div>
    )
  }

  async morphSelected(e: ChangeEvent<HTMLSelectElement>) {
    this.props.selectMorph(e.target.selectedIndex - 1)
    await executeMorph()
  }
}

const mapStateToProps = (state: RootState) => ({
  morphs: state.morphs,
})

export default connect(mapStateToProps, { selectMorph })(SelectMorph)


