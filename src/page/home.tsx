import * as React from 'react';
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { doImageMagick } from '../imagemagick';


const styles = (theme: Theme) => createStyles({
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

function page1 (props: WithStyles<typeof styles>) {
  const { classes } = props;

  return (
    <Grid container spacing={24}>
      <Grid item xs={12} sm={6}>
        <Paper className={classes.paper}><h3 className="page-home">home
        </h3>

        
  <p>IM Command</p>
  <textarea className="input">["convert", "srcFile.png", "-rotate", "90", "-resize", "200%", "out.png"]</textarea>
  <button className="execute" onClick={execute}>Execute</button>
  <p>Source image: </p>
  <img id="srcImage" src="rotate.png"/>

  <p>Rotated and enlarged image: </p>
  <img id="rotatedImage"/>
  <br/><br/>
    </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper className={classes.paper}>xs=12 sm=6</Paper>
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


function execute(){
  doImageMagick()
  console.log('hshs');
  
}
export default withStyles(styles)(page1);