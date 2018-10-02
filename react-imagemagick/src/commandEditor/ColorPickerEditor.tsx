import { ArgumentEditorProps, ArgumentEditorState, Color } from 'imagemagick-browser';
import * as React from 'react';

export interface ColorPickerEditorProps extends ArgumentEditorProps<Color> {
}

export interface ColorPickerEditorState extends ArgumentEditorState<Color> {
}

export class ColorPickerEditor extends React.Component<ColorPickerEditorProps, ColorPickerEditorState> {

  state: ColorPickerEditorState = {
    value: '#ffffff'
  }

  constructor(props: ColorPickerEditorProps, state: ColorPickerEditorState) {
    super(props, state)
    this.state.value = props.value || '#ffff11'
    // this.setState({...this.state })
  }

  render(): React.ReactNode {
    return (
      <span>
        <input type="color" value={this.state.value} onChange={
            e => this.inputChange(e)
          } 
            />
      </span>
    )
  }

  inputChange(changeEvent: React.ChangeEvent<HTMLInputElement>) {
    const value = changeEvent.target.value
    this.setState({ value })
    this.props.onChange({ value, changeEvent, argument: this.props.argument })
  }
}


