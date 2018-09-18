
import * as Magick from './magickApi.js';
import ImageAdjust from 'material-ui/SvgIcon';

// Fetch the image to rotate, and call image magick
export async function doImageMagick() {
  let fetchedSourceImage = await fetch("rotate.png");
  let arrayBuffer = await fetchedSourceImage.arrayBuffer();
  let sourceBytes = new Uint8Array(arrayBuffer);

  const input = document.querySelector('.input') as HTMLInputElement
  const imArguments = JSON.parse(input.value)

  // calling image magick with one source image, and command to rotate & resize image
  let processedFiles = await Magick.Call(
    [{ 'name': 'srcFile.png', 'content': sourceBytes }], imArguments
  );

  // response can be multiple files (example split) here we know we just have one
  let firstOutputImage = processedFiles[0]
  let rotatedImage = document.getElementById('rotatedImage') as HTMLImageElement;

  rotatedImage.src = URL.createObjectURL(firstOutputImage['blob'])
  console.log("created image " + firstOutputImage['name'])
};
