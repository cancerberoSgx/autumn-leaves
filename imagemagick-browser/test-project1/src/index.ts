import { execute, buildInputFiles, writeOutputImageToEl } from 'imagemagick-browser'

// const images = [
//   {
//     name: 'knight.png',
//     url: 'knight.png'
//   }
// ]
const transformations = [
  {
    commands: [['convert', '$INPUT1', '-rotate', '33', '$OUTPUT1']]
  }
];
(window as any).transformationsFromTest1 = transformations

function renderHtml() {

  const html = `
  <div>
    <p>Source image: <img src="knight.png" id="knightImage"></p>
    <p>Result image: <img src="knightOut.png" id="knightImageOut"></p>
  </div>
  `
  const mainEl = document.createElement('div')
  mainEl.innerHTML = html
  document.body.appendChild(mainEl)
}
async function domagick1() {
  const inputFiles = await buildInputFiles(['knight.png'])
  const result = await execute({
    inputFiles,
    commands: [['convert', 'knight.png', '-rotate', '33', 'knightOut.png']]
  })
  writeOutputImageToEl(result[0].outputFiles[0], document.getElementById('knightImageOut') as HTMLImageElement);
  (window as any).transformationsFinishedFromTest1 = true
}

async function main() {
  renderHtml()
  await domagick1();
  (window as any).transformationsFinishedFromTest1 = true
}
main()