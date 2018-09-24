import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { FormControl, InputLabel, Select, MenuItem, TextField, Button, Grid } from '@material-ui/core';
import { imageFrames } from './data';
import { commandsToString, readImageUrlToUintArray, loadImg, getImageSize, ImageSize } from '../../../util/image';
import { Command, ExecuteConfig } from '../../../imagemagick';
import { clone, query } from '../../../util/misc';
import { execute } from '../../../imagemagick/execute';
import { CommandTemplate } from '../../components/commandEditor/CommandTemplate';
import { CommandEditor } from '../../components/commandEditor/CommandEditor';

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
  selectedFrameTemplate: CommandTemplate,
  commands: Command[],
  imageSize?: ImageSize,
  jsonError?: string
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
              {imageFrames.map((t: CommandTemplate, i: number) =>
                <MenuItem value={commandsToString(t.commands)}>{t.name}</MenuItem>
              )}
            </Select>
          </FormControl>

          <ul>
            {this.state.commands.map((command: Command, i: number) =>{
              const context = { 
                imageWidth: this.state.imageSize && this.state.imageSize.width || 0, 
                height: this.state.imageSize && this.state.imageSize.height || 0 
              }
              return <li>
                <CommandEditor
                  {...this.props as any}
                  templateContext={context}
                  commandTemplate={this.state.selectedFrameTemplate}
                  onChange={e => {
                    console.log('ESSS', e);
                    this.setState({ ...this.state, commands: e.value })
                    this.execute()
                  }}
                />
              </li>
            })}
          </ul>
          <br />

          {/* <p className={classes.error}>{this.state.jsonError || ''}</p> */}

          <Button variant="contained" onClick={() => this.execute()}>
            Execute!
        </Button>

          <br />
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}  >
              <p>Original image:
            <br />
                <img src="rotate.png"></img>
              </p>
              <p>Size: {JSON.stringify(this.state.imageSize || {})}</p>
            </Grid>

            <Grid item xs={12} sm={6}  >
              <p>Result:
             <br />
                <img id="outputFile" />
              </p>
            </Grid>
          </Grid>
        </form>
      </div>
    )
  }
  private imageSizeCalled: boolean = false
  private async  setImageSize() {
    if (!this.imageSizeCalled) {
      this.imageSizeCalled = true
      const imageSize = await getImageSize('rotate.png')
      this.setState({ ...this.state, imageSize })
      lastImageSize = imageSize
    }
    await this.execute()
  }

  async componentDidUpdate() {
    await this.setImageSize()
  }

  async componentDidMount() {
    await this.setImageSize()
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

  async selectedTemplateChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const commands = JSON.parse(e.target.value) as Command[]
    const frame = imageFrames.find(i => JSON.stringify(commands) === JSON.stringify(i.commands))
    // debugger
    this.setState({ ...this.state, selectedFrameTemplate: frame, commands: frame.commands })
    await this.execute()
  }
}

let lastImageSize: ImageSize //TODO: this better, dont cheat!
export function getLastImageSize(): ImageSize {//TODO: this better, dont cheat!
  return lastImageSize
}
export const ImageFrameTransformation = withStyles(styles, { withTheme: true })(ImageFrameTransformationNaked as any);
