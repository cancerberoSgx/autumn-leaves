import * as React from 'react'
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import { Button, MenuItem, FormControl, InputLabel, Select } from '@material-ui/core';
import { ConvertDemoCliScript } from './ConvertDemoCliScript';

const styles = (theme: Theme) => createStyles({
  paper: {
    color: theme.palette.text.secondary,
    width: '100%'
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  select : {
    minWidth: '240px'
  },
  input: {
    width: '100%',
    height: '100px'
  },
  demoEntry: {
    border: '2px solid #ededed',
    padding: '10px'
  },
  images: {

  },
  error: {
    margin: 0,
    padding: 0,
    fontWeight: 'bold'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
})

function render(props: WithStyles<typeof styles>) {
  const { classes } = props

  return (
    <Paper className={classes.paper}>
      <p>Try an ImageMagick command on different test images. Check out the suggestions!</p>

      {renderSuggestions(props, transformations)}<br/><br/>

      <ConvertDemoCliScript/>
      <textarea className={classes.input + ' input'} defaultValue='["convert", "$INPUT", "-sigmoidal-contrast", "15x30%", "(", "+clone",  "-sparse-color", "Barycentric", "0,0 black 0,%h gray80", "-solarize", "50%", "-level", "50%,0", ")", "-compose", "Blur", "-set", "option:compose:args", "10", "-composite", "$OUTPUT"]'></textarea>

      <p className="error"></p>

      <Button className="execute" variant="contained" onClick={() => transformImages()}>Execute</Button>

      <p>
        <strong>ImageMagick Command: </strong>
        <br />
        <span className="im-command"></span>
      </p>
      {renderSuggestions(props, suggestionsDontWork, 'Not working transformations')}

      {renderImageTable(props)}


    </Paper>
  )
}

function renderSuggestions(props: WithStyles<typeof styles>, transformations: ConvertDemoTransformation[], title: string='Transformation examples') {
  const { classes } = props
  return (<div>
    <form className={classes.root} autoComplete="off">
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="suggestion-simple">{title}</InputLabel>
        <Select className={classes.select}
          // value={transformations[0].command}
          onChange={suggestionChange}
          inputProps={{
            name: 'suggestion',
            id: 'suggestion-simple',
          }}
        >
          {transformations.map((t: ConvertDemoTransformation, i: number) =>
            <MenuItem   value={t.command}>{t.name}</MenuItem>
          )}
        </Select>
      </FormControl>
    </form>
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
          {defaultImages.map(image =>
            <tr className={classes.demoEntry}>
              <td>
                <img src={image.sourceUrl} /><br />{image.sourceUrl}
              </td>
              <td>
                <img className="spinner" src="spinner.gif" />
                <img id={image.targetId} />
              </td>
              <td>
                <p className="took"></p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default withStyles(styles)(render)

import { images as defaultImages, transformations, ConvertDemoTransformation, suggestionsDontWork } from './data'
import { buildImArguments, DoMagickCall, arrayToIMCommand } from './index';

function suggestionChange(e: React.ChangeEvent) {
  const value: any = (e.target as any).value
  document.querySelector<HTMLInputElement>('.input').value = JSON.stringify(value)
  transformImages()
}

function spinner(spinning: boolean, el: HTMLElement) {
  (el.parentElement.parentElement.querySelector('.spinner') as HTMLElement).style.display = spinning ? 'block' : 'none'
}

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