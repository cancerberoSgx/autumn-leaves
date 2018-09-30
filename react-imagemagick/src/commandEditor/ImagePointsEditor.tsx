import * as React from 'react';
import Draggable, { DraggableData } from 'react-draggable';
import { ArgumentEditorProps, ArgumentEditorState } from 'imagemagick-browser';


export interface Point {
  x: number
  y: number
}

export interface PointHandler extends Point {
  // point: Point
  id: string
  name?: string
}

export interface ImagePointsEditorProps extends ArgumentEditorProps<PointHandler[]> {
  imageWidth: number
  imageHeight: number
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

  render(): React.ReactNode {
    return (
      <div >
        <p>Just a test for drag handles on top of an image - starting point for a point visual editor for IM operations </p>
        <div>

          <img src="holocaust.jpg" id="ImagePointsEditorImage"></img>

          {this.state.value.map(point =>{
            // console.log({ x: point.x, y: this.props.imageHeight * -1 + point.y });
            
              return <Draggable
                key={point.id}
                // axis="x"
                handle=".handle"
                defaultPosition={{ 
                  x: point.x, 
                  y: this.props.imageHeight * -1 + point.y 
                }}
                // position={null}
                // bounds="parent"
                // grid={[25, 25]}
                onStart={(e1, e2)=>{this.handleStart(e1, e2, point)}}
                onDrag={(e1, e2)=>{this.handleDrag(e1, e2, point)}}
                onStop={(e1, e2)=>{this.handleStop(e1, e2, point)}}
                >
                <div>
                  <div className="handle">X</div>
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
    point.y = coords.y
    this.setState({...this.state})


    // const value = this.props.isInteger ? parseInt(changeEvent.target.value) : parseFloat(changeEvent.target.value)
    // this.setState({ value })
    // this.props.onChange({ value, changeEvent, argument: this.props.argument })


    this.props.onChange({value: this.state.value, argument: this.props.argument })
    // this.props.onDrop(this.state.points, [point])
    // console.log();
  }
  private getCoordsRelativeToImage(e1: MouseEvent): Point {
    const el = document.getElementById('ImagePointsEditorImage')
    // console.log(point, el.offsetLeft, el.offsetTop);    
    return {
      x: e1.clientX - el.offsetLeft,
      y: e1.clientY - el.offsetTop
    }
  }

}


