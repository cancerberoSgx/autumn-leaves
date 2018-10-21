import { AppBar, Tab, Tabs, Typography, Input } from '@material-ui/core';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { buildInputFiles, inputFileToUint8Array, MagickInputFile, inputFileToOutputFile, loadImg } from 'imagemagick-browser';
// import { Typography } from 'material-ui/styles/typography';
// import { Tabs } from 'material-ui';

import SwipeableViews from 'react-swipeable-views';

const styles = (theme: Theme) => createStyles({
  root: {
  }
});

export interface CypherComponentProps extends WithStyles<typeof styles> {
  // initialToggleState: boolean
}
export interface CypherComponentState {
  // toggle: boolean
  value: number
  showImage: boolean
}

export class CypherComponentNaked extends React.Component<CypherComponentProps, CypherComponentState> {

  state: CypherComponentState = {
    value: 0,
    showImage: false,
  }

  constructor(props: CypherComponentProps, state: CypherComponentState) {
    super(props, state)
  }

  render(): React.ReactNode {
    const { classes, theme } = this.props
    const { value } = this.state
    // console.log(value);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange.bind(this)}>
            <Tab label="Cypher" />
            <Tab label="Decipher" />
            {/* <Tab label="Item Three"  /> */}
          </Tabs>
        </AppBar>

        <Typography>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={this.state.value} onChange={this.handleChange.bind(this)}
          >
            <TabContainer>
              <p>Select the image you want to encrypt and then a password. Execute and download the encrypted image you can safely share with other who can then use this program and the password to see it ! </p>
              <input type="file" onChange={this.cypherFileChange.bind(this)}></input>
              {/* <p><img id="sourceImage"></img></p> */}
              {/* <br /> */}
              {/* <Input type="file" >Select an image</Input> */}
              {/* <br/>    */}
              <p>Password: 
              <input type="password"></input>
              </p>
              <p>Show ? <input type="checkbox" onChange={e=>{this.setState({...this.state, showImage: e.target.checked});console.log(e.target.checked)}}></input>
              <img id="sourceImage" style={{display: this.state.showImage ? 'block' : 'none'}}></img>
               </p>
            </TabContainer>
            <TabContainer>
              Decypher an encrypted image
              <p>
                <input type="file"></input>
              </p>
              <input type="password"></input>
            </TabContainer>
          </SwipeableViews>
        </Typography> 
      </div>
    )
  }

  // convert rose.jpg -encipher passphrase.txt rose.png
  // convert rose.png -decipher passphrase.txt rose.jpg

  async cypherFileChange(event: React.ChangeEvent<HTMLInputElement>, value: number) {
    const f = await inputFileToUint8Array(event.target)
    const inputFile = {name: f[0].file.name, content: f[0].content}
    if(this.state.showImage){
      await loadImg(inputFile, document.getElementById('sourceImage') as HTMLImageElement)
    }
    // const outputFile = await inputFileToOutputFile(inputFile)

    // const inputFile: MagickInputFile = {name: event.target.files[0].name, content}
    // buildInputFiles

    // debugger
    // this.setState({ value });
  }; 

  handleChange(event: React.ChangeEvent, value: number) {
    this.setState({ value });
  };
}

function TabContainer(props: any) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

export const CypherComponent = withStyles(styles, { withTheme: true })(CypherComponentNaked as any);
