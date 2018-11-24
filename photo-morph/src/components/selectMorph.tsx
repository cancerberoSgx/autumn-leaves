import * as React from "react"
import { ChangeEvent } from "react"
import { connect } from "react-redux"
import { morphs } from "src/model/morphs"
import { selectMorph, SelectMorphAction, setOutputImage, SetOutputImageAction } from "src/store/actions"
import { ImageState, MorphState, RootState } from "src/store/store"
import { asInputFile, asOutputFile, buildImageSrc, execute, extractInfo, getFileNameExtension, loadImageElement } from "wasm-imagemagick"

interface SelectMorphProps  {
  selectMorph: (index: number)=> SelectMorphAction
  setOutputImage: (image: ImageState)=> SetOutputImageAction
  morphs: MorphState[]
  images: ImageState[]
  outputImage: ImageState
}

interface SelectMorphState {
}

class SelectMorph extends React.Component<SelectMorphProps, SelectMorphState> {

  state: SelectMorphState = {
  }

  constructor(props: SelectMorphProps, state: SelectMorphState) {
    super(props, state)
  }

  render(): React.ReactNode {
    return (
      <div  > 
        
        <select onChange={this.morphSelected.bind(this)}>
      {this.props.morphs.map(m => <option>{m.name}</option>)}
    </select>
    <p><strong>{this.props.morphs.find(m=>m.isSelected).name}</strong>{this.props.morphs.find(m=>m.isSelected).description}</p>
    <br />

    {/* {this.props.outputImage ? <img src={this.props.outputImage.src} ></img> : ""} */}
    {this.props.outputImage ? <img id="outputImage" ></img> : ""}
      </div>
    )
  }
    async morphSelected(e: ChangeEvent<HTMLSelectElement>) {
      const morph = morphs.find((m,i)=>this.props.morphs[e.target.selectedIndex].name===m.name)
      const selectedImages = this.props.images.filter(img=>img.isSelected)
      const inputFiles =selectedImages.map(i=>i.file)
      
      // resize the images so they have same dimensions. TODO: move this to the morph command itself
      const newSize = `${selectedImages[0].info.image.geometry.width}x${selectedImages[0].info.image.geometry.height}`
      const extension = getFileNameExtension(inputFiles[1].name)
      const resizeCommands = `convert ${inputFiles[1].name} -resize ${newSize}> -size ${newSize} xc:white +swap -gravity center -composite newImage.${extension}`
      const resizeResult = await execute({inputFiles, commands: resizeCommands})
      inputFiles[1] = await asInputFile(resizeResult.outputFiles[0])
  
      const commands = morph.command.replace("$$IMAGES", inputFiles.map(f => f.name).join(" "))
      const result = await execute({ inputFiles, commands })
      
      const file = result.inputFiles[0]

      this.props.setOutputImage({
        file, 
        name: file.name,
        href: URL.createObjectURL((await asOutputFile(file)).blob),
        info: (await extractInfo(file))[0],
        isSelected: false,
        src: await buildImageSrc(file)
      })

      await loadImageElement(result.outputFiles[0], document.getElementById("outputImage") as HTMLImageElement)
    }

}
const mapStateToProps = (state: RootState) => ({
  morphs: state.morphs, 
  images: state.images,
  outputImage: state.outputImage
})

export default connect(
  mapStateToProps,
  {selectMorph, setOutputImage}
)(SelectMorph)
​

