// Obsolete: very old component for research dont use it 

import * as React from 'react'
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

const styles = (theme: Theme) => createStyles({
  paper: {
    color: theme.palette.text.secondary,
    width: '100%'
  }
})

const images = ['rose:', 'logo:', 'gnu.jpg', 'Hermitcrab.gif', 'rotate.png']

function AllImages(props: WithStyles<typeof styles>) {
  const { classes } = props
  return (
    <div>
      <p>These are just some images you can use for input for testing: </p>
      <Grid container spacing={24}>
        {images.map(image =>
          <Grid item xs={12} sm={6} lg={4}>
            <Paper className={classes.paper}>
              <p>{image}</p>
              <img src={image} alt={image} />
            </Paper>
          </Grid>
        )}
      </Grid>
    </div>
  )
}
export default withStyles(styles)(AllImages)