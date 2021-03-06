import * as React from 'react'
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import {
  Button, MenuItem, FormControl, InputLabel, Select, TableHead, TableCell, TableRow, TableBody, Table
} from '@material-ui/core';
import { ConvertDemoCliScript } from './ConvertDemoCliScript';
import { images as defaultImages, transformations, suggestionsDontWork } from './data'
import { buildImArguments, DoMagickCall } from './index';
import { CommandTemplate,  readImageUrlToUintArray, } from 'imagemagick-browser'
import { loadImageElement, arrayToCli, MagickInputFile, blobToString, execute } from 'wasm-imagemagick';

const styles = (theme: Theme) => createStyles({
  paper: {
    color: theme.palette.text.secondary,
    width: '100%'
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  select: {
    minWidth: '240px'
  },
  input: {
    width: '100%',
    height: '100px'
  },
  demoEntry: {
    border: '2px solid #ededed',
    padding: '10px'
  },
  images: {

  },
  error: {
    margin: 0,
    padding: 0,
    fontWeight: 'bold'
  },
  formControl: {
    margin: theme.spacing.unit
  },
})

export interface ConvertDemoProps extends WithStyles<typeof styles> {

}

export interface ConvertDemoState {
  selectedTransformation: CommandTemplate
}

export class ConvertDemoNaked extends React.Component<ConvertDemoProps, ConvertDemoState> {

  state: ConvertDemoState = {
    selectedTransformation: transformations[0]
  }

  constructor(props: ConvertDemoProps, state: ConvertDemoState) {
    super(props, state)
    this.setState({ ...this.state, selectedTransformation: transformations[0] })
  }

  render(): React.ReactNode {
    const { classes } = this.props

    return (
      <Paper className={classes.paper}>
        <p>Try an ImageMagick command on different test images. Choose one example below and press execute. Edit the command and see what it does. Some transformation could take a couple of seconds to finish. so be patient. </p>

        <div>{this.renderSuggestions(transformations)}<br /></div>

        <textarea className={classes.input + ' input'} defaultValue={JSON.stringify(this.state.selectedTransformation.command)}></textarea>

        <p className="error"></p>

        <Button className="execute" variant="contained" onClick={() => this.transformImages()}>Execute</Button>

        <div>
          <strong>ImageMagick Command: </strong>
          <br />
          <span className="im-command"></span>
        </div>

        {this.renderSuggestions(suggestionsDontWork, 'Not working transformations')}

        <ConvertDemoCliScript />

        <p>Images: </p>
        <Table className={classes.images + ' images'}>
          <TableHead>
            <TableRow>
              <TableCell>Input</TableCell>
              <TableCell>Output</TableCell>
              <TableCell numeric>Time (ms)</TableCell>
              <TableCell >Output (desktop)</TableCell>
              <TableCell numeric>Input image format</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {defaultImages.map(image => {
              return (
                <TableRow key={image.sourceUrl} className={classes.demoEntry}>
                  <TableCell component="th" scope="row">
                    <img src={image.sourceUrl} /><br />{image.sourceUrl}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <img className="spinner" src="spinner.gif" />
                    <img id={image.targetId} />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <p className="took"></p>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <img src={`test1ImOutput/${this.state.selectedTransformation.id}_${image.outFile}`} alt={`test1ImOutput/${this.state.selectedTransformation.id}_${image.outFile}`}></img>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <textarea id={`${image.targetId}_format`}></textarea>
                  </TableCell>
                </TableRow>)
            }
            )}
          </TableBody>
        </Table>
      </Paper>
    )
  }

  renderSuggestions(transformations: CommandTemplate[], title: string = 'Transformation examples') {
    const { classes } = this.props
    return (<div>
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="suggestion-simple">{title}</InputLabel>
          <Select className={classes.select}
            // value={defaultTransformation.command}
            onChange={e => this.suggestionChange(e)}
            inputProps={{
              name: 'suggestion',
              id: 'suggestion-simple',
            }}
          >
            {transformations.map(t =>
              <MenuItem value={t.command.map(s=>s+'')} selected={this.state.selectedTransformation.id === t.id}>{t.name}</MenuItem>
            )}
          </Select>
        </FormControl>
      </form>
    </div>
    )
  }

  suggestionChange(e: React.ChangeEvent) {
    const value: any = (e.target as any).value
    document.querySelector<HTMLInputElement>('.input').value = JSON.stringify(value)
    this.setState({ ...this.state, selectedTransformation: transformations.find(t => JSON.stringify(t.command) === JSON.stringify(value)) })
    this.transformImages()
  }

  spinner(spinning: boolean, el: HTMLElement) {
    (el.parentElement.parentElement.querySelector('.spinner') as HTMLElement).style.display = spinning ? 'block' : 'none'
  }

  async transformImages(images = defaultImages) {
    images.forEach(async image => {
      const t0 = performance.now()
      const outputImage: any = document.getElementById(image.targetId)
      if (!outputImage) { return }

      this.spinner(true, outputImage)

      const imArguments = buildImArguments((document.querySelector('.input') as HTMLInputElement).value, image)

      const { outputFiles } = await DoMagickCall({ image, imArguments }) // TODO: images []

      let firstOutputImage = outputFiles[0]

      if (outputImage) {
        await loadImageElement(firstOutputImage, outputImage)
        // outputImage.src = URL.createObjectURL(firstOutputImage['blob'])
        outputImage.setAttribute('data-outfile', image.outFile)
        outputImage.parentElement.parentElement.querySelector('.took').innerHTML = Math.round(performance.now() - t0) + ' ms'
      }
      document.querySelector('.im-command').innerHTML = arrayToCli(imArguments)

      this.spinner(false, outputImage)
    })
  }

  componentDidMount() {
    defaultImages.forEach(async image => {
      const commands = [['convert', image.sourceUrl, `${image.outFile}.json`]]
      const inputFiles: MagickInputFile[] = [
        {
          name: image.sourceUrl,
          content: await readImageUrlToUintArray(image.sourceUrl)
        }
      ]
      const results = await execute({ commands, inputFiles })
      const json = await blobToString(results[0].outputFiles[0].blob)
      // alert(json)
    })
  }
}


export const ConvertDemo = withStyles(styles, { withTheme: true })(ConvertDemoNaked as any);
