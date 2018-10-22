import { AppBar, Button, Tab, Tabs, Typography } from '@material-ui/core';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { execute, inputFileToUint8Array, loadImg, MagickInputFile, stringToUInt8Array, MagickOutputFile } from 'imagemagick-browser';
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
  information?: string
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
        <p>Select an image to extract information from:</p>
        <p><input type="file" onChange={this.imageSelected.bind(this)}></input></p>
        <pre>{this.state.information}</pre>
      </Typography>
      </div>
    )
  }

  async imageSelected(e: MouseEvent){

  }
}

export const ImageInformationComponent = withStyles(styles, { withTheme: true })(ImageInformationComponentNaked as any);
