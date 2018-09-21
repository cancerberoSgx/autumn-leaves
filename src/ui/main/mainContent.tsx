import * as React from 'react'
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles'
import { Route, Switch } from 'react-router'
import page1 from '../page/page1'
import home from '../page/home'
import DownloadResult from '../components/DownloadResult'
import SimpleCLITransformationEditor from '../components/SimpleCLITransformationEditor'
import TestImages from '../components/TestImages';
import convertDemo from '../page/convertDemo/convertDemo';

const styles = (theme: Theme) => createStyles({
  root: {
    marginTop: 64,
    height: '100%'
  },
})

function main(props: WithStyles<typeof styles>) {
  const { classes } = props

  return (
    <div className={classes.root}>
      <Switch>
        <Route exact path='/' component={home} />
        <Route path='/page1' component={page1} />
        <Route path='/SimpleCLITransformationEditor' component={SimpleCLITransformationEditor} />
        
        <Route path='/TestImages' component={TestImages} />
        <Route path='/download' component={DownloadResult} />
        <Route path='/convertDemo' component={convertDemo} /> 
      </Switch>
    </div>
  )
}

export default withStyles(styles)(main)