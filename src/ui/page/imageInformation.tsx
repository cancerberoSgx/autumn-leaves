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
    document.querySelector('#infoOutput').innerHTML='SEBA\n'+result+'' // TODO: issue: info is returning a string ? 
     //JSON.stringify(result[0], null, 2)
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


// <AppBar position="static">
// <Tabs value={selectedTab} onChange={(e, value) => this.setState({ ...this.state, selectedTab: value })}>
//   <Tab label="Encipher" />
//   <Tab label="Decipher" />
// </Tabs>
// </AppBar>

// <Typography>
// <SwipeableViews
//   axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
//   index={selectedTab}
//   onSwitching={(value, state) => state === 'end' && this.setState({ ...this.state, selectedTab: value })}
// >

//   <div>
//     <p>Select the image you want to encrypt and then a password. Execute and download the encrypted image you can safely share with other who can then use this program and the password to see it ! </p>
//     <input type="file" onChange={this.encipherFileChange.bind(this)}></input>
//     <p>Password:
//     <input type="password" id="encipherPassword"></input>
//     </p>
//     <p>Show ? <input type="checkbox" onChange={e => this.setState({ ...this.state, showImage: e.target.checked })}></input>
//       <img id="cipherSourceImage" style={{ display: this.state.showImage ? 'block' : 'none' }}></img>
//     </p>
//     <p><Button variant="contained" onClick={this.encipher.bind(this)}>Cipher</Button></p>
//     <p><img id="encipherOutputImage"></img></p>
//     {this.state.encipherOutputFile && <p><Button variant="contained" onClick={e=>saveAs(this.state.encipherOutputFile.blob, 'encrypted.png')}>Download</Button></p>}

//   </div>

//   <div>
//     Decipher an encrypted image
//     <p>
//       <input type="file" onChange={this.decipherFileChange.bind(this)}></input>
//     </p>
//     <input type="password" id="decipherPassword"></input>
//     <img id="cipherSourceImage" style={{ display: this.state.showImage ? 'block' : 'none' }}></img>
//     <p><Button variant="contained" onClick={this.decipher.bind(this)}>Decipher</Button></p>
//     <p><img id="decipherOutputImage"></img></p>
//     {this.state.decipherOutputFile && <p><Button variant="contained" onClick={e=>saveAs(this.state.decipherOutputFile.blob, 'encrypted.png')}>Download</Button></p>}
//   </div>

// </SwipeableViews>
// </Typography>