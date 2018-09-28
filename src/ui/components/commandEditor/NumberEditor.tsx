import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles'
import * as React from 'react'
import { ArgumentEditorProps, ArgumentEditorState, ArgumentType } from 'imagemagick-browser'

const styles = (theme: Theme) => createStyles({
  root: {
  },
  hidden: {
    display: 'none'
  }
})

export interface NumberEditorProps extends ArgumentEditorProps<number>, WithStyles<typeof styles> {
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
    this.setState({...this.state, value: props.value || 0})
  }

  render(): React.ReactNode {
    const { classes, theme }: { classes: any, theme?: Theme } = this.props
    return (
      <span className={classes.root}>
        <input type="number" value={this.state.value} onChange={e => this.inputChange(e)} />
      </span>
    )
  }

  inputChange(changeEvent: React.ChangeEvent<HTMLInputElement>) {
    const value = this.props.isInteger ? parseInt(changeEvent.target.value) : parseFloat(changeEvent.target.value)
    this.setState({ value })
    this.props.onChange({ value, changeEvent, argument: this.props.argument })
  }

}
export const ArgumentEditor = withStyles(styles, { withTheme: true })(NumberEditor as any)

