import * as React from 'react'
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { inputFileToUint8Array  ,MagickFile} from 'imagemagick-browser';
// import { MagickFile } from '../../imagemagick';

const styles = (theme: Theme) => createStyles({
  paper: {
    color: theme.palette.text.secondary,
    width: '100%'
  },
  fileDropTarget: {
    display: 'block',
    height: '140px',
    backgroundColor: 'green'
  }
})

export interface ChooseImageProps extends WithStyles<typeof styles> {
  onFileChange: (e:any)=>void
}

export interface ChooseImageState {
  images: MagickFile[]
}

export class ChooseImageNaked extends React.Component<ChooseImageProps, ChooseImageState> {

  state = {
    images: [] as MagickFile[]
  }

  render() {
    const { classes } = this.props
  
    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            Please choose an image<br />
            <input type="file" onChange={this.onChange.bind(this)}></input>
            <p>Or load from the web: <input type="text" placeholder="http://address.to/some/image.png"></input> </p>
            <p>Or, </p>
            <div className="fileDropTarget">
              drag and drop files & folders from your desktop here
          </div>
          </Paper>
        </Grid>
      </Grid>
    )
  }

  async onChange(e: React.ChangeEvent) {
    // const input = e.currentTarget as HTMLInputElement
    // const images = []as MagickFile[]
    // for(const file in input.files){
    //   console.log({file});
    // }
    // input.files.map(file=>{
    // })
    // console.log('change!!!', arguments)
    // debugger
    // const fileReader = new FileReader()
    //   const arrayBuffer = fileReader.result
    //   const array = new Uint8Array(arrayBuffer as any)
    //   const binaryString = String.fromCharCode.apply(null, array) 
    const files = await inputFileToUint8Array( e.currentTarget as HTMLInputElement)
    this.props.onFileChange({files})
    // files.forEach(file=>{
    //   console.log(file.file.name);
      
    // })
    // debugger
  }
}
export const ChooseImage = withStyles(styles, { withTheme: true })(ChooseImageNaked)
