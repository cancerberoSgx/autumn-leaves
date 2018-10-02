import { Argument, ArgumentChangeEvent, ArgumentType, Color, Command, CommandEditorProps as CommandEditorPropsBase, SizedImageContext, TemplateContext } from 'imagemagick-browser';
import * as React from 'react';
// import { getLastImageSize } from '../../page/imageFrame/ImageFrameTransformation';
import { ColorPickerEditor } from './ColorPickerEditor';
import { NumberEditor } from './NumberEditor';
import { SelectOneEditor } from './SelectOneEditor';
import { ImagePointsEditor } from './ImagePointsEditor';

export interface CommandEditorProps extends CommandEditorPropsBase {
  templateContext: SizedImageContext
  imageSrc: string
  imageWidth: ()=>number
  imageHeight: ()=>number
}

export interface CommandEditorState {
  commands: Command[]
  jsonError?: string
  templateContext: TemplateContext
  imageSrc: string
  // imageWidth: number
  // imageHeight: number
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
      // imageWidth: 0,
      // imageHeight: 0,
    }
    this.setStateDefaults()

    this.state.commands = props.commandTemplate.commands
    // this.setState({ ...this.state })
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
      <div>
        {(() => {
          if (this.props.commandTemplate.template && this.props.commandTemplate.arguments) {
            return this.props.commandTemplate.arguments.map(arg => {
              const context = {
                ...this.state.templateContext,
                imageWidth: this.props.imageWidth(),
                imageHeight: this.props.imageHeight()
              }
              return <div>
                {arg.name}: {buildArgumentEditor(arg, context, e => this.argumentChangeEvent(arg, e), this.props.imageSrc)}
              </div>
            })
          }
        })()}
        {}
      </div>
    )
  }

  protected argumentChangeEvent(arg: Argument, event: ArgumentChangeEvent<any>) {
    this.state.templateContext[arg.id] = event.value
    this.setTemplateValue()
  }

  protected setTemplateValue() {
    this.state.templateContext.imageWidth = this.props.imageWidth()
    this.state.templateContext.imageHeight = this.props.imageHeight()
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

  if (arg.type === ArgumentType.color) {
    return <ColorPickerEditor
      value={templateContext[arg.id] + ''}
      onChange={onChange as any}
    />
  }
  else if (arg.type === ArgumentType.number) {
    const value = parseInt(templateContext[arg.id] + '')
    return <NumberEditor
      value={value}
      onChange={onChange as any}
    />
  }
  else if (arg.type === ArgumentType.selectOne) {
    return <SelectOneEditor
      value={templateContext[arg.id] + ''}
      select={arg.list}
      onChange={onChange as any}
    />
  }
  else if (arg.type === ArgumentType.imagePoints) {

    return <ImagePointsEditor
      imageWidth={templateContext.imageWidth}
      imageHeight={templateContext.imageHeight}
      imageSrc={imageSrc}
      value={arg.points}
      onChange={onChange as any}
    />
  }
  else {
    return <div>Sorry, dont know how to represent {arg.type}, yet</div>
  }
}