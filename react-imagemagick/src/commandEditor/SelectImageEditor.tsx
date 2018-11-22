import * as React from 'react'
import { ArgumentEditorProps, ArgumentEditorState } from 'imagemagick-browser';
import {MagickInputFile, getInputFilesFromHtmlInputElement} from 'wasm-imagemagick'

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
  }

  render() {
    return (
      <div>
        <input type="file" onChange={this.onChange.bind(this)}></input>
      </div>
    )
  }

  async onChange(e: React.ChangeEvent) {
    // fromin
    const files = await getInputFilesFromHtmlInputElement(e.currentTarget as HTMLInputElement)
    // const inputFiles: MagickInputFile[] = files.map(f=>({name: f.file.name, content: f.content}))
    this.props.onChange({value: files, argument: this.props.argument})
  }
}