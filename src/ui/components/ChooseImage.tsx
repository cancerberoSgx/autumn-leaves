import * as React from 'react'
import { inputFileToUint8Array, MagickFile, ArgumentEditorProps, MagickInputFile, ArgumentEditorState } from 'imagemagick-browser';

// export interface ChooseImageChangeEvent {
  // files: { content: Uint8Array, file: File }[]
// }
// export interface ChooseImageProps {
//   onFileChange: (e: ChooseImageChangeEvent) => void
// }

// export interface ChooseImageState {
//   images: MagickFile[]
// }
export interface ChooseImageProps extends ArgumentEditorProps<MagickInputFile[]> {
}

export interface ChooseImageState extends ArgumentEditorState<MagickInputFile[]> {
}



export class ChooseImage extends React.Component<ChooseImageProps, ChooseImageState> {

  state : ChooseImageState= {
    value: [] as MagickInputFile[]
  }

  render() {
    return (
      <div>
        {/* Please choose an image<br /> */}
        <input type="file" onChange={this.onChange.bind(this)}></input>
        {/* <p>Or load from the web: <input type="text" placeholder="http://address.to/some/image.png"></input> </p>
            <p>Or, </p>
            <div className="fileDropTarget">
              drag and drop files & folders from your desktop here
            </div> */}
      </div>
    )
  }

  async onChange(e: React.ChangeEvent) {
    const files = await inputFileToUint8Array(e.currentTarget as HTMLInputElement)
    const inputFiles: MagickInputFile[] = files.map(f=>({name: f.file.name, content: f.content}))
    this.props.onChange({value: inputFiles, argument: this.props.argument})
    // this.props.onFileChange({ files })
  }
}