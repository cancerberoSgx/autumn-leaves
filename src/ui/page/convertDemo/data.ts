
export interface ConvertDemoImage {
  sourceUrl: string, targetId: string, outFile: string
}
export const images: ConvertDemoImage[] = [
  { sourceUrl: 'rotate.png', targetId: 'outputImage1', outFile: 'rotateOut.png' },
  { sourceUrl: 'Hermitcrab.gif', targetId: 'outputImage3', outFile: 'HermitcrabOut.gif' },
  { sourceUrl: 'zelda.gif', targetId: 'outputImage5', outFile: 'zeldaOut.gif' },
  { sourceUrl: 'gnu.jpg', targetId: 'outputImage2', outFile: 'gnuOut.jpg' },
  { sourceUrl: 'react.svg', targetId: 'outputImage4', outFile: 'reactOut.png' },// doesn't work
  { sourceUrl: 'pic.tiff', targetId: 'outputImage6', outFile: 'picOut.png' },
  { sourceUrl: 'holocaust.jpg', targetId: 'outputImage7', outFile: 'holocaustOut.png' },
]

export interface ConvertDemoTransformation {
  id: string, name: string, command: string[], description?: string
}
export const transformations: ConvertDemoTransformation[] = [
  {
    id: 'distorBarrel1',
    name: 'distor barrel 1',
    command: ["convert", "$INPUT", "-distort", "barrel", "0.7 -0.009 0.0", "-resize", "200%", "$OUTPUT"]
  },
  {
    id: 'rotateAndResize1',
    name: 'rotate and resize',
    command: ["convert", "$INPUT", "-rotate", "90", "-resize", "200%", "$OUTPUT"]
  },
  {
    id: 'sigmoidalContrast1',
    name: 'sigmoidal contrast',
    command: ["convert", "$INPUT", "-sigmoidal-contrast", "4,0%", "$OUTPUT"]
  },
  {
    id: 'sparseColor1',
    name: 'sparseColor1',
    command: ["convert", "$INPUT", "-sparse-color", "Barycentric", "0,0 black 0,%h white", "-function", "polynomial",
      "4,-4,1", "$OUTPUT"]
  },
  {
    id: 'composite1',
    name: 'composite 1',
    command: ["convert", "$INPUT", "-sigmoidal-contrast", "15x30%", "(", "+clone", "-sparse-color", "Barycentric", "0,0 black 0,%h gray80", "-solarize", "50%", "-level", "50%,0", ")", "-compose", "Blur", "-set", "option:compose:args", "10", "-composite", "$OUTPUT"]
  },
  {
    id: 'colorspaceChannelSeparate1',
    name: 'colorspaceChannelSeparate1',
    command: ["convert", "$INPUT", "-colorspace", "HSL", "-channel", "Hue", "-separate", "$OUTPUT"]
  },
  {
    id: 'charcoal1',
    name: 'charcoal 1',
    command: ["convert", "$INPUT", "-charcoal", "5", "$OUTPUT"],
    description: 'The Charcoal Sketch Transform, offers users a very simple way of generating a simplified gray-scale rendering of the image.'
  },
  {
    id: 'childrenCanColor1',
    name: 'children can color 1',
    command: ["convert", "$INPUT", "-edge", "1", "-negate", "-normalize", "-colorspace", "Gray", "-blur", "0x.5", "-contrast-stretch", "0x50%", "$OUTPUT"],
    description: 'Convert a simple photo into something children can color in. '
  },
  {
    id: 'childrenCanColor2',
    name: 'children can color 2',
    command: ["convert", "$INPUT", "-segment", "1x1", "+dither", "-colors", "2", "-edge", "1", "-negate", "-normalize", "$OUTPUT"],
    description: 'Convert a simple photo into something children can color in. Shaded complex pictures'
  },

  {
    id: 'frameVignette1',
    name: 'frame Vignette',
    command: ["convert", "$INPUT", "-alpha", "set", "-background", "none", "-vignette", "0x4", "$OUTPUT"],
    description: 'The Vignette Operator provides a simple means to add a blurry edge around an image.'
  },
  {
    id: 'frameFeathering1',
    name: 'frame feathering 1',
    command: ["convert", "$INPUT", "-alpha", "set", "-virtual-pixel", "transparent", "-channel", "A", "-morphology", "Distance", "Euclidean:1,10!", "+channel", "$OUTPUT"],
    description: 'The Morphology Distance method provides a true transparent \'Feathering\' of an image\'s edges.'
  },
  {
    id: 'frameFeathering2',
    name: 'frame feathering 2',
    command: ["convert", "$INPUT", "-alpha", "set", "-virtual-pixel", "transparent", "-channel", "A", "-blur", "0x8", "", "-level", "50%,100%", "+channel", "$OUTPUT"],
    description: 'You can also Feather Images using Blur, using the same method of adding a transparent Virtual Pixels before bluring just the alpha channel. This generates a more softer feathering to the image, as well as noticeably rounded the corners of the image.'
  },
]

export const suggestionsDontWork = [

  {
    id: 'notWorking3',
    name: 'notWorking3',
    command: ["convert", "$INPUT", "-distort", "SRT", "%[fx:aa=$angle*pi/180;(w*abs(sin(aa))+h*abs(cos(aa)))/min(w,h)]", "$angle", "$OUTPUT"],
    description: 'notWorking3'
  },
  {
    id: 'notWorking2',
    name: 'notWorking2',
    command: ["convert", "$INPUT", "-size", "320x100", "xc:lightblue", "-font", "Candice", "-pointsize", "72", "-tile", "pattern:checkerboard", "-annotate", "+28+68", "Sebastian", "$OUTPUT"],
    description: 'notWorking2'
  },
  {
    id: 'notWorking1',
    name: 'notWorking as expected',
    command: ["convert", "$INPUT", "(", "+clone", "-scale", "25%", "-scale", "400%", ")", "(", "+clone", "-gamma", "0", "-fill", "white", "-draw", "circle 65,53 50,40", "-blur", "10x4", ")", "-composite", "$OUTPUT"],
    description: 'NOT WORKING AS EXPECTED'
  },
]


// <option>NOT WORKING: taken from https://imagemagick.org/Usage//photos/
//                                 ["convert", "$INPUT", "-distort", "SRT", "%[fx:aa=$angle*pi/180;(w*abs(sin(aa))+h*abs(cos(aa)))/min(w,h)]",
// "$angle", "$OUTPUT"]</option>
//   {/* <!-- doesnt work - taken from https://imagemagick.org/Usage//photos/--> */}


// </select>

// </div>

