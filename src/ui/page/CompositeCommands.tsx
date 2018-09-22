import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { Command, ExecuteConfig } from '../../imagemagick';
import { Button } from '@material-ui/core';
import { loadImg } from '../../util/image';
import { execute } from '../../execute';

const styles = (theme: Theme) => createStyles({
  root: {},
  input: {
    width: '400px'
  }
});

export interface CompositeCommandsProps extends WithStyles<typeof styles> {
}
export interface CompositeCommandsState {
  commands: Command[]
}

export class CompositeCommandsNaked extends React.Component<CompositeCommandsProps, CompositeCommandsState> {

  state = {
    commands: [
      ["convert", "rose:", "-blur", "0x3", "roseBlur.png"],
      ["convert", "roseBlur.png", "-rotate", "33", "roseOut.png"]
    ]
  }
  constructor(props: CompositeCommandsProps, state: CompositeCommandsState) {
    super(props, state)
  }

  render(): React.ReactNode {
    const { classes, theme } = this.props
    return (
      <div className={classes.root}>
        <ul>
          {this.state.commands.map((command, i) =>
            <li>
              <input className={classes.input} type="text"
                value={JSON.stringify(command)}
                onChange={(e) => {
                  let value
                  try {
                    value = JSON.parse(e.target.value)
                  } catch (error) {
                    alert('JSON Syntax error: '+error)
                  }
                  this.state.commands[i] = value
                  this.setState({
                    commands: this.state.commands
                  })
                }}
              />
            </li>
          )}
        </ul>
        <Button variant="contained" onClick={() => this.execute()}>
          Execute!
        </Button>
        <img id="outputFile" />
      </div>
    )
  }
  async execute() {
    // const commands: string[][] = this.state.commands.map(command=>JSON.parse(command) as string[])
    const config: ExecuteConfig = {
      inputFiles: [],
      commands: this.state.commands
    }
    const results = await execute(config)

    // const outputFile = results[results.length-1].outputFiles[0]
    const outputFile = results[0].outputFiles[0]
    loadImg(outputFile, document.getElementById('outputFile') as HTMLImageElement)
    debugger
    // alert(s)
  }
}

export const CompositeCommands = withStyles(styles, { withTheme: true })(CompositeCommandsNaked as any);
