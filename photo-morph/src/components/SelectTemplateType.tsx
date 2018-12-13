import * as React from "react"
import { ChangeEvent } from "react"
import { connect } from "react-redux"
import { Action } from "redux"
import { ActionTypes, selectTemplateType, SelectTemplateTypeAction, updateUrl } from "src/store/actions"
import { RootState, TemplateTypeState } from "src/store/store"

export interface SelectTemplateTypeProps {
  selectTemplateType: (index: number) => SelectTemplateTypeAction
  updateUrl: () => Action<ActionTypes.updateUrl>
  templateTypes: TemplateTypeState[]
}

class SelectTemplateType extends React.Component<SelectTemplateTypeProps, {}> {

  state: {} = {}

  constructor(props: SelectTemplateTypeProps, state: {}) {
    super(props, state)
  }

  render(): React.ReactNode {
    const selectedOptionIndex = this.props.templateTypes.map((m, i) => m.isSelected ? i + 1 : -1).filter(i => i !== -1)[0] || 0
    return (
      <div>
        {/* <p>Which kind of magick do you want to perform?</p> */}
        <select onChange={this.templateTypeSelected.bind(this)}>
          <option selected={0 === selectedOptionIndex}>Select One</option>
          {this.props.templateTypes.map((m, i) =>
            <option key={i} selected={i + 1 === selectedOptionIndex}>{m.definition.name + " (" + m.definition.description + ")"}</option>
          )}
        </select>
      </div>
    )
  }

  async templateTypeSelected(e: ChangeEvent<HTMLSelectElement>) {
    this.props.selectTemplateType(e.target.selectedIndex - 1)
    this.props.updateUrl()
  }
}

const mapStateToProps = (state: RootState) => ({
  templateTypes: state.templateTypes,
})

export default connect(mapStateToProps, { selectTemplateType, updateUrl })(SelectTemplateType)


