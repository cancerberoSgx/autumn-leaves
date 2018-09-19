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

  state = {
    toggle: true
  }

  constructor(props: EmptyComponentProps, state: EmptyComponentState){
    super(props, state)
    this.setState({toggle: props.initialToggleState || false})
  }

  render(): React.ReactNode {
    const { classes, theme }: { classes: any, theme?: Theme } = this.props
    const { toggle } = this.state
    return (
      <div className={classes.root}>
      <button onClick={e => this.setState({toggle: !this.state.toggle})}>
        {this.state.toggle ? 'ON': 'OFF'}
      </button>
      </div>
    )
  }
}

// (EmptyComponentNaked as any).propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export const EmptyComponent = withStyles(styles)(EmptyComponentNaked)
// export const EmptyComponent: EmptyComponentNaked = (withStyles(styles, { withTheme: true })(EmptyComponentNaked as any) as any) as EmptyComponentNaked;


export const EmptyComponent = withStyles(styles, { withTheme: true })(EmptyComponentNaked as any);

// export const EmptyComponent = withStyles(styles)(EmptyComponentNaked as any);
