import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles'
import * as React from 'react'
import { FormControl, InputLabel, Select, MenuItem, TextField, Button, Grid } from '@material-ui/core'
import { imageFrames } from './data'
import { commandsToString, readImageUrlToUintArray, loadImg, getImageSize, ImageSize, Command, ExecuteConfig, execute } from 'imagemagick-browser'
// import { Command, ExecuteConfig } from '../../../imagemagick'
import { clone, query } from '../../../util/misc'
// import { execute } from '../../../imagemagick/execute'
import { CommandTemplate }  from 'imagemagick-browser'
import { CommandEditor } from '../../components/commandEditor/CommandEditor'

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
})

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
  updateCommandValue(commands: Command[]) {
    this.setState({ ...this.state, commands })
    console.log('updateCommandValue', commands)
    this.execute()
  }
  render(): React.ReactNode {
    const { classes, theme }: { classes: any, theme?: Theme } = this.props
    return (
      <div className={classes.root}>
        <p>Add a frame to your images. Select one of the templates below and change its parameters using the form. </p>
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
            {this.state.commands.map((command: Command, i: number) => {
              console.log('PASANDO', this.state.selectedFrameTemplate.defaultTemplateContext || {})
              return <li>
                <CommandEditor
                  {...this.props as any}
                  templateContext={this.state.selectedFrameTemplate.defaultTemplateContext || {}}
                  commandTemplate={this.state.selectedFrameTemplate}
                  onChange={e => {
                    this.updateCommandValue(e.value)
                  }}
                />
              </li>
            })}
          </ul>
          <br />

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
  private async  setImageSize(force: boolean = false) {
    if (!this.imageSizeCalled || force) {
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
    console.log('commands:', commands)

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
    const _commands = JSON.parse(e.target.value) as Command[]
    const frame = imageFrames.find(i => JSON.stringify(_commands) === JSON.stringify(i.commands))
    let commands: Command[]
    if (frame.template) {
      commands = frame.template(frame.defaultTemplateContext)
    }
    else {
      commands = frame.commands
    }
    this.setState({ ...this.state, selectedFrameTemplate: frame, commands })
    await this.execute()
  }
}

let lastImageSize: ImageSize = { width: 109, height: 125 } //TODO: this better, dont cheat!
export function getLastImageSize(): ImageSize {//TODO: this better, dont cheat!
  return lastImageSize
}
export const ImageFrameTransformation = withStyles(styles, { withTheme: true })(ImageFrameTransformationNaked as any)
