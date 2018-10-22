import { AppBar, Button, Tab, Tabs, Typography } from '@material-ui/core';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { execute, inputFileToUint8Array, loadImg, MagickInputFile, stringToUInt8Array, MagickOutputFile, InfoResult, info } from 'imagemagick-browser';
import * as React from 'react';
import { saveAs } from 'file-saver'
import SwipeableViews from 'react-swipeable-views';

const styles = (theme: Theme) => createStyles({
  root: {
  }
})

export interface ImageInformationComponentProps extends WithStyles<typeof styles> {
}

export interface ImageInformationComponentState {
  information?: InfoResult
  inputFiles?: MagickInputFile[]
}

export class ImageInformationComponentNaked extends React.Component<ImageInformationComponentProps, ImageInformationComponentState> {

  state: ImageInformationComponentState = {
  }

  constructor(props: ImageInformationComponentProps, state: ImageInformationComponentState) {
    super(props, state)
  }

  render(): React.ReactNode {
    const { classes, theme } = this.props
    return (
      <div className={classes.root}>
      <Typography>
        <div>Select an image to extract information from:</div>
        <div><input type="file" onChange={this.imageSelected.bind(this)}></input></div>
        <Button variant="contained" onClick={this.extract.bind(this)}>Extract Information</Button>
        <pre id="infoOutput">{this.state.information}</pre>
      </Typography>
      </div>
    )
  }

  async extract( ){
    if(!this.state.inputFiles){
      alert('Please select an image first')
      return
    }
    const result = await info({inputFiles: this.state.inputFiles})
    // debugger
    document.querySelector('#infoOutput').innerHTML=JSON.stringify(result, null, 2)
    // result[0].image.format
  }
  
  async imageSelected(event: React.ChangeEvent<HTMLInputElement>){
    const f = await inputFileToUint8Array(event.target)
    const inputFile: MagickInputFile = { 
      name: f[0].file.name, 
      content: f[0].content 
    }
    this.setState({ ...this.state, inputFiles: [inputFile] })
  }
}

export const ImageInformationComponent = withStyles(styles, { withTheme: true })(ImageInformationComponentNaked as any);
