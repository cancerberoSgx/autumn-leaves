import { Argument, ArgumentChangeEvent, ArgumentType, Command, CommandEditorProps as CommandEditorPropsBase, SizedImageContext, TemplateContext } from 'imagemagick-browser';
import * as React from 'react';
import { ColorPickerEditor } from './ColorPickerEditor';
import { ImagePointsEditor } from './ImagePointsEditor';
import { NumberEditor } from './NumberEditor';
import { SelectOneEditor } from './SelectOneEditor';

export interface CommandEditorProps extends CommandEditorPropsBase {
  templateContext: SizedImageContext
  imageSrc: string
  imageWidth: () => number
  imageHeight: () => number
}

export interface CommandEditorState {
  commands: Command[]
  jsonError?: string
  templateContext: TemplateContext
  imageSrc: string
}
/**
 * component able to render given command templates. Will delegate on concrete value editor implementations in componenets/commandEditor
 */
export class CommandEditor extends React.Component<CommandEditorProps, CommandEditorState> {

  state: CommandEditorState

  constructor(props: CommandEditorProps, state: CommandEditorState) {
    super(props, state)
    this.state = {
      commands: [],
      templateContext: {},
      imageSrc: '',
    }
    this.setStateDefaults()
    this.state.commands = props.commandTemplate.commands
  }

  private setStateDefaults() {
    if (this.props.commandTemplate.arguments) {
      this.props.commandTemplate.arguments.forEach(arg => {
        // const c: any = this.state.templateContext
        (this.state.templateContext as any)[arg.id] = (this.state.templateContext as any)[arg.id] ||
          this.props.templateContext && (this.props.templateContext as any)[arg.id] || this.props.commandTemplate.defaultTemplateContext &&
          (this.props.commandTemplate.defaultTemplateContext as any)[arg.id] || undefined
      })
    }
  }

  componentDidUpdate() {
    this.setStateDefaults()
  }

  render(): React.ReactNode {

    return (
      <div>
        <h4>{this.props.commandTemplate.name}</h4>
        <p>{this.props.commandTemplate.description}</p>
        <p><em>Heads up!</em>The editor controls currently don't work correctly and you might need to modify them (or all of them) in order to start applying the real thing...</p>
        <ul>
          {(() => {
            return this.props.commandTemplate.arguments.map(arg => {
              const context = {
                ...this.state.templateContext,
                imageWidth: this.props.imageWidth(),
                imageHeight: this.props.imageHeight()
              }
              return <li>
                {arg.name}: {buildArgumentEditor(arg, context, e => this.argumentChangeEvent(arg, e), this.props.imageSrc)}
              </li>
            })
          })()}
        </ul>
      </div>
    )
  }

  protected argumentChangeEvent(arg: Argument, event: ArgumentChangeEvent<any>) {
    (this.state.templateContext as any)[arg.id] = event.value
    this.setTemplateValue()
  }

  protected setTemplateValue() {
    (this.state.templateContext as any).imageWidth = this.props.imageWidth();
    (this.state.templateContext as any).imageHeight = this.props.imageHeight()
    const value = this.props.commandTemplate.template(this.state.templateContext)
    this.state.commands = value
    this.setState({ ...this.state })
    this.props.onChange({ commandTemplate: this.props.commandTemplate, value })
  }

  componentDidMount() {
    this.setTemplateValue()
  }
}


function buildArgumentEditor<T>(arg: Argument, templateContext: SizedImageContext, onChange: (e: ArgumentChangeEvent<T>) => void, imageSrc: string) {

  const val = (templateContext as any)[arg.id]
  if (arg.type === ArgumentType.color) {
    return <ColorPickerEditor
      value={val + ''}
      argument={arg}
      onChange={onChange as any}
    />
  }
  else if (arg.type === ArgumentType.number) {
    const value = parseInt(val + '')
    return <NumberEditor
      value={value}
      argument={arg}
      onChange={onChange as any}
    />
  }
  else if (arg.type === ArgumentType.selectOne) {
    return <SelectOneEditor
      value={val + ''}
      select={arg.list}
      argument={arg}
      onChange={onChange as any}
    />
  }
  else if (arg.type === ArgumentType.imagePoints) {

    return <ImagePointsEditor
      imageWidth={templateContext.imageWidth}
      imageHeight={templateContext.imageHeight}
      imageSrc={imageSrc}
      value={arg.points}
      argument={arg}
      onChange={onChange as any}
    />
  }
  else {
    return <div>Sorry, dont know how to represent {arg.type}, yet</div>
  }
}