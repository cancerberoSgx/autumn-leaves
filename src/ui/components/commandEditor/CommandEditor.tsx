import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import * as React from 'react';
// import { Argument, ArgumentType } from './types';
// import { ArgumentEditorState, ArgumentEditorProps } from './types';
import { Color } from 'csstype';
import { CommandTemplate, ArgumentChangeEvent, CommandEditorProps, TemplateContext, Argument, SizedImageContext, ArgumentType } from './CommandTemplate';
import { ColorPickerEditor } from './ColorPickerEditor';
import { query } from '../../../util/misc';
import { Command } from '../../../imagemagick';
import { getLastImageSize } from '../../page/imageFrame/ImageFrameTransformation';
import { NumberEditor } from './NumberEditor';
// import { ArgumentEditorProps, ArgumentEditorState, ArgumentType } from '../../page/convertDemo/CommandTemplate';


const styles = (theme: Theme) => createStyles({
  root: {
  },
  error: {
    fontWeight: 'bold'
  },
  input: {
  }
});
export interface CommandEditorProps2 extends CommandEditorProps, WithStyles<typeof styles> {
  // template: CommandTemplate
  templateContext: SizedImageContext
}
export interface CommandEditorState {
  commands: Command[]
  jsonError?: string
  // commandTemplate?: CommandTemplate,
  templateContext: TemplateContext
}
export class CommandEditor extends React.Component<CommandEditorProps2, CommandEditorState> {

  state: CommandEditorState

  constructor(props: CommandEditorProps2, state: CommandEditorState) {
    super(props, state)
    this.state = { commands: [], templateContext: {} }
    // this.props.templateContext = this.props.templateContext || {}
    if (props.commandTemplate.arguments) {
      props.commandTemplate.arguments.forEach(arg => {
        // this.state.templateContext[arg.id] = this.props.templateContext && this.props.templateContext[arg.id] || undefined
        this.state.templateContext[arg.id] = this.props.templateContext && this.props.templateContext[arg.id] || this.props.commandTemplate.defaultTemplateContext&&this.props.commandTemplate.defaultTemplateContext[arg.id]||  undefined
      })
    }
    // debugger
    // const imageSize = getLastImageSize()
    // if(this.props.imageSize){
    // this.props.templateContext.imageWidth = imageSize.width
    // this.props.templateContext.imageHeight = imageSize.height
    // }
    this.state.commands = props.commandTemplate.commands
    this.setState({ ...this.state })
  } 


  componentWillUpdate(nextProps: CommandEditorProps2, nextState: CommandEditorState, nextContext: any): void {
    
    // debugger
    // super.componentWillUpdate(nextProps, nextState, nextContext)

    // if (nextProps.commandTemplate.arguments) {
    //   nextProps.commandTemplate.arguments.forEach(arg => {
    //     this.state.templateContext[arg.id] = this.props.templateContext && this.props.templateContext[arg.id] || 'undefined'
    //   })
    // }

    // this.state.templateContext
  }



  render(): React.ReactNode {
    // console.log({render: JSON.stringify(this.state.templateContext)});
    // const { classes, theme }: { classes: any, theme?: Theme } = this.props
    return (
      <div className={this.props.classes.root}>
        {(() => {
          // TODO: split this to different classes responsibilities:
          if (this.props.commandTemplate.template && this.props.commandTemplate.arguments) {
            return this.props.commandTemplate.arguments.map(arg =>
              <div>
                {arg.name}:

                {(() => {
                  // console.log('inside', this.state.templateContext[arg.id]);

                  // console.log('>>>', arg.id, this.state.templateContext[arg.id]);
                  if (arg.type === ArgumentType.color) {
                    
                    return <ColorPickerEditor {...this.props as any}
                      value={this.state.templateContext[arg.id]}
                      onChange={(event: ArgumentChangeEvent<Color>) => this.argumentChangeEvent(arg, event)}
                    />
                  }
                  else if (arg.type === ArgumentType.number) {
                    return <NumberEditor {...this.props as any}
                      value={this.state.templateContext[arg.id]}
                      onChange={(event: ArgumentChangeEvent<Color>) => this.argumentChangeEvent(arg, event)}
                    />
                  }
                  else {
                    return <div>Sorry, dont know how to represent {arg.type}, yet</div>
                  }
                })()}

              </div>)
          }
          else {
            return <div>
              <input className={this.props.classes.input} type="text"
                value={JSON.stringify(this.state.commands)}
                onChange={e => this.commandInputChange(e)}
              />
              <p className={this.props.classes.error}>{this.state.jsonError || ''}</p>
              hello
              </div>
          }
        })()}
        {}
      </div>
    )
  }

  argumentChangeEvent(arg: Argument, event: ArgumentChangeEvent<Color>) {
    this.state.templateContext[arg.id] = event.value
    this.setTemplateValue()
  }
  protected setTemplateValue(){
    this.state.templateContext.imageWidth = getLastImageSize().width
    this.state.templateContext.imageHeight = getLastImageSize().height
    const value = this.props.commandTemplate.template(this.state.templateContext)
    this.props.onChange({ commandTemplate: this.props.commandTemplate, value })
    this.setState({...this.state})
  }

  commandInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const commands: Command[] = []
    query('.' + this.props.classes.input)
      .forEach((input: HTMLInputElement) => {
        let value
        try {
          value = JSON.parse(e.target.value)
          this.setState({ ...this.state, jsonError: '' })
        } catch (error) {
          this.setState({ ...this.state, jsonError: 'JSON Syntax error: ' + error })
        }
        commands.push(value)
      })
    this.setState({ ...this.state, commands })
  }

  // /**
  //  * implementation must notify here when the value changes in the UI
  //  */
  // valueChanged(value: Color) {
  //   this.setState({ ...this.state, value })
  // }
}
export const ArgumentEditor = withStyles(styles, { withTheme: true })(CommandEditor as any);

