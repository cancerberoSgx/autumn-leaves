// DEMO / Obsolete component / prototype

import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { Button } from '@material-ui/core';
import { executeOne,   Command, ExecuteConfig, buildInputFile, asInputFile, loadImageElement } from 'wasm-imagemagick'

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
      ["convert", "rotate.png", "-rotate", "33", "roseRotate.png"],
      ["convert", "roseRotate.png", "-blur", "0x2", "roseRotateBlur.png"]
    ]
  }
  constructor(props: CompositeCommandsProps, state: CompositeCommandsState) {
    super(props, state)
  }

  render(): React.ReactNode {
    const { classes, theme } = this.props
    return (
      <div className={classes.root}>
        Welcome, this is a quick and dirty demonstration of executing two IM commands serially, the second consuming the first's output.
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
                    alert('JSON Syntax error: ' + error)
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
        <br />

        <Button variant="contained" onClick={() => this.doExecute()}>
          Execute!
        </Button>
        <p>rotate.png original image: <br /><img src="rotate.png"></img></p>
        <img id="outputFile" />
      </div>
    )
  }

  async doExecute() {
    const config: ExecuteConfig = {
      inputFiles: [await buildInputFile('rotate.png')],
      commands: this.state.commands
    }
    await execute(config)
  }
}

async function execute(config: ExecuteConfig) {
  const inputFiles = config.inputFiles.concat([])
  const result1 = await executeOne(config)
  result1.outputFiles.forEach(async f => {
    const inputFile = await asInputFile(f)
    inputFiles.push(inputFile) //TODO: check if inputFiles already contain it and replace it
  })
  const result2 = await executeOne({ ...config, commands: [(config.commands as any)[1]], inputFiles })

  await loadImageElement(result2.outputFiles[0], document.getElementById('outputFile') as HTMLImageElement)
}

export const CompositeCommands = withStyles(styles, { withTheme: true })(CompositeCommandsNaked as any);
