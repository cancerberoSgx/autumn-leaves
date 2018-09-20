
import * as Magick from './magickApi.js'

const images = [
  { sourceUrl: 'rotate.png', targetId: 'outputImage1', outFile: 'rotateOut.png' },
  { sourceUrl: 'Hermitcrab.gif', targetId: 'outputImage3', outFile: 'HermitcrabOut.gif' },
  { sourceUrl: 'zelda.gif', targetId: 'outputImage5', outFile: 'zeldaOut.gif' },

  { sourceUrl: 'gnu.jpg', targetId: 'outputImage2', outFile: 'out.jpg' }, // doesn't work see https://github.com/KnicKnic/WASM-ImageMagick/issues/8
  { sourceUrl: 'react.svg', targetId: 'outputImage4', outFile: 'out.png' },// doesn't work

]

async function DoMagickCall() {
  images.forEach(async image => {
    let outputImage = document.getElementById(image.targetId)

    let fetchedSourceImage = await fetch(image.sourceUrl)
    let arrayBuffer = await fetchedSourceImage.arrayBuffer()
    let sourceBytes = new Uint8Array(arrayBuffer)

    const imArguments = JSON.parse(document.querySelector('.input').value)
      .map(a => a === '$INPUT' ? image.sourceUrl : a === '$OUTPUT' ? image.outFile : a)

    document.querySelector('.im-command').innerHTML = arrayToIMCommand(imArguments)

    const files = [{ 'name': image.sourceUrl, 'content': sourceBytes }]
    const t0 = performance.now()
    let processedFiles = await Magick.Call(files, imArguments)
    let firstOutputImage = processedFiles[0]

    const took = performance.now() - t0
    console.log(took, 'ms took on image', firstOutputImage, 'call: ', imArguments)

    outputImage.src = URL.createObjectURL(firstOutputImage['blob'])
    outputImage.setAttribute('data-outfile', image.outFile)

    outputImage.parentElement.parentElement.querySelector('.took').innerHTML = 'Took: ' + Math.round(took) + ' ms'
  })
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
    DoMagickCall()
  })
  document.querySelector('.suggestions').addEventListener('change', e => {
    document.querySelector('.input').value = [...document.querySelectorAll('.suggestions option')].find(e => e.selected).innerHTML
    DoMagickCall()
  })
  DoMagickCall()
}