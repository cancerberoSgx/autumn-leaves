import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { Command, ExecuteConfig, getMagickApi } from '../../imagemagick';
import { Button } from '@material-ui/core';
import { loadImg, buildInputFiles, outputFileToInputFile } from '../../util/image';
import { execute } from '../../imagemagick/execute';

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
        {/* <Button variant="contained" onClick={() => this.execute()}>
          Execute!
        </Button> */}
        <br />

        <Button variant="contained" onClick={() => this.test()}>
        Execute!
        </Button>
        <p>rotate.png original image: <br/><img src="rotate.png"></img></p>
        <img id="outputFile" />
      </div>
    )
  }
  // async execute() {
  //   const config: ExecuteConfig = {
  //     inputFiles: [],
  //     commands: this.state.commands
  //   }
  //   const results = await execute(config)

  //   const outputFile = results[results.length - 1].outputFiles[0]
  //   loadImg(outputFile, document.getElementById('outputFile') as HTMLImageElement)
  // }

  async test() {
    const result1 = await execute({
      inputFiles: await buildInputFiles(['rotate.png']),
      command: this.state.commands[0]// ["convert", "rotate.png", "-rotate", "33", "roseRotate.png"]
    })
    const roseRotate = await outputFileToInputFile(result1[0].outputFiles[0])
    const result2 = await execute({
      inputFiles: [roseRotate],
      command: this.state.commands[1]//["convert", "roseRotate.png", "-blur", "0x2", "roseRotateBlur.png"]
    })
    loadImg(result2[0].outputFiles[0], document.getElementById('outputFile') as HTMLImageElement)

  }
}

export const CompositeCommands = withStyles(styles, { withTheme: true })(CompositeCommandsNaked as any);
