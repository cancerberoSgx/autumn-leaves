import * as React from 'react'
import * as PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepButton from '@material-ui/core/StepButton'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { EmptyComponent } from '../../test/emptyComponent'
import DownloadResult from './DownloadResult'
import SimpleCLITransformationEditor from './SimpleCLITransformationEditor';

const styles = (theme: any) => ({
  root: {
    width: '100%',
  },
  button: {
    margin: theme.spacing.unit,
  },
  completed: {
    display: 'inline-block',
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
})

function getSteps() {
  return ['Choose a tool', 'Select images', 'Edit the image with the tool', 'Download the result']
}

function getStepContent(step: number): React.ReactElement<any>|string {
  switch (step) {
    case 0:
      return <div>Step 1: Select a tool<br/><EmptyComponent /></div>
    case 1:
      return 'Step 2: Select images'
    case 2:
      return <div>Step 3: Manipulate images<br/><SimpleCLITransformationEditor/></div>
    case 3:
      return <div>Step 4: Download results<br/><DownloadResult /></div>
    default:
      return 'Unknown step'
  }
}

class ImageTransformationStepper extends React.Component<any, any> {
  state = {
    activeStep: 0,
    completed: new Set(),
  }

  render() {
    const { classes } = this.props
    const steps = getSteps()
    const { activeStep } = this.state

    return (
      <div className={classes.root}>
        <Stepper alternativeLabel nonLinear activeStep={activeStep}>
          {steps.map((label, index) => {
            const props: any = {}
            const buttonProps: any = {}
            // if (this.isStepOptional(index)) {
            //   buttonProps.optional = <Typography variant="caption">Optional</Typography>
            // }
            return (
              <Step key={label} {...props}>
                <StepButton
                  onClick={this.handleStep(index)}
                  completed={this.isStepComplete(index)}
                  {...buttonProps}
                >
                  {label}
                </StepButton>
              </Step>
            )
          })}
        </Stepper>
        <div>
          {/* {this.allStepsCompleted() ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed  
              </Typography>
              <Button onClick={this.handleReset}>Reset</Button>
            </div>
          ) : ( */}
            <div>
              <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className={classes.button}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleNext}
                  className={classes.button}
                >
                  Next
                </Button>
                {/* {activeStep !== steps.length &&
                  (this.state.completed.has(this.state.activeStep) ? (
                    <Typography variant="caption" className={classes.completed}>
                      Step {activeStep + 1} already completed
                    </Typography>
                  ) : (
                    <Button variant="contained" color="primary" onClick={this.handleComplete}>
                      {this.completedSteps() === this.totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                    </Button>
                  ))} */}
              </div>
            </div>
        </div>
      </div>
    )
  }

  totalSteps = () => getSteps().length

  // isStepOptional = (step: number) => {
  //   return false//step === 1
  // }

  handleNext = () => {
    // let activeStep

    // if (this.isLastStep() && !this.allStepsCompleted()) {
    //   // It's the last step, but not all steps have been completed
    //   // find the first step that has been completed
    //   const steps = getSteps()
    //   activeStep = steps.findIndex((step, i) => !this.state.completed.has(i))
    // } else {
      // activeStep = this.state.activeStep + 1
    // }
    this.setState({
      activeStep:  this.state.activeStep + 1,
    })
  }

  handleBack = () => {
    this.setState((state: any) => ({
      activeStep: state.activeStep - 1,
    }))
  }

  handleStep = (step: number) => () => {
    this.setState({
      activeStep: step,
    })
  }

  // handleComplete = () => {
  //   // eslint-disable-next-line react/no-access-state-in-setstate
  //   const completed = new Set(this.state.completed)
  //   completed.add(this.state.activeStep)
  //   this.setState({
  //     completed,
  //   })

  //   /**
  //    * Sigh... it would be much nicer to replace the following if conditional with
  //    * `if (!this.allStepsComplete())` however state is not set when we do this,
  //    * thus we have to resort to not being very DRY.
  //    */
  //   if (completed.size !== this.totalSteps() ) {
  //     this.handleNext()
  //   }
  // }

  handleReset = () => {
    this.setState({
      activeStep: 0,
      completed: new Set(),
      skipped: new Set(),
    })
  }

  isStepComplete(step: number) {
    return this.state.completed.has(step)
  }

  completedSteps() {
    return this.state.completed.size
  }

  allStepsCompleted() {
    return this.completedSteps() === this.totalSteps()
  }

  isLastStep() {
    return this.state.activeStep === this.totalSteps() - 1
  }
}

(ImageTransformationStepper as any).propTypes = {
  classes: PropTypes.object,
}

export default withStyles(styles)(ImageTransformationStepper)
