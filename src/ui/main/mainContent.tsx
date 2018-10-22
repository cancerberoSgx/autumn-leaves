import * as React from 'react'
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles'
import { Route, Switch } from 'react-router'
import {CompositeCommands} from '../page/CompositeCommands'
import home from '../page/home'
import SimpleCLITransformationEditor from '../components/SimpleCLITransformationEditor'
import {ConvertDemo} from '../page/convertDemo/convertDemo';
import { ImageFrameTransformation } from '../page/imageFrame/ImageFrameTransformation'
import { Logger } from './logger';
import { EncipherComponent } from '../page/encipherImage';
import { ImageInformationComponent } from '../page/imageInformation';

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
    <Logger/>
      <Switch>
        <Route exact path='/' component={ImageFrameTransformation} />
        <Route path='/imageFrame' component={ImageFrameTransformation} />
        <Route path='/imageFrame/:template' component={ImageFrameTransformation} />
        <Route path='/imageFrame/:template/:context' component={ImageFrameTransformation} />
        <Route path='/imageFrame/:template/:context/:imageSrc' component={ImageFrameTransformation} />
        <Route path='/convertDemo' component={ConvertDemo} />  
        <Route path='/encipher' component={EncipherComponent} />  
        <Route path='/imageInformation' component={ImageInformationComponent} />  
        <Route path='/home' component={home} />
        {/* <Route path='/SimpleCLITransformationEditor' component={SimpleCLITransformationEditor} /> */}
        {/* <Route path='/TestImages' component={TestImages} /> */}
        {/* <Route path='/ImageHandleEditorTest' component={ImageHandleEditorTest} /> */}
      </Switch>
    </div>
  )
}

export default withStyles(styles)(main)