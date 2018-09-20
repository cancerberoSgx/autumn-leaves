import * as React from 'react'
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import ImageTransformationStepper from '../components/ImageTransformationStepper'

const styles = (theme: Theme) => createStyles({
  paper: {
    color: theme.palette.text.secondary,
    width: '100%'
  }
})

function render(props: WithStyles<typeof styles>) {
  const { classes } = props

  return (
    <Grid container spacing={24}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <ImageTransformationStepper />
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
  )
}

export default withStyles(styles)(render)