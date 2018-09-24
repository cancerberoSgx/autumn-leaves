import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import * as React from 'react';

const styles = (theme: Theme) => createStyles({
  root: {
    backgroundColor: 'pink'
  }
});

export interface EmptyComponentProps extends WithStyles<typeof styles> {
  initialToggleState: boolean
}
export interface EmptyComponentState {
  toggle: boolean
}

export class EmptyComponentNaked extends React.Component<EmptyComponentProps, EmptyComponentState> {

  state: EmptyComponentState = {
    toggle: true
  }

  constructor(props: EmptyComponentProps, state: EmptyComponentState) {
    super(props, state)
  }

  render(): React.ReactNode {
    const { classes, theme }: { classes: any, theme?: Theme } = this.props
    const { toggle } = this.state
    return (
      <div className={classes.root}>
        <button onClick={e => this.setState({ toggle: !this.state.toggle })}>
          {this.state.toggle ? 'ON' : 'OFF'}
        </button>
      </div>
    )
  }
}

export const EmptyComponent = withStyles(styles, { withTheme: true })(EmptyComponentNaked as any);
