import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles'
import * as React from 'react'
import { Color } from 'csstype'
import { ArgumentEditorProps, ArgumentEditorState, ArgumentType } from './CommandTemplate'

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

export class ColorPickerEditor extends React.Component<ColorPickerEditorProps, ColorPickerEditorState> {

  state: ColorPickerEditorState = {
    value: '#ffffff'
  }

  constructor(props: ColorPickerEditorProps, state: ColorPickerEditorState) {
    super(props, state)
    this.state.value = props.value || '#ffffff'
  }

  render(): React.ReactNode {
    const { classes, theme }: { classes: any, theme?: Theme } = this.props
    return (
      <span className={classes.root}>
        <input type="color" onChange={e => this.inputChange(e)} />
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

