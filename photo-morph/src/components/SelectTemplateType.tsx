import * as React from "react"
import { ChangeEvent } from "react"
import { connect } from "react-redux"
import { Action } from "redux"
import { ActionTypes, selectTemplateType, SelectTemplateTypeAction, updateUrl } from "src/store/actions"
import { RootState, TemplateTypeState } from "src/store/store"

export interface SelectTemplateTypeProps {
  selectTemplateType: (id: string) => SelectTemplateTypeAction
  updateUrl: () => Action<ActionTypes.updateUrl>
  templateTypes: TemplateTypeState[]
}

class SelectTemplateType extends React.Component<SelectTemplateTypeProps, {}> {

  state: {} = {}

  constructor(props: SelectTemplateTypeProps, state: {}) {
    super(props, state)
  }

  render(): React.ReactNode {
    const selected = this.props.templateTypes.find(tt=>tt.isSelected)
    return (
      <div>
        <select onChange={this.templateTypeSelected.bind(this)}>
          {this.props.templateTypes.map((m, i) =>
            <option key={i} data-id={m.definition.id} selected={m.definition.id===selected.definition.id} label={m.definition.name + " (" + m.definition.description + ")"}></option>
          )}
        </select>
      </div>
    )
  }

  async templateTypeSelected(e: ChangeEvent<HTMLSelectElement>) {
    const id = e.target.selectedOptions[0].getAttribute('data-id')
    this.props.selectTemplateType(id)
    this.props.updateUrl()
  }
}

const mapStateToProps = (state: RootState) => ({
  templateTypes: state.templateTypes,
})

export default connect(mapStateToProps, { selectTemplateType, updateUrl })(SelectTemplateType)


