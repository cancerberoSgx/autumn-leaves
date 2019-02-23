import { Button, Grid } from '@material-ui/core';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { saveAs } from 'file-saver';
import * as React from 'react';
import { CommandEditor, SelectFileEditor } from 'react-imagemagick';
import { match } from 'react-router-dom';
import { query } from '../../../util/misc';
import { dispatchUrl } from './dispatchUrl';
import { SelectTemplate } from './SelectTemplate';
import { CommandTemplate, ImageSize, sampleCommandTemplates, getOutputImageNameFor } from 'imagemagick-browser';
import { MagickInputFile, MagickOutputFile, loadImageElement, asOutputFile , Command, buildInputFile, getFileName, ExecuteConfig, execute} from 'wasm-imagemagick';

const defaultImageSrc = 'rotate.png' // TODO : remove from almost everywhere

const styles = (theme: Theme) => createStyles({
  input: {
  },
  root: {},
  formControl: {
  },
  select: {},
  error: {
  }
})

export interface ImageFrameTransformationProps extends WithStyles<typeof styles> {
  imageSrc: string
  match: match<Params>
}

export interface Params {
  template?: string
  context?: string
  imageSrc?: string
}

export interface ImageFrameTransformationState {
  selectedFrameTemplate: CommandTemplate,
  commands: Command[],
  imageSize?: ImageSize,
  jsonError?: string
  inputFiles: MagickInputFile[]
  outputFile?: MagickOutputFile
  // outputFile2?: MagickOutputFile
  /** when user press "make this the source image" button we push current command to this "queue" */
  commandChain: Command[][]
}

export class ImageFrameTransformationNaked extends React.Component<ImageFrameTransformationProps, ImageFrameTransformationState> {

  state: ImageFrameTransformationState = {
    selectedFrameTemplate: sampleCommandTemplates[0],
    commands: sampleCommandTemplates[0].template(sampleCommandTemplates[0].defaultTemplateContext),
    inputFiles: [],
    commandChain: []
  }

  commandEditor: JSX.Element;

  constructor(props: ImageFrameTransformationProps, state: ImageFrameTransformationState) {
    super(props, state)
    this.dispatchUrl()
    this.state.imageSize = this.state.imageSize || { width: 0, height: 0 }
  }

  render(): React.ReactNode {

    const { classes } = this.props
    if (!this.getFirstInputImage()) {
      return <div>Loading Image...</div>
    }
    const imageSrc = URL.createObjectURL(new Blob([this.getFirstInputImage().content]))
    
    return (
      <div className={classes.root}>

        {/* select image  */}

        <p>Add a frame to your images. First, load an image:</p>
        <SelectFileEditor
          onChange={e => {
            const file = e.value[0] // TODO: user might select more than one file ?
            const outputFile = { name: file.name, blob: new Blob([file.content]) }
            loadImageElement(outputFile, document.getElementById('sourceImage') as HTMLImageElement)
            this.setImageSize(true)
            this.setState({ ...this.state, inputFiles: e.value })
          }} />

        {/* select template  */}

        <p>Then, select one of the templates below and change its parameters using the form. Current template is "{this.state.selectedFrameTemplate.name}"</p>
        <SelectTemplate
          onSelect={e => this.selectedTemplateChange(e.selectedTemplateId)}
          selected={sampleCommandTemplates[0]}
          templates={sampleCommandTemplates}
        />

        {/* command editor  */}

        <ul>
          {this.state.commands.map((command: Command, i: number) => {
            return (
              <li>
                <CommandEditor
                  templateContext={{ ...this.state.selectedFrameTemplate.defaultTemplateContext, imageWidth: this.state.imageSize.width, imageHeight: this.state.imageSize.height }}
                  commandTemplate={this.state.selectedFrameTemplate}
                  imageSrc={imageSrc}
                  imageWidth={() => lastImageSize.width}
                  imageHeight={() => lastImageSize.height}
                  onChange={e => {
                    this.setState({ ...this.state, commands: e.value })
                    this.execute()
                  }}
                />
              </li>
            )
          })}
        </ul>

        <br />
        <Button variant="contained" onClick={() => this.execute()}>
          Execute!
        </Button>
        <br />

        {/* input and output image */}

        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}  >
            <p>Original image:  </p>
            <p><img onLoad={() => { this.setImageSize(true) }} src={imageSrc} id="sourceImage"></img></p>
            <p>
              <Button variant="contained"
                  onClick={e => saveAs(new Blob([this.state.inputFiles[0].content]), this.state.inputFiles[0].name)}>
                Download
            </Button>
            </p>
          </Grid>
          <Grid item xs={12} sm={6}  >
            <p>Result:</p>
            <p><img id="outputFile" /></p>
            <p>
              <Button variant="contained"
                onClick={e => saveAs(this.state.outputFile.blob, this.state.outputFile.name)}>
                Download
            </Button>
            </p>
            <p>
              <Button variant="contained"
                title="So I can apply transformations on this one..."
                onClick={async e => {
                  const inputFile = await buildInputFile((document.getElementById('outputFile') as HTMLImageElement).src, this.state.inputFiles[0].name)
                  this.setState({ ...this.state, inputFiles: [inputFile], commandChain: this.state.commandChain.concat([this.state.commands]) })
                }}>
                Make this the source image
              </Button>
            </p>
            <p>Command chain: </p>
            <ul>
              {this.state.commandChain.map(c => <li>{JSON.stringify(c)}</li>)}
            </ul>
          </Grid>
        </Grid>
      </div>
    )
  }

  protected async dispatchUrl() {
    const urlData = dispatchUrl()
    if (urlData.template && urlData.template !== this.state.selectedFrameTemplate.id) {
      this.state.selectedFrameTemplate = sampleCommandTemplates.find(t => t.id === urlData.template) || this.state.selectedFrameTemplate
      this.updateCommand(this.state.selectedFrameTemplate)
    }

    if (!this.state.inputFiles.length) {
      const imageSrc = this.props.match.params.imageSrc ? decodeURIComponent(this.props.match.params.imageSrc) : defaultImageSrc
      const image = await buildInputFile(imageSrc)
      this.setState({
        ...this.state,
        inputFiles: [
          {
            name: getFileName(imageSrc),
            content: image.content
          },
        ],
        //TODO: pass the conetxt and declare it on this.state
      })
    }
  }

  async componentWillMount() {
    await this.dispatchUrl()
  }

  async selectedTemplateChange(templateId: string) {
    const template = sampleCommandTemplates.find(t => t.id === templateId)
    this.updateCommand(template)
    await this.execute()
  }

  updateCommand(frame: CommandTemplate = this.state.selectedFrameTemplate, setState: boolean = true, ): any {
    let commands: Command[] = frame.template(frame.defaultTemplateContext)
    this.state.selectedFrameTemplate = frame
    this.state.commands = commands
    if (setState) {
      this.setState({ ...this.state, selectedFrameTemplate: frame, commands })
    }
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
      image = await buildInputFile(defaultImageSrc)
    }
    const inputImageName = image.name
    const outputImageName = getOutputImageNameFor(inputImageName, this.state.selectedFrameTemplate.outputFileExtension || undefined)
    const commands = this.state.commands.map(command =>
      command.map(s =>
        s === '$INPUT' ? inputImageName : s === '$OUTPUT' ? outputImageName : s
      )
    )
    const execConfig: ExecuteConfig = {
      commands,
      inputFiles: [image]
    }
    if(this.equalsLastExecuteConfig(execConfig)){
      return
    }
    this.lastExecuteConfig = execConfig
    const result = await execute(execConfig)
    this.state.outputFile = result.outputFiles[0]
    await loadImageElement(result.outputFiles[0], query('#outputFile')[0] as HTMLImageElement)
    return result.outputFiles[0]
  }

  private lastExecuteConfig: ExecuteConfig;
  private equalsLastExecuteConfig(execConfig: ExecuteConfig): boolean {
    if(this.lastExecuteConfig && JSON.stringify(this.lastExecuteConfig.commands)===JSON.stringify(execConfig.commands)){
      return true
    }
    return false
  }

  
}

let lastImageSize: ImageSize = { width: 109, height: 125 } //TODO: this better, dont cheat!
export const ImageFrameTransformation = withStyles(styles, { withTheme: true })(ImageFrameTransformationNaked as any)
