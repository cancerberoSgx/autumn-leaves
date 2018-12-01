import * as React from "react"
import { ChangeEvent } from "react"
import { connect } from "react-redux"
import { Action } from "redux"
import { ActionTypes, ResetMorphValueAction, resetMorphValues, selectMorph, SelectMorphAction, updateUrl } from "src/store/actions"
import { MorphState, RootState } from "src/store/store"
import { executeMorph } from "../store/dispatchers/morphDispatcher"
import MorphEditor from "./MorphEditor"

export interface SelectMorphProps {
  selectMorph: (index: number) => SelectMorphAction
  resetMorphValues: (morphId: string)=> ResetMorphValueAction
  updateUrl: ()=> Action<ActionTypes.updateUrl> 
  morphs: MorphState[]
}

class SelectMorph extends React.Component<SelectMorphProps, {}> {

  state: {} = {}

  constructor(props: SelectMorphProps, state: {}) {
    super(props, state)
  }

  render(): React.ReactNode {
    const selectedOptionIndex = this.props.morphs.map((m, i) => m.isSelected ? i + 1 : -1).filter(i => i !== -1)[0] || 0
    const selectedMorph = selectedOptionIndex !== 0 && this.props.morphs[selectedOptionIndex]
    return (
      <div>
        {!selectedMorph ? <span>Select a Morph</span> : ""}
        <select onChange={this.morphSelected.bind(this)}>
          <option selected={0 === selectedOptionIndex}>Select a morph</option>
          {this.props.morphs.map((m, i) =>
            <option key={i} selected={i + 1 === selectedOptionIndex}>{m.definition.name}</option>
          )}
        </select>
        {selectedMorph ? <div>
          <p>
            <strong>{selectedMorph.definition.name}</strong>: {selectedMorph.definition.description}</p>

          <MorphEditor />
          <button onClick={this.reset.bind(this)}>reset</button>
        </div> : ""}
      </div>
    )
  }

  async morphSelected(e: ChangeEvent<HTMLSelectElement>) {
    this.props.selectMorph(e.target.selectedIndex - 1)
    this.props.updateUrl()
    await executeMorph()
  }

  async reset(){
    this.props.resetMorphValues(this.props.morphs.find(m => m.isSelected).definition.id)
    this.props.updateUrl()
  }
}

const mapStateToProps = (state: RootState) => ({
  morphs: state.morphs,
})

export default connect(mapStateToProps, { selectMorph, resetMorphValues, updateUrl })(SelectMorph)


