import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import * as React from 'react';
// import { Dialog } from 'material-ui';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import { getImCommands } from './imCliConvertScript';
import { transformations, images } from './data';

const styles = (theme: Theme) => createStyles({
  root: {
  }
});

export interface ConvertDemoCliScriptProps extends WithStyles<typeof styles> {
  // initialToggleState: boolean
}
export interface ConvertDemoCliScriptState {
  open: boolean
}

export class ConvertDemoCliScriptNaked extends React.Component<ConvertDemoCliScriptProps, ConvertDemoCliScriptState> {

  state = {
    open: false
  }

  constructor(props: ConvertDemoCliScriptProps, state: ConvertDemoCliScriptState) {
    super(props, state)
    this.setState({ open: false })
  }
  handleClose() {
    this.setState({ open: false })
  }
  render(): React.ReactNode {
    const { classes, theme }: { classes: any, theme?: Theme } = this.props
    return (
      <div className={classes.root}>
        <Button onClick={e => this.setState({ open: true })} variant="contained">
          Build CLI IM script to transform all images
        </Button>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="scroll-dialog-title"
        >
          <DialogTitle id="scroll-dialog-title">Convert all images with all transformations script</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <p>Copy&paste the following text into a .sh file at the root folder of this project and execute. It will generate lots of output images using the real ImageMagick on the desktop on /docs folder:</p>
              <textarea>{getImCommands(images, transformations)}</textarea>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClose()} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

      </div>
    )
  }
}

export const ConvertDemoCliScript = withStyles(styles, { withTheme: true })(ConvertDemoCliScriptNaked as any);
