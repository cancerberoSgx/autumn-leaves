import { ArgumentEditorProps, ArgumentEditorState } from 'imagemagick-browser';
import * as React from 'react';

export interface NumberEditorProps extends ArgumentEditorProps<number> {
  isInteger?: boolean
}

export interface NumberEditorState extends ArgumentEditorState<number> {

}

export class NumberEditor extends React.Component<NumberEditorProps, NumberEditorState> {

  state: NumberEditorState = {
    value: 0
  }

  constructor(props: NumberEditorProps, state: NumberEditorState) {
    super(props, state)
    this.state.value = props.value || 0
  }

  render(): React.ReactNode {
    return (
      <span className=''>
        <input type="number" value={this.state.value}
          min={this.props.argument && this.props.argument.min || -99999}
          max={this.props.argument && this.props.argument.max || 99999}
          step={this.props.argument && this.props.argument.step || 1}
          onChange={e => this.inputChange(e)} />
      </span>
    )
  }

  inputChange(changeEvent: React.ChangeEvent<HTMLInputElement>) {
    const value = this.props.isInteger ? parseInt(changeEvent.target.value) : parseFloat(changeEvent.target.value)
    this.setState({ value })
    this.props.onChange({ value, changeEvent, argument: this.props.argument })
  }
}