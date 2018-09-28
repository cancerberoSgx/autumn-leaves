import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { ArgumentEditorProps, ArgumentEditorState, Color } from 'imagemagick-browser';
import * as React from 'react';

const styles = (theme: Theme) => createStyles({
  root: {
  },
  hidden: {
    display: 'none'
  }
})

export interface ColorPickerEditorProps extends ArgumentEditorProps<Color>, WithStyles<typeof styles> {
}

export interface ColorPickerEditorState extends ArgumentEditorState<Color> {

}

// import { debounce } from 'debounce'

export class ColorPickerEditor extends React.Component<ColorPickerEditorProps, ColorPickerEditorState> {

  state: ColorPickerEditorState = {
    value: '#ffffff'
  }

  constructor(props: ColorPickerEditorProps, state: ColorPickerEditorState) {
    super(props, state)
    this.setState({...this.state, value: props.value || '#ffff11'})
  }

  render(): React.ReactNode {
    const { classes, theme }: { classes: any, theme?: Theme } = this.props
    return (
      <span className={classes.root}>
        <input type="color" value={this.state.value} onChange={
          // debounce(
            e => this.inputChange(e)
            // , 300)
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

export const ArgumentEditor = withStyles(styles, { withTheme: true })(ColorPickerEditor as any)

