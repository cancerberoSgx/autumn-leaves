
import * as Magick from './magickApi.js'

const images = [
  { sourceUrl: 'rotate.png', targetId: 'outputImage1', outFile: 'rotateOut.png' },
  { sourceUrl: 'Hermitcrab.gif', targetId: 'outputImage3', outFile: 'HermitcrabOut.gif' },
  { sourceUrl: 'zelda.gif', targetId: 'outputImage5', outFile: 'zeldaOut.gif' },

  { sourceUrl: 'gnu.jpg', targetId: 'outputImage2', outFile: 'gnuOut.jpg' }, // doesn't work see https://github.com/KnicKnic/WASM-ImageMagick/issues/8
  { sourceUrl: 'react.svg', targetId: 'outputImage4', outFile: 'reactOut.png' },// doesn't work

]
function buildImArguments(s, image) {
  try {
    debugger
    let result = JSON.parse(s.replace(/\s{2}/g, ' ')).map(a => a === '$INPUT' ? image.sourceUrl : a === '$OUTPUT' ? image.outFile : a)
    document.querySelector('.error').innerHTML = ''
    return result
  } catch (error) {
    document.querySelector('.error').innerHTML = error + ''
  }
}

async function transformImages() {
  images.forEach(async image => {
    const t0 = performance.now()
    const outputImage = document.getElementById(image.targetId)

    // const argValue= document.querySelector('.input').value.replace(/\s{2}/g, ' ')
    const imArguments = buildImArguments(document.querySelector('.input').value, image)

    const { processedFiles } = await DoMagickCall({ image, imArguments }) // TODO: images []

    let firstOutputImage = processedFiles[0]

    const took = performance.now() - t0
    // console.log(took, 'ms took on image', firstOutputImage, 'call: ', imArguments)

    if (outputImage) {
      outputImage.src = URL.createObjectURL(firstOutputImage['blob'])
      outputImage.setAttribute('data-outfile', image.outFile)
      outputImage.parentElement.parentElement.querySelector('.took').innerHTML = 'Took: ' + Math.round(took) + ' ms'
    }
    document.querySelector('.im-command').innerHTML = arrayToIMCommand(imArguments)
  })
}
async function DoMagickCall(config) {
  // let outputImage = 

  let fetchedSourceImage = await fetch(config.image.sourceUrl)
  let arrayBuffer = await fetchedSourceImage.arrayBuffer()
  let sourceBytes = new Uint8Array(arrayBuffer)

  const files = [{ 'name': config.image.sourceUrl, 'content': sourceBytes }]
  let processedFiles = await Magick.Call(files, config.imArguments)
  return Promise.resolve({ processedFiles })
}

function arrayToIMCommand(command) {
  return command
    .map(c => c.match(/\s/) ? `'${c}'` : c)
    .map(c => c.replace(/\(/gm, '\\('))
    .map(c => c.replace(/\)/gm, '\\)'))
    .join(' ')
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