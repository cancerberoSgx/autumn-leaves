import * as React from 'react';
import Draggable, { DraggableData } from 'react-draggable';
import { ArgumentEditorProps, ArgumentEditorState, PointHandler, Point, SizedImageContext } from 'imagemagick-browser';


export interface ImagePointsEditorProps extends ArgumentEditorProps<PointHandler[]>, SizedImageContext {
  // imageWidth: number
  // imageHeight: number
  imageSrc: string
  // points: PointHandler[]
  // onDrop: (points: PointHandler[], changed: PointHandler[]) => void
}

export interface ImagePointsEditorState extends ArgumentEditorState<PointHandler[]>{
  // points: PointHandler[]
}

export class ImagePointsEditor extends React.Component<ImagePointsEditorProps, ImagePointsEditorState> {

  state: ImagePointsEditorState = {
    // points: []
    value: []
  }

  constructor(props: ImagePointsEditorProps, state: ImagePointsEditorState) {
    super(props, state)
    // this.setState({ ...this.state, points: props.points })
    this.state.value= props.value
    // console.log('props', props, this.props);

  }
  getHandleStyle(point: PointHandler): any{
    return {
      display: 'float',
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
                // position={{ 
                //   x: point.x, 
                //   y: this.props.imageHeight * -1 + point.y 
                // }}
                onStart={(e1, e2)=>{this.handleStart(e1, e2, point)}}
                onDrag={(e1, e2)=>{this.handleDrag(e1, e2, point)}}
                onStop={(e1, e2)=>{this.handleStop(e1, e2, point)}}
                >
                <div style={this.getHandleStyle(point)}>
                  <div className="handle">{point.name||point.id}</div>
                </div>
              </Draggable>
          })}

        </div>
      </div>
    )
  }
  handleStart(e1: MouseEvent, e2: DraggableData, point: PointHandler) {
    // console.log(e2);
  }
  handleDrag(e1: MouseEvent, e2: DraggableData, point: PointHandler) {
    // console.log(e2);
  }
  handleStop(e1: MouseEvent, e2: DraggableData, point: PointHandler) {
    const coords = this.getCoordsRelativeToImage(e1)
    // const point = this.state.points[0] // TODO
    point.x = coords.x
    point.y = coords.y + this.props.imageHeight 
    // debugger
    this.setState({...this.state})

    this.props.onChange({value: this.state.value, argument: this.props.argument })
  }
  private getCoordsRelativeToImage(e1: MouseEvent): Point {
    // debugger
    const el = document.getElementById('ImagePointsEditorImage') 
    const absolute = getElementabsoluteCoords(el)
    // console.log({x: e1.screenX, y: e1.screenY}, absolute)
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


