import * as React from 'react'
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles'
import { Route, Switch } from 'react-router'
import {CompositeCommands} from '../page/CompositeCommands'
import home from '../page/home'
import SimpleCLITransformationEditor from '../components/SimpleCLITransformationEditor'
import TestImages from '../components/TestImages';
import convertDemo from '../page/convertDemo/convertDemo';
// import DownloadResult from '../page/imageFrame/DownloadResult';
import { ImageFrameTransformation } from '../page/imageFrame/ImageFrameTransformation';
// import imageFrameTool from '../page/imageFrame/imageFrameTool';

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
        <Route path='/convertDemo' component={convertDemo} /> imageFrame
        <Route path='/imageFrame' component={ImageFrameTransformation} />
        <Route path='/compositeCommands' component={CompositeCommands} />
        <Route path='/SimpleCLITransformationEditor' component={SimpleCLITransformationEditor} />
        <Route path='/TestImages' component={TestImages} />
        {/* <Route path='/download' component={DownloadResult} /> */}
      </Switch>
    </div>
  )
}

export default withStyles(styles)(main)