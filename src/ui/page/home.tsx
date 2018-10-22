import * as React from 'react'
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
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
      <p>Welcome to </p>
      <h2>Autumn Leaves</h2>
      <p>ImageMagick utilities 100% in the browser</p>
      <p>Right now is WIP / research project, use the menu at the left to navigate through samples, most important right now are: </p>
      <ul>
        <li><Link to="imageFrame">Image Transformation visual editor</Link>. 
        Lots of popular image transformations that can be configurable using an easy to use UI. For example, easily add a frame, artistic effect or distort your images in cool ways with a nice visual UI (no need to know ImageMagick CLI). Be able to stack effects on top of each other. </li>
        <li><Link to="encipher">Image encipher / decipher</Link>. Able to encrypt an image using text or image as a password and later decrypt it</li>
        <li><Link to="convertDemo">Convert playground</Link>. convert program playground with lots of command line examples that users can modify online</li>
      </ul>

      </Typography>
    </Paper>
  )
}

export default withStyles(styles)(render)