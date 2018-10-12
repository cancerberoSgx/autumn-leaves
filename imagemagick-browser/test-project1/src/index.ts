import * as im from 'imagemagick-browser'
type IM = typeof im
const w = window as any
// const transformations = [
//   {
//     commands: [['convert', '$INPUT1', '-rotate', '33', '$OUTPUT1']]
//   }
// ];
// w.transformationsFromTest1 = transformations

// function renderHtml() {
//   const html = `
//   <div>
//     <p>Source image: <img src="knight.png" id="knightImage"></p>
//     <p>Result image: <img src="knightOut.png" id="knightImageOut"></p>
//   </div>
//   `
//   const mainEl = document.createElement('div')
//   mainEl.innerHTML = html
//   document.body.appendChild(mainEl)
// }

// async function domagick1() {


// }

// w.imEvaluate = async function(fn: (im: IM)=>void){
//   return await fn(im)
// }
async function fn1(im: IM){
  const div = document.createElement('div')
  div.innerHTML = `
  <p>Source image: <img src="knight.png" id="knightImage"></p>
  <p>Result image: <img src="knightOut.png" id="knightImageOut"></p>`
  document.body.appendChild(div)

  const inputFiles = await im.buildInputFiles(['knight.png'])
  const result = await im.execute({
    inputFiles,
    commands: [['convert', 'knight.png', '-rotate', '33', 'knightOut.png']]
  })
  im.writeOutputImageToEl(result[0].outputFiles[0], document.getElementById('knightImageOut') as HTMLImageElement)    
}
async function main() {
  // expose imagemagick-browser  APIs so we can evaluate expressions from node.js puppeteer

  await fn1(im)
  w.imageMagickBrowser = im


  // console.log(document.querySelector<HTMLImageElement>('#knightImageOut').width+', '+document.querySelector<HTMLImageElement>('#knightImage').width);
  // }, 1000);

  // renderHtml()
  // await domagick1();

}
main()