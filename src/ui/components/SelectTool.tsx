import * as React from 'react'
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles'

const styles = (theme: Theme) => createStyles({
})

function render(props: WithStyles<typeof styles>) {
  const { classes } = props

  return (
    <div>
      <p>Select a tool: </p>
      <select >
        <option>Basic CLI tool</option>
      </select>
    </div>
  )
}
export default withStyles(styles)(render)