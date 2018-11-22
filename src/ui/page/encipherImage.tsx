import { AppBar, Button, Tab, Tabs, Typography } from '@material-ui/core';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import {  inputFileToUint8Array, stringToUInt8Array } from 'imagemagick-browser';
import * as React from 'react';
import { saveAs } from 'file-saver'
import SwipeableViews from 'react-swipeable-views';
import { MagickInputFile, MagickOutputFile, loadImageElement, execute } from 'wasm-imagemagick';

const styles = (theme: Theme) => createStyles({
  root: {
  }
})

export interface EncipherComponentProps extends WithStyles<typeof styles> {
}

export interface EncipherComponentState {
  selectedTab: number
  showImage: boolean
  encipherInputFile?: MagickInputFile
  encipherOutputFile?: MagickOutputFile
  decipherInputFile?: MagickInputFile
  decipherOutputFile?: MagickOutputFile
}

export class EncipherComponentNaked extends React.Component<EncipherComponentProps, EncipherComponentState> {

  state: EncipherComponentState = {
    selectedTab: 0,
    showImage: true
  }

  constructor(props: EncipherComponentProps, state: EncipherComponentState) {
    super(props, state)
  }

  render(): React.ReactNode {
    const { classes, theme } = this.props
    const { selectedTab } = this.state

    console.log('RENDER', selectedTab);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={selectedTab} onChange={(e, value) => this.setState({ ...this.state, selectedTab: value })}>
            <Tab label="Encipher" />
            <Tab label="Decipher" />
          </Tabs>
        </AppBar>

        <Typography>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={selectedTab}
            onSwitching={(value, state) => state === 'end' && this.setState({ ...this.state, selectedTab: value })}
          >

            <div>
              <p>Select the image you want to encrypt and then a password. Execute and download the encrypted image you can safely share with other who can then use this program and the password to see it ! </p>
              <input type="file" onChange={this.encipherFileChange.bind(this)}></input>
              <p>Password:
              <input type="password" id="encipherPassword"></input>
              </p>
              <p>Show ? <input type="checkbox" onChange={e => this.setState({ ...this.state, showImage: e.target.checked })}></input>
                <img id="cipherSourceImage" style={{ display: this.state.showImage ? 'block' : 'none' }}></img>
              </p>
              <p><Button variant="contained" onClick={this.encipher.bind(this)}>Cipher</Button></p>
              <p><img id="encipherOutputImage"></img></p>
              {this.state.encipherOutputFile && <p><Button variant="contained" onClick={e=>saveAs(this.state.encipherOutputFile.blob, 'encrypted.png')}>Download</Button></p>}
 
            </div>

            <div>
              Decipher an encrypted image
              <p>
                <input type="file" onChange={this.decipherFileChange.bind(this)}></input>
              </p>
              <input type="password" id="decipherPassword"></input>
              <img id="cipherSourceImage" style={{ display: this.state.showImage ? 'block' : 'none' }}></img>
              <p><Button variant="contained" onClick={this.decipher.bind(this)}>Decipher</Button></p>
              <p><img id="decipherOutputImage"></img></p>
              {this.state.decipherOutputFile && <p><Button variant="contained" onClick={e=>saveAs(this.state.decipherOutputFile.blob, 'encrypted.png')}>Download</Button></p>}
            </div>

          </SwipeableViews>
        </Typography>
      </div>
    )
  }

  async encipher(event: MouseEvent) {
    if (!this.state.encipherInputFile) {
      alert('Must select an image first!')
      return
    }
    const password = (document.getElementById('encipherPassword') as HTMLInputElement).value
    const passwordFile: MagickInputFile = { name: 'passphrase.txt', content: stringToUInt8Array(password) }
    const result = await execute({
      inputFiles: [passwordFile, this.state.encipherInputFile],
      commands: [['convert', this.state.encipherInputFile.name, '-encipher', 'passphrase.txt', 'output.png']]
    })
    const outputFile = result[0].outputFiles[0]
    await loadImageElement(outputFile, document.getElementById('encipherOutputImage') as HTMLImageElement)
    this.setState({ ...this.state, encipherOutputFile: outputFile })
  }

  async encipherFileChange(event: React.ChangeEvent<HTMLInputElement>, value: number) {
    const f = await inputFileToUint8Array(event.target)
    const encipherInputFile: MagickInputFile = { name: f[0].file.name, content: f[0].content }
    this.setState({ ...this.state, encipherInputFile })
    if (this.state.showImage) {
      await loadImageElement(encipherInputFile, document.getElementById('cipherSourceImage') as HTMLImageElement)
    }
  }

  async decipher(event: MouseEvent) {
    if (!this.state.decipherInputFile) {
      alert('Must select an image first!')
      return
    }
    const password = (document.getElementById('decipherPassword') as HTMLInputElement).value
    const passwordFile: MagickInputFile = { name: 'passphrase.txt', content: stringToUInt8Array(password) }
    const result = await execute({
      inputFiles: [passwordFile, this.state.decipherInputFile],
      commands: [['convert', this.state.decipherInputFile.name, '-decipher', 'passphrase.txt', 'output.png']]
    })
    const outputFile = result[0].outputFiles[0]
    await loadImageElement(outputFile, document.getElementById('decipherOutputImage') as HTMLImageElement)
    this.setState({ ...this.state, decipherOutputFile: outputFile })
  }

  async decipherFileChange(event: React.ChangeEvent<HTMLInputElement>, value: number) {
    const f = await inputFileToUint8Array(event.target)
    const decipherInputFile: MagickInputFile = { name: f[0].file.name, content: f[0].content }
    this.setState({ ...this.state, decipherInputFile })
    if (this.state.showImage) {
      await loadImageElement(decipherInputFile, document.getElementById('decipherSourceImage') as HTMLImageElement)
    }
  }
}

export const EncipherComponent = withStyles(styles, { withTheme: true })(EncipherComponentNaked as any);
