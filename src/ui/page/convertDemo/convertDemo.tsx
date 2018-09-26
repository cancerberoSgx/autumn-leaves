//TODO: make it a component

import * as React from 'react'
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import { Button, MenuItem, FormControl, InputLabel, Select
  // , Table, TableHead, TableCell 
} from '@material-ui/core';
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
  select: {
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
    margin: theme.spacing.unit
  },
})

function render(props: WithStyles<typeof styles>) {
  const { classes } = props

  return (
    <Paper className={classes.paper}>
      <p>Try an ImageMagick command on different test images. Choose one example below and press execute. Edit the command and see what it does. Some transformation could take a couple of seconds to finish. so be patient. </p>

      {renderSuggestions(props, transformations)}<br /><br />

      <textarea className={classes.input + ' input'} defaultValue={JSON.stringify(selectedTransformation.command)}></textarea>

      <p className="error"></p>

      <Button className="execute" variant="contained" onClick={() => transformImages()}>Execute</Button>

      <p>
        <strong>ImageMagick Command: </strong>
        <br />
        <span className="im-command"></span>
      </p>
      {renderSuggestions(props, suggestionsDontWork, 'Not working transformations')}

      <ConvertDemoCliScript />
      
      {renderImageTable(props)}

    </Paper>
  )
}

function renderSuggestions(props: WithStyles<typeof styles>, transformations: CommandTemplate[], title: string = 'Transformation examples') {
  const { classes } = props
  return (<div>
    <form className={classes.root} autoComplete="off">
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="suggestion-simple">{title}</InputLabel>
        <Select className={classes.select}
          // value={defaultTransformation.command}
          onChange={suggestionChange}
          inputProps={{
            name: 'suggestion',
            id: 'suggestion-simple',
          }}
        >
          {transformations.map((t: CommandTemplate, i: number) =>
            <MenuItem value={t.command}>{t.name}</MenuItem>
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
        <thead>
          <tr>
            <th>Input</th>
            <th>Output</th>
            <th>Time it took</th>
            <th>ImageMagick (the real thing)</th>
          </tr>
        </thead>
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
              <td>
                <img src={`test1ImOutput/${selectedTransformation.id}_${image.outFile}`} alt={`test1ImOutput/${selectedTransformation.id}_${image.outFile}`}></img>
                <br/>
                {`test1ImOutput/${selectedTransformation.id}_${image.outFile}`}
                </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* <Table className={ ''}>
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell numeric>Calories</TableCell>
            <TableCell numeric>Fat (g)</TableCell>
            <TableCell numeric>Carbs (g)</TableCell>
            <TableCell numeric>Protein (g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[{calories: '123123'}].map(row => {
            return (
              <TableRow key={row.calories}>
                <TableCell component="th" scope="row">
                  {row.calories}
                </TableCell>
                <TableCell numeric>{row.calories}</TableCell>
                <TableCell numeric>{row.calories}</TableCell>
                <TableCell numeric>{row.calories}</TableCell>
                <TableCell numeric>{row.calories}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table> */}
    </div>
  )
}

export default withStyles(styles)(render)

import { images as defaultImages, transformations, suggestionsDontWork } from './data'
import { buildImArguments, DoMagickCall } from './index';
import { CommandTemplate } from "../../components/commandEditor/CommandTemplate";
import { arrayToIMCommand } from '../../../util/cli';
import { TableRow, TableBody } from 'material-ui';

const defaultTransformation = transformations[0]
let selectedTransformation: CommandTemplate = defaultTransformation
function suggestionChange(e: React.ChangeEvent) {
  const value: any = (e.target as any).value
  document.querySelector<HTMLInputElement>('.input').value = JSON.stringify(value)
  selectedTransformation = transformations.find(t => JSON.stringify(t.command) === JSON.stringify(value))
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

    const { outputFiles } = await DoMagickCall({ image, imArguments }) // TODO: images []

    let firstOutputImage = outputFiles[0]

    if (outputImage) {
      outputImage.src = URL.createObjectURL(firstOutputImage['blob'])
      outputImage.setAttribute('data-outfile', image.outFile)
      outputImage.parentElement.parentElement.querySelector('.took').innerHTML = Math.round(performance.now() - t0) + ' ms'
    }
    document.querySelector('.im-command').innerHTML = arrayToIMCommand(imArguments)

    spinner(false, outputImage)
  })
}
