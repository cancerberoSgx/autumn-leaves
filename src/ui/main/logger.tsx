import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { addExecuteListener, ExecuteEvent } from 'imagemagick-browser';

const styles = (theme: Theme) => createStyles({
  root: {
  },
  logList: {
    maxHeight: '100px'
  }
});

export interface LoggerProps extends WithStyles<typeof styles> {
  initialToggleState: boolean
}
export interface LoggerState {
  logs: ExecuteEvent[]
}

export class LoggerNaked extends React.Component<LoggerProps, LoggerState> {

  state: LoggerState = {
    logs: []
  }

  constructor(props: LoggerProps, state: LoggerState) {
    super(props, state)
    addExecuteListener(e=>{
      this.state.logs.push(e)      
      this.setState({...this.state})
    })
  }

  render(): React.ReactNode {
    const { classes, theme } = this.props
    return (
      <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography >
        Logs: Last command took: {Math.round(this.state.logs.length && this.state.logs[this.state.logs.length-1].took)}m
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <p>Log list: </p>
        <ul className={classes.logList}>
          {this.state.logs.map(l=>
            <li>{Math.round(l.took)}ms. Command: {JSON.stringify(l.command)}</li>
          )}
        </ul>
      </ExpansionPanelDetails>
    </ExpansionPanel>
    )
  }
}

export const Logger = withStyles(styles, { withTheme: true })(LoggerNaked as any);
