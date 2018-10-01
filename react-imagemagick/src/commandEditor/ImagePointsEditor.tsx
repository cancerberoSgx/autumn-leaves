import * as React from 'react';
import Draggable, { DraggableData } from 'react-draggable';
import { ArgumentEditorProps, ArgumentEditorState, PointHandler, Point, SizedImageContext } from 'imagemagick-browser';

export interface ImagePointsEditorProps extends ArgumentEditorProps<PointHandler[]>, SizedImageContext {
  imageSrc: string
}

export interface ImagePointsEditorState extends ArgumentEditorState<PointHandler[]>{
}

export class ImagePointsEditor extends React.Component<ImagePointsEditorProps, ImagePointsEditorState> {

  state: ImagePointsEditorState = {
    value: []
  }

  constructor(props: ImagePointsEditorProps, state: ImagePointsEditorState) {
    super(props, state)
    this.state.value= props.value
  }

  getHandleStyle(point: PointHandler): any{
    return {
      display: 'block',
      color: point.color
    }
  }

  render(): React.ReactNode {
    return (
      <div >
        <p>WIP - Please drag all the handlers to fix an issue - then start working with it. WIP</p>

        <div>
          <img src={this.props.imageSrc} id="ImagePointsEditorImage"></img>

          {this.state.value.map(point =>{
              return <Draggable
                key={point.id}
                handle=".handle"
                defaultPosition={{ 
                  x: point.x, 
                  y: point.y  - this.props.imageHeight 
                }}
                // onStart={(e1, e2)=>{this.handleStart(e1, e2, point)}}
                // onDrag={(e1, e2)=>{this.handleDrag(e1, e2, point)}}
                onStop={(e1, e2)=>{this.handleStop(e1, e2, point)}}
                >
                <span style={this.getHandleStyle(point)}>
                  <span className="handle">{point.name||point.id}</span>
                </span>
              </Draggable>
          })}

        </div>
        <textarea defaultValue={JSON.stringify(this.state.value)} onChange={e=>this.inputTextChange(e)}></textarea>
      </div>
    )
  }

  inputTextChange(e: React.ChangeEvent<HTMLTextAreaElement>){
    const value = JSON.parse(e.target.value)//TODO: try
    this.setState({...this.state, value})
  }

  // handleStart(e1: MouseEvent, e2: DraggableData, point: PointHandler) {
  // }

  // handleDrag(e1: MouseEvent, e2: DraggableData, point: PointHandler) {
  // }

  handleStop(e1: MouseEvent, e2: DraggableData, point: PointHandler) {
    const coords = this.getCoordsRelativeToImage(e1)
    point.x = coords.x
    point.y = coords.y + this.props.imageHeight 
    this.setState({...this.state})
    this.props.onChange({value: this.state.value, argument: this.props.argument })
  }

  private getCoordsRelativeToImage(e1: MouseEvent): Point {
    const el = document.getElementById('ImagePointsEditorImage') 
    const absolute = getElementabsoluteCoords(el)
    return {
      x: e1.pageX - absolute.x,
      y: e1.pageY - absolute.y - this.props.imageHeight 
    }
  }
}

function getElementabsoluteCoords(el: HTMLElement): Point{
  return {
    x: window.scrollX + el.getBoundingClientRect().left,
    y: window.scrollY + el.getBoundingClientRect().top
  }
}


