
import * as Magick from './magickApi.js'

const images = [
  { sourceUrl: 'rotate.png', targetId: 'outputImage1', outFile: 'rotateOut.png' },
  { sourceUrl: 'Hermitcrab.gif', targetId: 'outputImage3', outFile: 'HermitcrabOut.gif' },
  { sourceUrl: 'zelda.gif', targetId: 'outputImage5', outFile: 'zeldaOut.gif' },
  { sourceUrl: 'gnu.jpg', targetId: 'outputImage2', outFile: 'gnuOut.jpg' },
  { sourceUrl: 'react.svg', targetId: 'outputImage4', outFile: 'reactOut.png' },// doesn't work
  { sourceUrl: 'pic.tiff', targetId: 'outputImage6', outFile: 'picOut.png' }, 
   { sourceUrl: 'holocaust.jpg', targetId: 'outputImage7', outFile: 'holocaustOut.png' },
  

]

async function transformImages() {
  images.forEach(async image => {
    const t0 = performance.now()
    const outputImage = document.getElementById(image.targetId)
    if (!outputImage) { return }

    spinner(true, outputImage)

    const imArguments = buildImArguments(document.querySelector('.input').value, image)

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

async function DoMagickCall(config) {
  let fetchedSourceImage = await fetch(config.image.sourceUrl)
  let arrayBuffer = await fetchedSourceImage.arrayBuffer()
  let content = new Uint8Array(arrayBuffer)

  const name = config.image.sourceUrl
  const newFiles = [{ name, content }]
  const files = (config.files || [])
    .filter(f => f.name !== name) // remove file if already there
    .concat(newFiles)
  let processedFiles = await Magick.Call(files, config.imArguments)
  return Promise.resolve({ processedFiles })
}

export function start() {
  document.querySelector('.execute').addEventListener('click', e => {
    transformImages()
  })
  document.querySelector('.suggestions').addEventListener('change', e => {
    document.querySelector('.input').value = [...document.querySelectorAll('.suggestions option')].find(e => e.selected).innerHTML
    transformImages()
  })
  transformImages()
}

function arrayToIMCommand(command) {
  return command
    .map(c => c.match(/\s/) ? `'${c}'` : c)
    .map(c => c.replace(/\(/gm, '\\('))
    .map(c => c.replace(/\)/gm, '\\)'))
    .join(' ')
}

function buildImArguments(s, image) {
  try {
    let result = JSON.parse(s.replace(/\s{2}/g, ' ')).map(a => a === '$INPUT' ? image.sourceUrl : a === '$OUTPUT' ? image.outFile : a)
    document.querySelector('.error').innerHTML = ''
    return result
  } catch (error) {
    document.querySelector('.error').innerHTML = error + ''
  }
}

function spinner(spinning, el) {
  el.parentElement.parentElement.querySelector('.spinner').style.display = spinning ? 'block' : 'none'
}