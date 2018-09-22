import * as React from 'react'
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { Button, Typography } from '@material-ui/core'
import { download } from '../../util/download';

const styles = (theme: Theme) => createStyles({
  fileDropTarget: {
    display: 'block',
    height: '140px',
    backgroundColor: 'green'
  }
})

function render(props: WithStyles<typeof styles>) {
  const { classes } = props

  return (
    <Grid container spacing={24}>
      <Grid item xs={12}>
        <Paper>
          <Typography className={''}>
            <Button onClick={download}>Click to download result images</Button>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(render)