import * as React from 'react';
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { doImageMagick } from '../imagemagick';
import HorizontalNonLinearAlternativeLabelStepper from '../test/HorizontalNonLinearAlternativeLabelStepper';


const styles = (theme: Theme) => createStyles({
  paper: {
    color: theme.palette.text.secondary,
    width: '100%'
  }
});

function page1(props: WithStyles<typeof styles>) {
  const { classes } = props;

  return (
    <Grid container spacing={24}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
        Please choose an image<input type="file"></input>
        </Paper>
      </Grid>
    </Grid>
  );
}


function execute() {
  doImageMagick()
  console.log('hshs');

}
export default withStyles(styles)(page1);