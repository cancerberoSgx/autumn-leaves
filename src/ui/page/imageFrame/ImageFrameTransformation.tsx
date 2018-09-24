import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@material-ui/core';
import { imageFrames, Frame } from './data';
import { commandsToString, readImageUrlToUintArray, loadImg } from '../../../util/image';
import { Command, ExecuteConfig } from '../../../imagemagick';
import { clone, query } from '../../../util/misc';
import { execute } from '../../../imagemagick/execute';

const styles = (theme: Theme) => createStyles({
  input: {
    width: '100%',
  },
  formControl: {
    width: '100%',
  },
  error: {
    fontWeight: 'bold'
  }
});

export interface ImageFrameTransformationProps extends WithStyles<typeof styles> {
}
export interface ImageFrameTransformationState {
  selectedFrameTemplate: Frame,
  commands: Command[]
}

export class ImageFrameTransformationNaked extends React.Component<ImageFrameTransformationProps, ImageFrameTransformationState> {

  state: ImageFrameTransformationState = {
    selectedFrameTemplate: imageFrames[0],
    commands: clone(imageFrames[0].commands)
  }

  constructor(props: ImageFrameTransformationProps, state: ImageFrameTransformationState) {
    super(props, state)
  }

  render(): React.ReactNode {
    const { classes, theme }: { classes: any, theme?: Theme } = this.props
    return (
      <div className={classes.root}>
        <form className={classes.root} autoComplete="off">
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="template-simple">{'Template'}</InputLabel>
            <Select className={classes.select}
              // value={defaultTransformation.command}
              onChange={e => this.selectedTemplateChange(e)}
              inputProps={{
                name: 'template',
                id: 'template-simple',
              }}
            >
              {imageFrames.map((t: Frame, i: number) =>
                <MenuItem value={commandsToString(t.commands)}>{t.name}</MenuItem>
              )}
            </Select>
          </FormControl>

          <ul>
            {this.state.commands.map((command: Command, i: number) =>
              <li>
                <input className={classes.input} type="text"
                  value={JSON.stringify(command)}
                  onChange={e => this.commandInputChange(e)}
                />
              </li>
            )}
          </ul>
          <br />
          <p className={classes.error}></p>

          <Button variant="contained" onClick={() => this.execute()}>
            Execute!
        </Button>

          <br />
          <p>rotate.png original image:
            <br />

            <img src="rotate.png"></img>
          </p>

          <p>Result:
             <br />
            <img id="outputFile" />
          </p>

        </form>
      </div>
    )
  }

  commandInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const commands: Command[] = []
    query(this.props.classes.input)
      .forEach((input: HTMLInputElement) => {
        let value
        try {
          value = JSON.parse(e.target.value)
        } catch (error) {
          // alert('JSON Syntax error: ' + error)
          query(this.props.classes.error)[0].innerHTML = 'JSON Syntax error: ' + error
          throw error
        }
        query(this.props.classes.error)[0].innerHTML = ''
        commands.push(value)
      })
    this.setState({ commands })
  }

  async execute() {
    const inputImageName = 'inputImage.png'
    const outputImageName = 'outputImage.png'
    const commands = this.state.commands.map((command: Command) =>
      command.map(s =>
        s === '$INPUT' ? inputImageName : s === '$OUTPUT' ? outputImageName : s
      )
    )
    const execConfig: ExecuteConfig = {
      commands,
      inputFiles: [
        {
          name: inputImageName,
          content: await readImageUrlToUintArray('rotate.png')
        }
      ]
    }
    const result = await execute(execConfig)
    loadImg(result[result.length - 1].outputFiles[0], query('#outputFile')[0] as HTMLImageElement)
  }

  selectedTemplateChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const commands = JSON.parse(e.target.value) as Command[]
    // const name = e.currentTarget.innerHTML
    const frame = imageFrames.find(i=>JSON.stringify(commands)===JSON.stringify(i.commands))
    debugger
    this.setState({...this.state, selectedFrameTemplate: frame, commands: frame.commands})
  }
}

export const ImageFrameTransformation = withStyles(styles, { withTheme: true })(ImageFrameTransformationNaked as any);
