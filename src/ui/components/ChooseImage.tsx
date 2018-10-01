import * as React from 'react'
import { inputFileToUint8Array, MagickFile } from 'imagemagick-browser';

export interface ChooseImageChangeEvent {
  files: { content: Uint8Array, file: File }[]
}
export interface ChooseImageProps {
  onFileChange: (e: ChooseImageChangeEvent) => void
}

export interface ChooseImageState {
  images: MagickFile[]
}

export class ChooseImage extends React.Component<ChooseImageProps, ChooseImageState> {

  state = {
    images: [] as MagickFile[]
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
    this.props.onFileChange({ files })
  }
}