export interface ConvertDemoTransformation {
  id: string, name: string, command: string[]
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
]

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