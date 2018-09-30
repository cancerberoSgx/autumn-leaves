import * as React from 'react';
import { ImagePointsEditor } from '../components/commandEditor/ImagePointsEditor';

export interface ImageHandleEditorTestProps {
}
export interface ImageHandleEditorTestState {
}

export class ImageHandleEditorTest extends React.Component<ImageHandleEditorTestProps, ImageHandleEditorTestState> {

  state: ImageHandleEditorTestState = {
  }

  constructor(props: ImageHandleEditorTestProps, state: ImageHandleEditorTestState) {
    super(props, state)
  }

  render(): React.ReactNode {
    return (
      <ImagePointsEditor
        imageSrc="holocaust.jpg"
        imageWidth={320}
        imageHeight={240}
        value={[
          {
            id: 'point1',
            x: 10,
            y: 100
          },
          {
            id: 'point2',
            x: 100,
            y: 100
          }
        ]}
        onChange={
          e => {
            console.log(e.value);
          }
        }
      />
    )
  }
}
