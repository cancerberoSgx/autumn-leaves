import { Button, FormControl, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { Command, CommandTemplate, execute, ExecuteConfig, ImageSize, loadImg, MagickInputFile, readInputImageFromUrl, uint8ArrayToBlob } from 'imagemagick-browser';
import * as React from 'react';
import { CommandEditor, SelectImageEditor } from 'react-imagemagick';
import { clone, query } from '../../../util/misc';
import { imageFrames } from './data';
import { dispatchUrl } from './dispatchUrl';
import { Link } from 'react-router-dom';

const defaultImageSrc = 'rotate.png'

const styles = (theme: Theme) => createStyles({
  input: {
    width: '100%',
  },
  root: {},
  formControl: {
    width: '100%',
  },
  select: {},
  error: {
    fontWeight: 'bold'
  }
})

export interface ImageFrameTransformationProps extends WithStyles<typeof styles> {
  imageSrc: string
}

export interface ImageFrameTransformationState {
  selectedFrameTemplate: CommandTemplate,
  commands: Command[],
  imageSize?: ImageSize,
  jsonError?: string
  inputFiles: MagickInputFile[]
}

export class ImageFrameTransformationNaked extends React.Component<ImageFrameTransformationProps, ImageFrameTransformationState> {

  state: ImageFrameTransformationState = {
    selectedFrameTemplate: imageFrames[0],
    commands: clone(imageFrames[0].commands),
    inputFiles: [],
  }

  constructor(props: ImageFrameTransformationProps, state: ImageFrameTransformationState) {
    super(props, state)
    this.dispatchUrl()
    this.state.imageSize = this.state.imageSize || { width: 0, height: 0 }
  }

  private dispatchUrl(){
    const urlData = dispatchUrl()
    if(urlData){
      
    }
    debugger
  }

  render(): React.ReactNode {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <p>Add a frame to your images. First, load an image:</p>
        <SelectImageEditor
          onChange={e => {
            const file = e.value[0] // TODO: user might select more than one file ?
            const outputFile = { name: file.name, blob: uint8ArrayToBlob(file.content) }
            loadImg(outputFile, document.getElementById('sourceImage') as HTMLImageElement)
            this.setImageSize(true)
            this.setState({ ...this.state, inputFiles: e.value })
          }} />
          <p>Just a <Link to="/imageFrame?template=t1">link example</Link> (TODO: remove this)</p>
        <p>Then, select one of the templates below and change its parameters using the form. </p>
        <select className={classes.select}
          onChange={e => this.selectedTemplateChange(e)}
          >
          {imageFrames.map((t: CommandTemplate, i: number) =>
            <option value={JSON.stringify(t.commands, null, 2)}>{t.name}</option>
          )}
        </select>
        <ul>
          {this.state.commands.map((command: Command, i: number) => {
            return <li>
              <CommandEditor
                templateContext={{ ...this.state.selectedFrameTemplate.defaultTemplateContext, imageWidth: this.state.imageSize.width, imageHeight: this.state.imageSize.height }}
                commandTemplate={this.state.selectedFrameTemplate}
                imageSrc={this.getFirstInputImage() ? this.getFirstInputImage().name : defaultImageSrc}
                imageWidth={() => lastImageSize.width}
                imageHeight={() => lastImageSize.height}
                onChange={e => {
                  this.setState({ ...this.state, commands: e.value })
                  this.execute()
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
              <img onLoad={() => { this.setImageSize(true) }} src={this.getFirstInputImage() ? URL.createObjectURL(uint8ArrayToBlob(this.getFirstInputImage().content)) : defaultImageSrc} id="sourceImage"></img>
            </p>
            <p>Size: {JSON.stringify(this.state.imageSize || {})}</p>
          </Grid>
          <Grid item xs={12} sm={6}  >
            <p>Result:
             <br />
              <img id="outputFile" />
              <button>Download</button>
            </p>
          </Grid>
        </Grid>
      </div>
    )
  }

  componentDidMount(){
    this.dispatchUrl()
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

  private getFirstInputImage(): MagickInputFile | undefined {
    return this.state.inputFiles.length ? this.state.inputFiles[0] : undefined
  }

  private async setImageSize(force: boolean = false) {
    const img = document.querySelector<HTMLImageElement>('#sourceImage')
    const imageSize = { width: img.width, height: img.height, }
    if (JSON.stringify(imageSize) !== JSON.stringify(lastImageSize)) {
      this.setState({ ...this.state, imageSize })
      lastImageSize = imageSize
    }
    await this.execute()
  }

  async execute() {
    let image = this.getFirstInputImage()
    if (!image) {
      image = await readInputImageFromUrl(defaultImageSrc)
    }
    const inputImageName = image.name
    const outputImageName = this.getOutputImageNameFor(inputImageName)
    const commands = this.state.commands.map((command: Command) =>
      command.map(s =>
        s === '$INPUT' ? inputImageName : s === '$OUTPUT' ? outputImageName : s
      )
    )
    const execConfig: ExecuteConfig = {
      commands,
      inputFiles: [image]
    }
    const result = await execute(execConfig)
    loadImg(result[result.length - 1].outputFiles[0], query('#outputFile')[0] as HTMLImageElement)
  }

  private getOutputImageNameFor(inputImageName: string): string {
    let extension = inputImageName.substring(inputImageName.indexOf('.'), inputImageName.length)
    extension = extension === '.tiff' ? '.png' : extension
    return inputImageName.substring(0, inputImageName.indexOf('.')) + 'Output' + extension
  }

}

let lastImageSize: ImageSize = { width: 109, height: 125 } //TODO: this better, dont cheat!
export const ImageFrameTransformation = withStyles(styles, { withTheme: true })(ImageFrameTransformationNaked as any)
