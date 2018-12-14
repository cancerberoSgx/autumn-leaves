import * as React from 'react'
import { ArgumentEditorProps, ArgumentEditorState } from 'imagemagick-browser';
import {MagickInputFile, getInputFilesFromHtmlInputElement} from 'wasm-imagemagick'

export interface SelectFileEditorProps extends ArgumentEditorProps<MagickInputFile[]> {

}

export interface SelectFileEditorState extends ArgumentEditorState<MagickInputFile[]> {
}

export class SelectFileEditor extends React.Component<SelectFileEditorProps, SelectFileEditorState> {

  state : SelectFileEditorState= {
    value: [] as MagickInputFile[]
  }

  constructor(props: SelectFileEditorProps, state: SelectFileEditorState) {
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