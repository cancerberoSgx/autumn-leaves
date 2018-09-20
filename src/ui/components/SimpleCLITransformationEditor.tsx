import * as React from 'react';
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles';
import { doImageMagick } from '../../imagemagick'
import { Button } from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
  input: {
    width: '100%',
    height: '80px'
  }
});

const defaultValue = ["convert", "rotate.png", "-rotate", "90", "-resize", "200%", "out.png"]

function render(props: WithStyles<typeof styles>) {
  const { classes } = props;

  return (<div>

    <p>IM Command</p>
    <textarea defaultValue={JSON.stringify(defaultValue)} className={classes.input + ' input'}></textarea>
    <Button onClick={execute} variant="contained" color="primary" >Execute</Button>

    <p>Suggestions:</p>
    <ul>
      <li>
        ["convert", "rotate.png",  "-morphology", "Hit-and-Miss" , "2x1:1,0", "out.png"]
      </li>
      <li>
        ["convert", "logo:", "-rotate", "90", "-resize", "200%", "out.png"]
      </li>
      <li>
        ["convert", "logo:", "-morphology", "Convolve" , "3x3: 0.0,0.5,0.0  0.5,1.0,0.5   0.0,0.5,0.0", "out.png"]
      </li>
    </ul>
    <p>Source image: </p>
    <img id="srcImage" src="rotate.png" />

    <p>Rotated and enlarged image: </p>
    <img id="rotatedImage" />
    <br /><br />

  </div>
  );
}


function execute() {
  const input = document.querySelector('.input') as HTMLInputElement
  const imArguments = JSON.parse(input.value)
  doImageMagick(imArguments)
}

export default withStyles(styles)(render);