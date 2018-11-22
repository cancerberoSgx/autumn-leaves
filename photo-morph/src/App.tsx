import { FolderDropManagerEvent } from 'folder-drop-manager';
import pMap from 'p-map';
import * as React from 'react';
import { buildImageSrc, getInputFilesFromHtmlInputElement, MagickInputFile } from 'wasm-imagemagick';
import './App.css';
import { ImageDropper, ImageDropperFile } from './imageDropper';
import logo from './logo.svg';

export interface AppProps  {
}
export interface AppState {
  toggle: boolean
  inputImages: MagickInputFile[]
  inputImagesSrc: string[]
}


class App extends React.Component<AppProps, AppState> {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Photo Morph</h1>
        </header>
        <p className="App-intro">
          To get started, upload a couple of photos
        </p>
        <input type="file" onChange={this.inputImageFilesChange.bind(this)}></input>
        <ImageDropper onChange={this.imageDropperChange.bind(this)}></ImageDropper>
      </div>
    );
  }
  async inputImageFilesChange(e: React.ChangeEvent<HTMLInputElement>){
    const inputImages = await getInputFilesFromHtmlInputElement(   e.target)
    this.setState({...this.state, inputImages, inputImagesSrc: await pMap(inputImages, i=>buildImageSrc(i))})
  }
  async imageDropperChange(e: FolderDropManagerEvent&{files: ImageDropperFile[]}){

  }
}

export default App;
