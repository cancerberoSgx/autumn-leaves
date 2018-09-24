import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import * as React from 'react';
// import { Argument, ArgumentType } from './types';
// import { ArgumentEditorState, ArgumentEditorProps } from './types';
import { Color } from 'csstype';
import { CommandTemplate, ArgumentChangeEvent, CommandEditorProps, TemplateContext, Argument } from './CommandTemplate';
import { ColorPickerEditor } from './ArgumentEditor';
import { query } from '../../../util/misc';
import { Command } from '../../../imagemagick';
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
    if (props.commandTemplate.arguments) {
      props.commandTemplate.arguments.forEach(arg => {
        this.state.templateContext[arg.id] = this.props.templateContext[arg.id] || 'undefined'
      })
    }
    this.state.commands = props.commandTemplate.commands
    this.setState({ ...this.state })
  }

  render(): React.ReactNode {
    // const { classes, theme }: { classes: any, theme?: Theme } = this.props
    return (
      <div className={this.props.classes.root}>
        {(() => {
          // TODO: split this to different classes responsibilities:
          if (this.props.commandTemplate.template && this.props.commandTemplate.arguments) {
            return this.props.commandTemplate.arguments.map(arg =>
              <div>
                {arg.name}: <ColorPickerEditor {...this.props as any}
                  onChange={(event: ArgumentChangeEvent<Color>) => this.argumentChangeEvent(arg, event)}
                />
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
  argumentChangeEvent  (arg: Argument, event: ArgumentChangeEvent<Color>) {
    this.state.templateContext[arg.id] = event.value
    const value = this.props.commandTemplate.template(this.state.templateContext)
    this.props.onChange({ commandTemplate: this.props.commandTemplate, value })
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

