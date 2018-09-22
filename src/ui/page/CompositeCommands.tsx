import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import * as React from 'react';

const styles = (theme: Theme) => createStyles({
});

export interface CompositeCommandsProps extends WithStyles<typeof styles> {
}
export interface CompositeCommandsState {
  input: string
}

export class CompositeCommandsNaked extends React.Component<CompositeCommandsProps, CompositeCommandsState> {

  state = {
    input: ''
  }

  constructor(props: CompositeCommandsProps, state: CompositeCommandsState) {
    super(props, state)
    this.setState({ input: `
["convert", "rose:", -blur", "0x3", "roseBlur.png"]
["convert", "roseBlur.png", "-rotate", "33", "$OUTPUT"]` })
  }

  render(): React.ReactNode {
    const { classes, theme }: { classes: any, theme?: Theme } = this.props
    // const { toggle } = this.state
    return (
      <div className={classes.root}>
        <button >hello
        </button>
      </div>
    )
  }
}

export const CompositeCommands = withStyles(styles, { withTheme: true })(CompositeCommandsNaked as any);
