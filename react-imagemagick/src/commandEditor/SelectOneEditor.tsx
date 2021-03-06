import { ArgumentEditorProps, ArgumentEditorState } from 'imagemagick-browser';
import * as React from 'react';

type SelectOneEditorOption = { id: string, name: string }[]
export interface SelectOneEditorProps extends ArgumentEditorProps<string>  {
  select: SelectOneEditorOption | (()=>SelectOneEditorOption)
}

export interface SelectOneEditorState extends ArgumentEditorState<string> {
}

export class SelectOneEditor extends React.Component<SelectOneEditorProps, SelectOneEditorState> {

  state: SelectOneEditorState = {
    value: ''
  }

  constructor(props: SelectOneEditorProps, state: SelectOneEditorState) {
    super(props, state)
    this.state.value = props.value || ''
  }

  render(): React.ReactNode {
    const list = Array.isArray(this.props.select) ? this.props.select : this.props.select(); 
    return (
      <span >
        <select onChange={e => this.inputChange(e)}>
          {
            list.map(select =>
              <option id={select.id} key={select.id}
                selected={select.id===this.state.value}>
                {select.name} 
              </option>)
          }
        </select>
      </span>
    )
  }

  inputChange(changeEvent: React.ChangeEvent<HTMLSelectElement>) {
    const value = changeEvent.target.selectedOptions[0].id
    this.setState({ value })
    this.props.onChange({ value, changeEvent, argument: this.props.argument })
  }
}


