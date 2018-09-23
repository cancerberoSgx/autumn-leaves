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
      <h2>Autumn Leaves</h2>
      <p>ImageMagick utilities 100% in the browser</p>
      <p>Right now is WIP / research project, use the menu at the left to navigate through samples, most important right now: <Link to="convertDemo">convert demo</Link></p>

      </Typography>
    </Paper>
  )
}

export default withStyles(styles)(render)