import { ArgumentEditorProps, ArgumentEditorState } from 'imagemagick-browser';
import * as React from 'react';

export interface BooleanEditorProps extends ArgumentEditorProps<boolean> {
}

export interface BooleanEditorState extends ArgumentEditorState<boolean> {
}

export class BooleanEditor extends React.Component<BooleanEditorProps, BooleanEditorState> {

  state: BooleanEditorState = {
    value: false
  }

  constructor(props: BooleanEditorProps, state: BooleanEditorState) {
    super(props, state)
    this.state.value = props.value || false
  }

  render(): React.ReactNode {
    return (
      <span className=''>
        <input type="checkbox" checked={this.state.value}
          onChange={e => this.inputChange(e)} />
      </span>
    )
  }

  inputChange(changeEvent: React.ChangeEvent<HTMLInputElement>) {
    const value = changeEvent.target.checked
    this.setState({ value })
    this.props.onChange({ value, changeEvent, argument: this.props.argument })
  }
}