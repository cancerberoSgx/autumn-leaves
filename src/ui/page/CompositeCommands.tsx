import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { Button } from '@material-ui/core';
import { executeOne, loadImg, buildInputFiles, outputFileToInputFile, Command, ExecuteConfig } from 'imagemagick-browser';

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
      inputFiles: await buildInputFiles(['rotate.png']),
      commands: this.state.commands
    }
    await execute(config)
  }
  // async test() {
  //   const result1 = await execute({
  //     inputFiles: await buildInputFiles(['rotate.png']),
  //     command: this.state.commands[0]
  //   })
  //   const roseRotate = await outputFileToInputFile(result1[0].outputFiles[0])
  //   const result2 = await execute({
  //     inputFiles: [roseRotate],
  //     command: this.state.commands[1]
  //   })
  //   loadImg(result2[0].outputFiles[0], document.getElementById('outputFile') as HTMLImageElement)

  // }
}

async function execute(config: ExecuteConfig) {
  const inputFiles = config.inputFiles.concat([])
  const result1 = await executeOne({ ...config, commands: [config.commands[0]] })
  result1.outputFiles.forEach(async f => {
    const inputFile = await outputFileToInputFile(f)
    inputFiles.push(inputFile) //TODO: check if inputFiles already contain it and replace it
  })
  // const roseRotate = await outputFileToInputFile(result1.outputFiles[0])
  // loadImg(roseRotate, document.getElementById('outputFile') as HTMLImageElement)
  const result2 = await executeOne({ ...config, commands: [config.commands[1]], inputFiles })

  loadImg(result2.outputFiles[0], document.getElementById('outputFile') as HTMLImageElement)
}

export const CompositeCommands = withStyles(styles, { withTheme: true })(CompositeCommandsNaked as any);
