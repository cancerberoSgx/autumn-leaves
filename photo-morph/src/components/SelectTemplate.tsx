import * as React from "react"
import { ChangeEvent } from "react"
import { connect } from "react-redux"
import { Action } from "redux"
import { ActionTypes, ResetMorphValueAction, resetMorphValues, selectMorph, updateUrl, SelectMorphAction } from "src/store/actions"
import { TemplateState, RootState } from "src/store/store"
import { executeMorph } from "../store/dispatchers/morphDispatcher"
import TemplateEditor from "./TemplateEditor"
import SelectTemplateType from './SelectTemplateType';
import { MagickTemplateTag } from 'src/model/MagickTemplate';

export interface SelectTemplateProps {
  selectTemplate(id: string): SelectMorphAction
  resetMorphValues: (morphId: string) => ResetMorphValueAction
  updateUrl: () => Action<ActionTypes.updateUrl>
  morphs: TemplateState[]
}

class SelectTemplate extends React.Component<SelectTemplateProps, {}> {

  state: {} = {}

  constructor(props: SelectTemplateProps, state: {}) {
    super(props, state)
  }

  render(): React.ReactNode {
    const selectedMorph = this.props.morphs.find(m => m.isSelected)
    return (
      <div className="gridItemRoot">
        <h3>Select and configure tool</h3>
        <select onChange={this.morphSelected.bind(this)}>
          <option selected={!selectedMorph}>Select tool</option>
          {this.props.morphs.map((m, i) =>
            <option key={i} data-id={m.definition.id} selected={selectedMorph && selectedMorph.definition.id === m.definition.id}>{m.definition.name}</option>
          )}
        </select>
        {selectedMorph ? <div>
          <h5>Description:</h5>
          <p className="noMargin">{selectedMorph.definition.description}</p>
          <h5>Settings:</h5>
          <TemplateEditor />
          <button onClick={this.reset.bind(this)}>Reset settings</button>
        </div> : ""}
      </div>
    )
  }

  async morphSelected(e: ChangeEvent<HTMLSelectElement>) {
    this.props.selectTemplate(e.currentTarget.selectedOptions[0].getAttribute('data-id'))
    this.props.updateUrl()
    await executeMorph()
  }

  async reset() {
    this.props.resetMorphValues(this.props.morphs.find(m => m.isSelected).definition.id)
    this.props.updateUrl()
  }
}

const mapStateToProps = (state: RootState) => {
  const selectedType = state.templateTypes.find(t => t.isSelected)
  return {
    morphs: state.templates.filter(t => selectedType && (t.definition.tags.indexOf(selectedType.definition.type) !== -1 || selectedType.definition.type===MagickTemplateTag.all)),
  }
}

export default connect(mapStateToProps, { selectTemplate: selectMorph, resetMorphValues, updateUrl })(SelectTemplate)


