import { FolderDropManagerEvent } from "folder-drop-manager"
import pFilter from "p-filter"
import pMap from "p-map"
import * as React from "react"
import { ChangeEvent } from "react"
import { style } from "typestyle"
import { asInputFile, buildImageSrc, buildInputFile, execute, getFileNameExtension, getInputFilesFromHtmlInputElement, isImage, loadImageElement, MagickInputFile } from "wasm-imagemagick"
import { ExtractInfoResult } from "wasm-imagemagick/dist/src/util/imageExtractInfoTypes"
import "./App.css"
import { ImageDropper, ImageDropperFile } from "./imageDropper"
import { ResponsiveLocalStorageLayout } from "./layout/layout"
import { morphs } from "./morphs"
import { extractInfoOne } from "./util/toCommitInWASMIM" 
 
export interface AppProps {
}
export interface AppState {
  images: MagickInputFile[]
  imagesSrc: string[]
  imagesUrls: string[]
  imagesSelected: boolean[]
  imagesInfo: ExtractInfoResult[]
  status: "idle" | "loading",
  statusText: string
  morphSelectedIndex: number
}

const styles = {
  image: style({
    maxWidth: "50%",
    maxHeight: "200px",
  }),
  header: style({
    textAlign: "center"
  }),
  headerTitle: style({
    fontSize: "1.4em"
  }),
  imageContainer: style({
    display: "inline"
  }),
}
class App extends React.Component<AppProps, AppState> {
  state: AppState = {
    images: [],
    imagesSrc: [],
    imagesUrls: [],
    imagesSelected: [],
    imagesInfo: [],
    status: "idle",
    statusText: "",
    morphSelectedIndex: 0
  }

  public render() {
    return (
      <div>
      <div className="wrapper">

        <div className="box header">
          <header className={styles.header}>
            <h1 className={styles.headerTitle}>Welcome to Photo Morph</h1>
            <p>Create awesome photo morph animations</p>
          </header>

        </div>

        <div className="box fileChoose">
          <p className="App-intro">
            To get started, upload a couple of photos using the file choose or drag&drop some files from your desktop in the pink square:
        </p>
          <input type="file" onChange={this.imageFilesChange.bind(this)}></input>
          <ImageDropper onChange={this.imageDropperChange.bind(this)}>Drop here you images or folders</ImageDropper>
        </div>

        <div className="box images">
          <p>Here your will be your images, select a couple, or more to make a photo morph animation: </p>
          {this.state.imagesSrc.map((src, i) =>
            <div className={styles.imageContainer} key={i}>
              <img className={styles.image} src={src}></img>
              <br />
              <input type="checkbox" checked={this.state.imagesSelected[i]} onChange={this.imageSelected.bind(this)} data-image-index={i}></input>
              <a href={this.state.imagesUrls[i]} target="_blank">{this.state.images[i].name}</a>
              <p>Size: {this.state.imagesInfo[i].image.geometry.width}x{this.state.imagesInfo[i].image.geometry.height}</p>
            </div>
          )}
        </div>

        <div className="box morphs">
          <p>Select a Morph</p>
          <select onChange={this.morphSelected.bind(this)}>
            {morphs.map(m => <option>{m.name}</option>)}
          </select>
          <p><strong>{morphs[this.state.morphSelectedIndex].name}</strong>{morphs[this.state.morphSelectedIndex].description}</p>
          <br />
          <img id="morphImage"></img>
        </div>

      </div>
      {/* <ResponsiveLocalStorageLayout app={this}></ResponsiveLocalStorageLayout> */}
      </div>
    )
  }
  async morphSelected(e: ChangeEvent<HTMLSelectElement>) {
    this.state.morphSelectedIndex = e.target.selectedIndex
    this.applyMorph()
  }
  async applyMorph() {
    const morph = morphs[this.state.morphSelectedIndex]

    const inputFiles = this.state.imagesSelected.map((sel, i) => sel && this.state.images[i]).filter(a => a)// .slice(0,1)
    
    // resize the images so they have same dimensions. TODO: move this to the morph command itself
    const inputFilesInfo = this.state.imagesInfo.filter((info, i)=>this.state.imagesSelected[i])
    const newSize = `${inputFilesInfo[0].image.geometry.width}x${inputFilesInfo[0].image.geometry.height}`
    // debugger
    const resizeCommands = `convert ${inputFiles[1].name} -resize ${newSize}> -size ${newSize} xc:white +swap -gravity center -composite newImage.${getFileNameExtension(inputFiles[1].name)}`
    const resizeResult = await execute({inputFiles, commands: resizeCommands})
    inputFiles[1] = await asInputFile(resizeResult.outputFiles[0])

    const commands = morph.command.replace("$$IMAGES", inputFiles.map(f => f.name).join(" "))
    const result = await execute({ inputFiles, commands })
    await loadImageElement(result.outputFiles[0], document.getElementById("morphImage") as HTMLImageElement)
    this.setState({ ...this.state })
  }
  imageSelected(e: ChangeEvent<HTMLInputElement>) {
    this.state.imagesSelected[e.target.getAttribute("data-image-index")] = e.target.checked
    this.setState({ ...this.state })
  }
  async imageFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const images = await getInputFilesFromHtmlInputElement(e.target)
    await this.addImages(images)
  }
  async imageDropperChange(e: FolderDropManagerEvent & { files: ImageDropperFile[] }) {
    const images = await pMap(e.files, f => buildInputFile(f.content, f.fileName.substring(f.fileName.lastIndexOf("/"), f.fileName.length)))
    await this.addImages(images)
  }

  async addImages(imgs: MagickInputFile[], andSetState: boolean = true): Promise<void> {
    const validImages = await pFilter(imgs, img => isImage(img))
    this.state.images = this.state.images.concat(validImages)
    this.state.imagesSrc = this.state.imagesSrc.concat(await pMap(validImages, img => buildImageSrc(img)))
    this.state.imagesSelected = await pMap(this.state.images, async (sel, i) => i < this.state.imagesSelected.length ? this.state.imagesSelected[i] : false)
    this.state.imagesInfo = this.state.imagesInfo.concat(await pMap(validImages, img => extractInfoOne(img)))
    if (andSetState) {
      this.setState({ ...this.state })
    }
  }
}

export default App
