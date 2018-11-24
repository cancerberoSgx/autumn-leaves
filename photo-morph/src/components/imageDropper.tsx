import { createFolderDropManager, FolderDropManager, FolderDropManagerEvent} from 'folder-drop-manager'
import * as React from 'react';
import {style} from 'typestyle'

export interface ImageDropperProps  {
  dontInstall?: boolean
  onChange: (e: FolderDropManagerEvent&{files: ImageDropperFile[]})=>void
}
export interface ImageDropperState {
  files: ImageDropperFile[], 
  state: 'inactive'| 'loading'| 'finish'
}
const styles = {
  dropper: style({
    width: '50%',
    height: '100px',
    border: '2px solid pink',
  })
}
export class ImageDropper extends React.Component<ImageDropperProps, ImageDropperState> {

  state: ImageDropperState = {
    files: [], 
    state: 'inactive'
  }
  manager: FolderDropManager
  constructor(props: ImageDropperProps, state: ImageDropperState) {
    super(props, state)
    this.manager = createFolderDropManager({readAs: 'DataURL'})
  }

  render(): React.ReactNode {
    return (
      <div className={styles.dropper} id="imageDropArea">
      </div>
    )
  }

  componentDidMount(){
    if(!this.props.dontInstall){
      this.manager.install(document.getElementById('imageDropArea'), this.folderDDListener.bind(this))
    }
  }
  folderDDListener(event: FolderDropManagerEvent) {
    
    if(event.type==='finish'){
      this.setState({...this.state, state: 'finish'})
      this.props.onChange({...event, ...this.state})
    }
    else if (event.file.isFile) {
      this.state.files.push({fileName: event.file.fullPath, content: event.file.content as string})
      this.setState({...this.state, state: 'loading'})
    }
  }
}

export interface ImageDropperFile {
  fileName: string, content:  string
}