import { ArgumentEditorProps, ArgumentEditorState } from 'imagemagick-browser';
import * as React from 'react';

export interface SelectOneEditorProps extends ArgumentEditorProps<string>  {
  select: { id: string, name: string }[]
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
    this.setState({...this.state })
    console.log('SelectOneEditor', this.props.select);
    
  }

  render(): React.ReactNode {
    console.log('SelectOneEditor render', this.props.select);
    return (
      <span >
        <select onChange={e => this.inputChange(e)}>
          {
            this.props.select.map(select =>
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


