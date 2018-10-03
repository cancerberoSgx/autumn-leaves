import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography, CircularProgress } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { addExecuteListener, ExecuteEvent } from 'imagemagick-browser';

const styles = (theme: Theme) => createStyles({
  root: {
  },
  logList: {
    maxHeight: '100px'
  },
  notExecuting: {
    visibility: 'hidden'
  }
});

export interface LoggerProps extends WithStyles<typeof styles> {
  initialToggleState: boolean
}
export interface LoggerState {
  logs: ExecuteEvent[]
  executing: boolean
}

export class LoggerNaked extends React.Component<LoggerProps, LoggerState> {

  state: LoggerState = {
    logs: [],
    executing: false,
  }

  constructor(props: LoggerProps, state: LoggerState) {
    super(props, state)
    addExecuteListener({
      afterExecute: e => {
        this.state.logs.push(e)
        this.setState({ ...this.state, executing: false })
      },
      beforeExecute: e => {
        this.setState({ ...this.state, executing: true })
      }
    })
  }

  render(): React.ReactNode {
    const { classes, theme } = this.props
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography >
          <CircularProgress size={14} className={this.state.executing ? '' : classes.notExecuting}/>
          Last command took: {Math.round(this.state.logs.length && this.state.logs[this.state.logs.length - 1].took)} ms
        </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <p>Log list: </p>
          <ul className={classes.logList}>
            {this.state.logs.map((l, i) =>
              <li key={i}>{Math.round(l.took)}ms. Command: {JSON.stringify(l.command)}</li>
            )}
          </ul>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }
}

export const Logger = withStyles(styles, { withTheme: true })(LoggerNaked as any);
