
import * as Magick from './magickApi.js';

// various html elements
let rotatedImage = document.getElementById('rotatedImage');

// Fetch the image to rotate, and call image magick
let DoMagickCall = async function () {
  let fetchedSourceImage = await fetch("rotate.png");
  let arrayBuffer = await fetchedSourceImage.arrayBuffer();
  let sourceBytes = new Uint8Array(arrayBuffer);

  const imArguments = JSON.parse(document.querySelector('.input').value)

  // calling image magick with one source image, and command to rotate & resize image
  let processedFiles = await Magick.Call(
    [{ 'name': 'srcFile.png', 'content': sourceBytes }], imArguments
  );

  // response can be multiple files (example split)
  // here we know we just have one
  let firstOutputImage = processedFiles[0]
  rotatedImage.src = URL.createObjectURL(firstOutputImage['blob'])
  console.log("created image " + firstOutputImage['name'])
};

export function start(){
  document.querySelector('.execute').addEventListener('click', e => {
    DoMagickCall();
  })
  DoMagickCall();
}