import * as React from 'react'
import { inputFileToUint8Array, MagickFile, ArgumentEditorProps, MagickInputFile, ArgumentEditorState } from 'imagemagick-browser';

export interface SelectImageEditorProps extends ArgumentEditorProps<MagickInputFile[]> {

}

export interface SelectImageEditorState extends ArgumentEditorState<MagickInputFile[]> {
}

export class SelectImageEditor extends React.Component<SelectImageEditorProps, SelectImageEditorState> {

  state : SelectImageEditorState= {
    value: [] as MagickInputFile[]
  }

  constructor(props: SelectImageEditorProps, state: SelectImageEditorState) {
    super(props, state)    
    this.state.value = props.value || []
    // this.setState({...this.state })
    // console.log('NumberEditor props', this.state.value);
  }

  render() {
    return (
      <div>
        <input type="file" onChange={this.onChange.bind(this)}></input>
      </div>
    )
  }

  async onChange(e: React.ChangeEvent) {
    const files = await inputFileToUint8Array(e.currentTarget as HTMLInputElement)
    const inputFiles: MagickInputFile[] = files.map(f=>({name: f.file.name, content: f.content}))
    this.props.onChange({value: inputFiles, argument: this.props.argument})
  }
}