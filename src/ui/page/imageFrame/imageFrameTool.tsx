import * as React from 'react'
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import ImageTransformationStepper from './ImageTransformationStepper'
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles = (theme: Theme) => createStyles({
  paper: {
    color: theme.palette.text.secondary,
    width: '100%',
    margin: 0,
    padding: '10px'
  }
})

function render(props: WithStyles<typeof styles>) {
  const { classes } = props

  return (
    <Paper className={classes.paper}>
    <Typography>
      <h2>Image frame</h2>
      <p>Put a frame on your images. First select an image, then use the tool to try different frames formats and configuration, and last, download the result.  </p>

      <ImageTransformationStepper />
      </Typography>
    </Paper>
  )
}

export default withStyles(styles)(render)