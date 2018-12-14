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
    width: "99%",
    textAlign: "center",
    paddingTop: "8px",
    height: "50px",
    background: "#9977aa",
    borderRadius: "5px",
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
      Or Drag and Drop some files or folders from your file system
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
