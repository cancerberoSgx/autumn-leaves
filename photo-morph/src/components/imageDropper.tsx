import { createFolderDropManager, FolderDropManager, FolderDropManagerEvent} from "folder-drop-manager"
import * as React from "react"
import {style} from "typestyle"

export interface ImageDropperProps  {
  dontInstall?: boolean
  onChange: (e: FolderDropManagerEvent&{files?: ImageDropperFile[]})=>void
}

export interface ImageDropperFile {
  fileName: string, content:  string
}

const styles = {
  dropper: style({
    width: "100%",
    height: "60px",
    border: "2px solid pink",
  })
}

export class ImageDropper extends React.Component<ImageDropperProps, {}> {

  state: {} = {  }

  manager: FolderDropManager

  files: ImageDropperFile[] = []

  constructor(props: ImageDropperProps, state: {}) {
    super(props, state)
    this.manager = createFolderDropManager({readAs: "DataURL"})
  }
  
  render(): React.ReactNode {
    return (
      <div className={styles.dropper} id="imageDropArea">
      </div>
    )
  }

  componentDidMount(){
    if(!this.props.dontInstall){
      this.manager.install(document.getElementById("imageDropArea"), this.folderDDListener.bind(this))
    }
  }
  
  folderDDListener(event: FolderDropManagerEvent) {    
    if(event.type==="finish"){
      this.props.onChange({...event, files: this.files})
        this.files = []
    }
    else if (event.file.isFile) {
      this.props.onChange({...event})
      this.files.push({fileName: event.file.fullPath, content: event.file.content as string})
    }
  }
}
