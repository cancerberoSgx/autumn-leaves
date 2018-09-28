import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { Argument, ArgumentChangeEvent, ArgumentType, Color, Command, CommandEditorProps as CommandEditorPropsBase, SizedImageContext, TemplateContext } from 'imagemagick-browser';
import * as React from 'react';
import { query } from '../../../util/misc';
import { getLastImageSize } from '../../page/imageFrame/ImageFrameTransformation';
import { ColorPickerEditor } from './ColorPickerEditor';
import { NumberEditor } from './NumberEditor';

const styles = (theme: Theme) => createStyles({
  root: {
  },
  error: {
    fontWeight: 'bold'
  },
  input: {
  }
})

export interface CommandEditorProps extends CommandEditorPropsBase, WithStyles<typeof styles> {
  templateContext: SizedImageContext
}

export interface CommandEditorState {
  commands: Command[]
  jsonError?: string
  templateContext: TemplateContext
}

export class CommandEditor extends React.Component<CommandEditorProps, CommandEditorState> {

  state: CommandEditorState

  constructor(props: CommandEditorProps, state: CommandEditorState) {
    super(props, state)
    this.state = {
      commands: [],
      templateContext: {}
    }
    this.setStateDefaults()

    this.state.commands = props.commandTemplate.commands
    this.setState({ ...this.state })
  }

  private setStateDefaults() {
    if (this.props.commandTemplate.arguments) {
      this.props.commandTemplate.arguments.forEach(arg => {
        this.state.templateContext[arg.id] = this.state.templateContext[arg.id] || this.props.templateContext && this.props.templateContext[arg.id] || this.props.commandTemplate.defaultTemplateContext && this.props.commandTemplate.defaultTemplateContext[arg.id] || undefined
      })
    }
  }

  componentDidUpdate() {
    this.setStateDefaults()
  }

  render(): React.ReactNode {
    return (
      <div className={this.props.classes.root}>
        {(() => {
          // TODO: split this to different classes responsibilities:
          if (this.props.commandTemplate.template && this.props.commandTemplate.arguments) {
            return this.props.commandTemplate.arguments.map(arg =>
              <div>
                {arg.name}:
                {(() => {
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
  
  protected setTemplateValue() {
    this.state.templateContext.imageWidth = getLastImageSize().width
    this.state.templateContext.imageHeight = getLastImageSize().height
    const value = this.props.commandTemplate.template(this.state.templateContext)
    this.setState({ ...this.state })
    this.props.onChange({ commandTemplate: this.props.commandTemplate, value })
  }

  // old code - only useful for tramsformations without editors. TODO: remove them and this.
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

  componentDidMount() {
    this.setTemplateValue()
  }
}
export const ArgumentEditor = withStyles(styles, { withTheme: true })(CommandEditor as any)

