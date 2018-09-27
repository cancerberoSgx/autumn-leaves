import * as React from 'react';
import {execute, MagickInputFile, Command} from 'imagemagick-browser'

export interface InputImage extends Partial<MagickInputFile> {
src: string
}
export interface ImageMagickChangeEvent {
  inputFiles: InputImage[]
  oldCommands: Command[]
  newCommands: Command[]
  outputImageElements: HTMLImageElement[]
}
export interface ImageMagickProps {
  inputFiles: InputImage[]
  commands: Command[]
  /** called when imagemagick ends running. result images are provided in the event object */
  onChange?: (event: ImageMagickChangeEvent)=>void
}

export interface ImageMagickState {
  commands: Command[]
  inputFiles: InputImage[]
}

export class ImageMagick extends React.Component<ImageMagickProps, ImageMagickState> {

  state: ImageMagickState = {
    inputFiles: [],
    commands: [],
    
  }

  constructor(props: ImageMagickProps, state: ImageMagickState) {
    super(props, state)
  }

  render(): React.ReactNode {
    return (
      <div >
      </div>
    )
  }
}
