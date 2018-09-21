import * as React from 'react'
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

const styles = (theme: Theme) => createStyles({
  paper: {
    color: theme.palette.text.secondary,
    width: '100%'
  },
  input: {

    width: '100%',
    height: '100px'
  },
  images: {
    td: {
      border: '2px solid #ededed',
      padding: '10px'
    }
  },
  error: {

    margin: 0,
    padding: 0,
    fontWeight: 'bold'
  }
})

function render(props: WithStyles<typeof styles>) {
  const { classes } = props

  return (
    <Paper className={classes.paper}>
      <p>Try an ImageMagick command on different test images. Check out the suggestions!</p>

      <textarea className={classes.input + ' input'} defaultValue='["convert", "$INPUT", "-sigmoidal-contrast", "15x30%", "(", "+clone",  "-sparse-color", "Barycentric", "0,0 black 0,%h gray80", "-solarize", "50%", "-level", "50%,0", ")", "-compose", "Blur", "-set", "option:compose:args", "10", "-composite", "$OUTPUT"]'></textarea>

      <p className="error">
      </p>

      <p>
        <strong>ImageMagick Command: </strong>
        <br />
        <span className="im-command"></span>
      </p>

      {renderSuggestions(props)}
      <br/>
      <br/>
      <Button className="execute" variant="contained" onClick={()=>transformImages()}>Execute</Button>

      {renderImageTable(props)}

    </Paper>
  )
}


function renderSuggestions(props: WithStyles<typeof styles>) {
  return (  <div>

      <p>Suggestions: </p>
      <select className="suggestions" onChange={suggestionChange}>

        <option>["convert", "$INPUT", "-distort", "barrel", "0.7 -0.009 0.0", "-resize", "200%", "$OUTPUT"]</option>

        <option>["convert", "$INPUT", "-rotate", "90","-resize","200%", "$OUTPUT"]</option>

        <option>["convert", "$INPUT", "-sigmoidal-contrast", "4,0%", "$OUTPUT"]</option>

        <option>["convert","$INPUT", "-sparse-color", "Barycentric", "0,0 black 0,%h white", "-function", "polynomial",
      "4,-4,1", "$OUTPUT"]</option>

        <option>["convert", "$INPUT", "-sigmoidal-contrast", "15x30%", "(", "+clone", "-sparse-color", "Barycentric", "0,0
          black 0,%h gray80", "-solarize", "50%", "-level", "50%,0", ")", "-compose", "Blur", "-set",
      "option:compose:args", "10", "-composite", "$OUTPUT"]</option>

        {/* <!-- extracting the 'Hue' by Separating Channel Images, then looking up the 'hue shade' wanted. --> */}
        <option>["convert", "$INPUT", "-colorspace", "HSL", "-channel", "Hue", "-separate", "$OUTPUT"]</option>

        <option>["convert", "$INPUT", "-charcoal", "5", "$OUTPUT"]</option>
        {/* <!-- The Charcoal Sketch Transform, offers users a very simple way of generating a simplified gray-scale rendering of the image. --> */}

        {/* <!-- Convert a simple photo into something children can color in. --> */}
        <option>["convert", "$INPUT", "-edge", "1", "-negate", "-normalize", "-colorspace", "Gray", "-blur", "0x.5", "-contrast-stretch", "0x50%", "$OUTPUT"]</option>

        {/* <!-- Convert a simple photo into something children can color in. --> */}
        <option>["convert", "$INPUT", "-segment", "1x1", "+dither", "-colors", "2", "-edge", "1", "-negate", "-normalize", "$OUTPUT"]</option>

        {/* <!-- <option>["convert", "$INPUT", "-charcoal", "5", "$OUTPUT"]</option> -->
    <!-- ", "-alpha", "set", "-background", "none", -vignette", "0x4"
    ", "  --> */}
        <option>...</option>
        <option>THE FOLLOWING ONES DON'T WORK:</option>
        <option>...</option>

        <option>NOT WORKING AS EXPECTED: ["convert", "$INPUT", "(", "+clone", "-scale", "25%", "-scale", "400%", ")", "("
          ,"+clone", "-gamma", "0",
      "-fill", "white", "-draw", "circle 65,53 50,40", "-blur", "10x4", ")", "-composite", "$OUTPUT"]</option>

        <option>NOT WORKING: see https://github.com/KnicKnic/WASM-ImageMagick/issues/9
          ["convert", "-size", "320x100", "xc:lightblue", "-font", "Candice", "-pointsize", "72", "-tile",
          "pattern:checkerboard", "-annotate", "+28+68", "Sebastian", "$OUTPUT"]
    </option>
        {/* <!-- doesn't work  --> */}
        ",

    <option>NOT WORKING: taken from https://imagemagick.org/Usage//photos/
                                      ["convert", "$INPUT", "-distort", "SRT", "%[fx:aa=$angle*pi/180;(w*abs(sin(aa))+h*abs(cos(aa)))/min(w,h)]",
      "$angle", "$OUTPUT"]</option>
        {/* <!-- doesnt work - taken from https://imagemagick.org/Usage//photos/--> */}


      </select>

    </div>
  )
}

function renderImageTable(props: WithStyles<typeof styles>) {
  const { classes } = props
  return (
    <div>
      <p>Images: </p>

      <table className={classes.images + ' images'}>
        <tbody>
          <tr>
            <td>
              <img id="srcImage1" src="rotate.png" /><br />rotate.png
          </td>
            <td>
              <img className="spinner" src="spinner.gif" />
              <img id="outputImage1" />
            </td>
            <td>
              <p className="took"></p>
            </td>
          </tr>

          <tr>
            <td>
              <img id="srcImage5" src="zelda.gif" /><br />zelda.gif
          </td>
            <td>
              <img className="spinner" src="spinner.gif" />
              <img id="outputImage5" />
            </td>
            <td>
              <p className="took"></p>
            </td>
          </tr>

          <tr>
            <td>
              <img id="srcImage3" src="Hermitcrab.gif" /><br />Hermitcrab.gif
          </td>
            <td>
              <img className="spinner" src="spinner.gif" />
              <img id="outputImage3" />
            </td>
            <td>
              <p className="took"></p>
            </td>
          </tr>

          <tr>
            <td>
              <img id="srcImage2" src="gnu.jpg" /><br />gnu.jpg
          </td>
            <td>
              <img className="spinner" src="spinner.gif" />
              <img id="outputImage2" />
            </td>
            <td>
              <p className="took"></p>
            </td>
          </tr>

          <tr>
            <td>
              <img id="srcImage2" src="holocaust.jpg" /><br />holocaust.jpg
          </td>
            <td>
              <img className="spinner" src="spinner.gif" />
              <img id="outputImage7" />
            </td>
            <td>
              <p className="took"></p>
            </td>
          </tr>


          <tr>
            <td>
              <img id="srcImage4_DONTWORK" src="react.svg" /><br />react.svg
          </td>
            <td>
              It doesn't work <br />
              {/* <!-- <img className="spinner" src="spinner.gif">
                                      <img id="outputImage4" > --> */}
            </td>
            <td>
              <p className="took"></p>
            </td>
          </tr>

          <tr>
            <td>
              <img id="srcImage6" src="pic.tiff" /><br />pic.tiff
          </td>
            <td>
              <img className="spinner" src="spinner.gif" />
              <img id="outputImage6" />
            </td>
            <td>
              <p className="took"></p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}



export default withStyles(styles)(render)



import { Button } from '@material-ui/core';
import {images as defaultImages, ConvertDemoImage} from './data'
import { buildImArguments, DoMagickCall, arrayToIMCommand } from './index';

async function transformImages(images = defaultImages) {
  images.forEach(async image => {
    const t0 = performance.now()
    const outputImage: any = document.getElementById(image.targetId)
    if (!outputImage) { return }

    spinner(true, outputImage)

    const imArguments = buildImArguments((document.querySelector('.input') as HTMLInputElement).value, image)

    const { processedFiles } = await DoMagickCall({ image, imArguments }) // TODO: images []

    let firstOutputImage = processedFiles[0]

    if (outputImage) {
      outputImage.src = URL.createObjectURL(firstOutputImage['blob'])
      outputImage.setAttribute('data-outfile', image.outFile)
      outputImage.parentElement.parentElement.querySelector('.took').innerHTML = 'Took: ' + Math.round(performance.now() - t0) + ' ms'
    }
    document.querySelector('.im-command').innerHTML = arrayToIMCommand(imArguments)

    spinner(false, outputImage)
  })
}


// export function start() {
// document.querySelector('.execute').addEventListener('click', e => {
//   transformImages()
// })
// document.querySelector('.suggestions').addEventListener('change', e => {
//   (document.querySelector('.input') as HTMLInputElement).value = [...(document.querySelectorAll('.suggestions option') as any)].find(e => e.selected).innerHTML
//   transformImages()
// })
// transformImages()
// }
function suggestionChange() {
  (document.querySelector('.input') as HTMLInputElement).value = [...(document.querySelectorAll('.suggestions option') as any)].find(e => e.selected).innerHTML
  transformImages()
}


function spinner(spinning: boolean, el: HTMLElement) {
  (el.parentElement.parentElement.querySelector('.spinner') as HTMLElement).style.display = spinning ? 'block' : 'none'
}
