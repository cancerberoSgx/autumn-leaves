import * as React from 'react';
import { execute, MagickInputFile, Command, ExecuteConfig, MagickFile, readImageUrlToUintArray } from 'imagemagick-browser'

export interface InputImage  {
  src?: string
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
  onChange?: (event: ImageMagickChangeEvent) => void
  autoStart: boolean
}

export interface ImageMagickState {
  commands: Command[]
  inputFiles: MagickInputFile[]
  outputImageIds: string[]
}

/**
 * Component that let user declare a IM command, provide input images, show IM result transformation and be notified when IM finish proceessing with output images. 
 * TODO : spinner when IM is working
 */
export class ImageMagick extends React.Component<ImageMagickProps, ImageMagickState> {

  // state: ImageMagickState = {
  //   inputFiles: [],
  //   commands: [],
  //   outputImageIds: []
  // }

  // constructor(props: ImageMagickProps, state: ImageMagickState) {
  //   super(props, state)
    // this.setState({
    //   ...this.state, 
    //   commands: props.commands, 
    //   inputFiles: props.inputFiles.map(f=>{name: f.src, content: null}), 
    //   outputImageIds: this.state.inputFiles.map(file=>file.name)
    // })
    // this.outputImageIds = this.state.inputFiles.map(file=>file.name)
  // }

  // componentDidUpdate(){
  //   this.executeImageMagick()
  // }
  // componentDidMount(){
  //   this.executeImageMagick()
  // }

  // private outputImageIds: string[]
  // protected async executeImageMagick(){
    // const config: ExecuteConfig = {
      // commands: this.state.commands,
      // inputFiles: await this.ensureImageContentRead(this.state.inputFiles)
    // }
  // }
  
  // async ensureImageContentRead(images: InputImage[]): Promise<MagickInputFile[]>{
    // return images.map(async i=>{
    //   if(!i.content){
    //     i.content = await readImageUrlToUintArray(i.src)
    //   }
    //   return {src: i.src,content: i.content || }
    // })as MagickInputFile[]
  // }

  // render(): React.ReactNode {
  //   return (
  //     <div >
  //       {this.state.outputImageIds.map(id=>
  //         <img src="" id={id} key={id}/>
  //       )}
  //     </div>
  //   )
  // }
}

