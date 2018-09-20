
import * as Magick from './magickApi.js';

const images = [
  { sourceUrl: 'rotate.png', targetId: 'outputImage1', outFile: 'out.png' },
  { sourceUrl: 'Hermitcrab.gif', targetId: 'outputImage3', outFile: 'out.gif' },
  // { sourceUrl: 'gnu.jpg', targetId: 'outputImage2', outFile: 'out.jpg' },
  // { sourceUrl: 'react.svg', targetId: 'outputImage4', outFile: 'out.png' },
]

// Fetch the image to rotate, and call image magick
let DoMagickCall = async function () {
  images.forEach(async image => {

    let outputImage = document.getElementById(image.targetId);
    const sourceUrl = image.sourceUrl

    let fetchedSourceImage = await fetch(sourceUrl);
    let arrayBuffer = await fetchedSourceImage.arrayBuffer();
    let sourceBytes = new Uint8Array(arrayBuffer);

    const imArguments = ['convert', sourceUrl].concat(JSON.parse(document.querySelector('.input').value)).concat([image.outFile])
    // console.log(imArguments)

    const files = [{ 'name': sourceUrl, 'content': sourceBytes }]
    let processedFiles = await Magick.Call(files, imArguments);

    let firstOutputImage = processedFiles[0]
    outputImage.src = URL.createObjectURL(firstOutputImage['blob'])
  })

};

export function start() {
  document.querySelector('.execute').addEventListener('click', e => {
    DoMagickCall();
  })
  document.querySelector('.suggestions').addEventListener('change', e => {
    document.querySelector('.input').value = [...document.querySelectorAll('.suggestions option')].find(e=>e.selected).innerHTML
    DoMagickCall();
  })

}