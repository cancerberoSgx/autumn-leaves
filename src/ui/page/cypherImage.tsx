import { AppBar, Button, Tab, Tabs, Typography } from '@material-ui/core';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { execute, inputFileToUint8Array, loadImg, MagickInputFile, stringToUInt8Array } from 'imagemagick-browser';
import * as React from 'react';
// import { Typography } from 'material-ui/styles/typography';
// import { Tabs } from 'material-ui';
import SwipeableViews from 'react-swipeable-views';

const styles = (theme: Theme) => createStyles({
  root: {
  }
});

export interface CypherComponentProps extends WithStyles<typeof styles> {
}

export interface CypherComponentState {
  selectedTab: number
  showImage: boolean
  encipherInputFile?: MagickInputFile | undefined
  decipherInputFile?: MagickInputFile | undefined
}

export class CypherComponentNaked extends React.Component<CypherComponentProps, CypherComponentState> {

  state: CypherComponentState = {
    selectedTab: 0,
    showImage: true
  }

  constructor(props: CypherComponentProps, state: CypherComponentState) {
    super(props, state)
  }

  render(): React.ReactNode {
    const { classes, theme } = this.props
    const { selectedTab } = this.state

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={selectedTab} onChange={this.selectedTabChange.bind(this)}>
            <Tab label="Encipher" />
            <Tab label="Decipher" />
          </Tabs>
        </AppBar>

        <Typography>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={this.state.selectedTab} onChange={this.selectedTabChange.bind(this)}>

            <div>
              <p>Select the image you want to encrypt and then a password. Execute and download the encrypted image you can safely share with other who can then use this program and the password to see it ! </p>
              <input type="file" onChange={this.encipherFileChange.bind(this)}></input>
              <p>Password:
              <input type="password" id="cypher-password"></input>
              </p>
              <p>Show ? <input type="checkbox" onChange={e => this.setState({ ...this.state, showImage: e.target.checked })}></input>
                <img id="cipherSourceImage" style={{ display: this.state.showImage ? 'block' : 'none' }}></img>
              </p>
              <p><Button variant="contained" onClick={this.encipher.bind(this)}>cipher</Button></p>
              <p><img id="encipherOutputImage"></img></p>
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
    await loadImg(result[0].outputFiles[0], document.getElementById('encipherOutputImage') as HTMLImageElement)

  }

  async encipherFileChange(event: React.ChangeEvent<HTMLInputElement>, value: number) {
    const f = await inputFileToUint8Array(event.target)
    const encipherInputFile: MagickInputFile = { name: f[0].file.name, content: f[0].content }
    this.setState({ ...this.state, encipherInputFile })
    if (this.state.showImage) {
      await loadImg(encipherInputFile, document.getElementById('cipherSourceImage') as HTMLImageElement)
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
    await loadImg(result[0].outputFiles[0], document.getElementById('decipherOutputImage') as HTMLImageElement)
  }

  async decipherFileChange(event: React.ChangeEvent<HTMLInputElement>, value: number) {
    const f = await inputFileToUint8Array(event.target)
    const decipherInputFile: MagickInputFile = { name: f[0].file.name, content: f[0].content }
    this.setState({ ...this.state, decipherInputFile })
    if (this.state.showImage) {
      await loadImg(decipherInputFile, document.getElementById('decipherSourceImage') as HTMLImageElement)
    }
  }

  selectedTabChange(event: React.ChangeEvent, value: number) {
    this.setState({ selectedTab: value })
  }
}

// function div(props: any) {
//   return (
//     <Typography component="div" style={{ padding: 8 * 3 }}>
//       {props.children}
//     </Typography>
//   );
// }

export const CypherComponent = withStyles(styles, { withTheme: true })(CypherComponentNaked as any);
