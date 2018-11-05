import { Button, Typography } from '@material-ui/core';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { saveAs } from 'file-saver';
import { executeOne, InfoWhat, inputFileToUint8Array, MagickInputFile, writeInputImageToEl } from 'imagemagick-browser';
import * as React from 'react';

const styles = (theme: Theme) => createStyles({
  root: {
  }
})

export interface ConvertFormatProps extends WithStyles<typeof styles> {
}

export interface ConvertFormatState {
  inputFiles?: MagickInputFile[]
  outputFormat?: string
}

export class ConvertFormatNaked extends React.Component<ConvertFormatProps, ConvertFormatState> {

  state: ConvertFormatState = {
  }

  constructor(props: ConvertFormatProps, state: ConvertFormatState) {
    super(props, state)
  }

  render(): React.ReactNode {
    const { classes, theme } = this.props
    return (
      <div className={classes.root}>

        <Typography> Select an image to covert format:    </Typography>
        <div><input type="file" onChange={this.imageSelected.bind(this)}></input></div>
        <img id="sourceImage" src={this.state.inputFiles && this.state.inputFiles[0] && this.state.inputFiles[0].name || undefined}></img>
        <Typography>Format to Convert: </Typography>
        <select onChange={this.onFormatSelect.bind(this)}>
          <option value={'png'}>png</option>
          <option value={'gif'}>gif</option>
          <option value={'tiff'}>tiff</option>
        </select>
        <div>
        <Button variant="contained" onClick={e => this.extract(InfoWhat.json)}>Convert &amp; Download</Button>
        </div>

      </div>
    )
  }

  onFormatSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({ ...this.state, outputFormat: e.currentTarget.value })
  }

  async extract(what: InfoWhat) {
    if (!this.state.inputFiles) {
      alert('Please select an image first')
      return
    }
    const inputFileName = this.state.inputFiles[0].name
    const outputFileName = `output.${this.state.outputFormat}`
    const result = await executeOne({
      commands: [['convert', inputFileName, outputFileName]],
      inputFiles: this.state.inputFiles
    })
    saveAs(result.outputFiles[0].blob, outputFileName)
  }

  async imageSelected(event: React.ChangeEvent<HTMLInputElement>) {
    const f = await inputFileToUint8Array(event.target)
    const inputFile: MagickInputFile = {
      name: f[0].file.name,
      content: f[0].content
    }
    this.setState({ ...this.state, inputFiles: [inputFile] })
  }

  componentDidUpdate() {
    if (this.state.inputFiles && this.state.inputFiles.length) {
      writeInputImageToEl(this.state.inputFiles[0], document.querySelector('#sourceImage'))
    }
  }

}

export const ConvertFormat = withStyles(styles, { withTheme: true })(ConvertFormatNaked as any);

