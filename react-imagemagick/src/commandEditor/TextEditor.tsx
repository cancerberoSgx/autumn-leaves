import { ArgumentEditorProps, ArgumentEditorState } from 'imagemagick-browser';
import * as React from 'react';

export interface TextEditorProps extends ArgumentEditorProps<string> {
}

export interface TextEditorState extends ArgumentEditorState<string> {

}

export class TextEditor extends React.Component<TextEditorProps, TextEditorState> {

  state: TextEditorState = {
    value: ''
  }

  constructor(props: TextEditorProps, state: TextEditorState) {
    super(props, state)
    this.state.value=props.value||''
  }

  render(): React.ReactNode {
    return (
      <span className=''>
        <input type="text" value={this.state.value}
          onChange={e => this.inputChange(e)} />
      </span>
    )
  }

  inputChange(changeEvent: React.ChangeEvent<HTMLInputElement>) {
    // const value = this.props.isInteger ? parseInt(changeEvent.target.value, 10) : parseFloat(changeEvent.target.value)
    this.setState({ value: changeEvent.target.value })
    this.props.onChange({ value: changeEvent.target.value, changeEvent, argument: this.props.argument })
  }
}