import * as React from 'react';
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { doImageMagick } from '../../imagemagick';
// import HorizontalNonLinearAlternativeLabelStepper from '../../test/HorizontalNonLinearAlternativeLabelStepper';
import { EmptyComponent } from '../../test/emptyComponent';
import ImageTransformationStepper from '../components/ImageTransformationStepper';


const styles = (theme: Theme) => createStyles({
  paper: {
    // padding: theme.spacing.unit * 2,
    // textAlign: 'center',
    color: theme.palette.text.secondary,
    width: '100%'
  },
  input: {
    width: '100%',
    height: '80px'
  }
});

const defaultValue = ["convert", "srcFile.png", "-rotate", "90", "-resize", "200%", "out.png"]
function page1(props: WithStyles<typeof styles>) {
  const { classes } = props;

  return (
    <Grid container spacing={24}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <p>IM Command</p>
          <textarea defaultValue={JSON.stringify(defaultValue)} className={classes.paper + ' input'}></textarea>
          <button className="execute" onClick={execute}>Execute</button>

          <p>Suggestions:</p>
          <ul>
            <li>
              ["convert", "srcFile.png",  "-morphology", "Hit-and-Miss" , "2x1:1,0", "out.png"]
              </li>
            <li>
              ["convert", "logo:", "-rotate", "90", "-resize", "200%", "out.png"]
            </li>
            <li>
            ["convert", "logo:", "-morphology", "Convolve" , "3x3: 0.0,0.5,0.0  0.5,1.0,0.5   0.0,0.5,0.0", "out.png"]
            </li>
          </ul>
          <p>Source image: </p>
          <img id="srcImage" src="rotate.png" />

          <p>Rotated and enlarged image: </p>
          <img id="rotatedImage" />
          <br /><br />


        <ImageTransformationStepper />

        <EmptyComponent />
        
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper className={classes.paper}><h3 className="page-home">home
        </h3>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper className={classes.paper}>xs=12 sm=6
        
        
        </Paper>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Paper className={classes.paper}>xs=6 sm=3</Paper>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Paper className={classes.paper}>xs=6 sm=3</Paper>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Paper className={classes.paper}>xs=6 sm=3</Paper>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Paper className={classes.paper}>xs=6 sm=3</Paper>
      </Grid>
    </Grid>
  );
}

import { saveAs } from 'file-saver'

function execute() {
  var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
  saveAs(blob, "hello world.txt");
  doImageMagick()
  console.log('hshs');

}
export default withStyles(styles)(page1);