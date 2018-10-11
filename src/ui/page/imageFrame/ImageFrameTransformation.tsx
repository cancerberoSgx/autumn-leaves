import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Input, FormHelperText } from '@material-ui/core';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { Command, CommandTemplate, templates, execute, ExecuteConfig, ImageSize, loadImg, MagickInputFile, readInputImageFromUrl, uint8ArrayToBlob, getNameFromUrl, getOutputImageNameFor, getFileNameFromUrl, MagickOutputFile } from 'imagemagick-browser';
import * as React from 'react';
import { CommandEditor, SelectImageEditor } from 'react-imagemagick';
import { clone, query } from '../../../util/misc';
import { dispatchUrl } from './dispatchUrl';
import { Link, match } from 'react-router-dom';
import { SelectTemplate } from './SelectTemplate';


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
  /** when user press "make this the source image" button we push current command to this "queue" */
  commandChain: Command[][]
}

export class ImageFrameTransformationNaked extends React.Component<ImageFrameTransformationProps, ImageFrameTransformationState> {

  state: ImageFrameTransformationState = {
    selectedFrameTemplate: templates[0],
    commands: templates[0].template(templates[0].defaultTemplateContext),
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
    // console.log('ImageFrameTransformation RENDER', JSON.stringify(this.state.commandChain));

    const { classes } = this.props
    if (!this.getFirstInputImage()) {
      return <div>Loading Image...</div>
    }

    const imageSrc = URL.createObjectURL(uint8ArrayToBlob(this.getFirstInputImage().content))
    return (
      <div className={classes.root}>

        {/* select image  */}

        <p>Add a frame to your images. First, load an image:</p>
        <SelectImageEditor
          onChange={e => {
            const file = e.value[0] // TODO: user might select more than one file ?
            const outputFile = { name: file.name, blob: uint8ArrayToBlob(file.content) }
            loadImg(outputFile, document.getElementById('sourceImage') as HTMLImageElement)
            this.setImageSize(true)
            this.setState({ ...this.state, inputFiles: e.value })
          }} />

        {/* <p>Just a <Link to="/imageFrame?template=frameFeathering1">link example</Link> (TODO: remove this). And <Link to="/imageFrame?template=crop1">another place</Link>. </p> */}


        {/* select template  */}

        <p>Then, select one of the templates below and change its parameters using the form. Current template is "{this.state.selectedFrameTemplate.name}"</p>
        <SelectTemplate
          onSelect={e => this.selectedTemplateChange(e.selectedTemplateId)}
          selected={templates[0]}
          templates={templates}
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
            <p>Size: {JSON.stringify(this.state.imageSize || {})}</p>
            <Button variant="contained"
              onClick={() => alert('TODO')}> {/*// TODO */}
              Download
            </Button>
            <br />
            <img onLoad={() => { this.setImageSize(true) }} src={imageSrc} id="sourceImage"></img>

          </Grid>
          <Grid item xs={12} sm={6}  >
            <p>Result:
            <Button variant="contained"
                onClick={() => alert('TODO')}> {/*// TODO */}
                Download
            </Button>
              <br />
              <Button variant="contained"
                title="So I can apply transformations on this one..."
                onClick={async e => {
                  const inputFile = await readInputImageFromUrl((document.getElementById('outputFile') as HTMLImageElement).src, this.state.inputFiles[0].name)
                  this.setState({ ...this.state, inputFiles: [inputFile], commandChain: this.state.commandChain.concat([this.state.commands]) })
                }}>
                Make this the source image
              </Button>
              <br />
              <img id="outputFile" />
              <p>Command chain: </p>
              <ul>
                {this.state.commandChain.map(c => <li>{JSON.stringify(c)}</li>)}
              </ul>
            </p>
          </Grid>
        </Grid>
      </div>
    )
  }

  protected async dispatchUrl() {
    const urlData = dispatchUrl()
    if (urlData.template && urlData.template !== this.state.selectedFrameTemplate.id) {
      this.state.selectedFrameTemplate = templates.find(t => t.id === urlData.template) || this.state.selectedFrameTemplate
      this.updateCommand(this.state.selectedFrameTemplate)
    }

    if (!this.state.inputFiles.length) {
      // let context
      // try {
      //   context = JSON.parse(decodeURIComponent(this.props.match.params.context) || 'undefined')
      // } catch (error) {
      // }
      const imageSrc = this.props.match.params.imageSrc ? decodeURIComponent(this.props.match.params.imageSrc) : defaultImageSrc
      const image = await readInputImageFromUrl(imageSrc)
      this.setState({
        ...this.state,
        inputFiles: [
          {
            name: getFileNameFromUrl(imageSrc),
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

  componentWillUpdate() {
    this.execute()
    this.updateCommand(undefined, false)
  }

  async selectedTemplateChange(templateId: string) {
    const template = templates.find(t => t.id === templateId)
    this.updateCommand(template)
    await this.execute()
  }

  updateCommand(frame: CommandTemplate = this.state.selectedFrameTemplate, setState: boolean= true, ): any {
    let commands: Command[]
    if (frame.template) {
      commands = frame.template(frame.defaultTemplateContext)
    }
    this.state.selectedFrameTemplate = frame
    this.state.commands = commands
    if(setState){
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
      image = await readInputImageFromUrl(defaultImageSrc)
    }
    const inputImageName = image.name
    const outputImageName = getOutputImageNameFor(inputImageName)
    // console.log('execute', this.state.commands)    
    const commands = this.state.commands.map(command =>
      command.map(s =>
        s === '$INPUT' ? inputImageName : s === '$OUTPUT' ? outputImageName : s
      )
    )
    const execConfig: ExecuteConfig = {
      commands,
      inputFiles: [image]
    }
    const result = await execute(execConfig)
    const outputFile = result[result.length - 1].outputFiles[0] // TODO: support multiple output images
    loadImg(outputFile, query('#outputFile')[0] as HTMLImageElement)
    return outputFile
  }
}

let lastImageSize: ImageSize = { width: 109, height: 125 } //TODO: this better, dont cheat!
export const ImageFrameTransformation = withStyles(styles, { withTheme: true })(ImageFrameTransformationNaked as any)
