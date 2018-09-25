import { ConvertDemoImage } from '.';
import { CommandTemplate } from "../../components/commandEditor/CommandTemplate";

export const images: ConvertDemoImage[] = [
  { sourceUrl: 'rotate.png', targetId: 'outputImage1', outFile: 'rotateOut.png' },
  { sourceUrl: 'Hermitcrab.gif', targetId: 'outputImage3', outFile: 'HermitcrabOut.gif' },
  { sourceUrl: 'zelda.gif', targetId: 'outputImage5', outFile: 'zeldaOut.gif' },
  { sourceUrl: 'gnu.jpg', targetId: 'outputImage2', outFile: 'gnuOut.jpg' },
  { sourceUrl: 'react.svg', targetId: 'outputImage4', outFile: 'reactOut.png' },
  { sourceUrl: 'pic.tiff', targetId: 'outputImage6', outFile: 'picOut.png' },
  { sourceUrl: 'holocaust.jpg', targetId: 'outputImage7', outFile: 'holocaustOut.png' },
]

export const transformations: CommandTemplate[] = [
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
    id: 'transformCharcoal1',
    name: 'transform charcoal 1',
    command: ["convert", "$INPUT", "-charcoal", "4", "-blur", "0x1", "-rotate", "10", "$OUTPUT"],
    description: 'The Charcoal Sketch Transform, offers users a very simple way of generating a simplified gray-scale rendering of the image.'
  },
  {
    id: 'transformEdge1',
    name: 'transform Edge 1',
    command: ["convert", "$INPUT", '(', '-clone', '0', '-roll', '+1+0', '-clone', '0', '-compose', 'difference', '-composite', ')', '(', '-clone', '0', '-roll', '+0+1', '-clone', '0', '-compose', 'difference', '-composite', ')', '-delete', '0', '', '-compose', 'screen', '-composite', '-negate', "$OUTPUT"],
    description: ' '
  },
  {
    id: 'transformDefine1',
    name: 'transform define 1',
    command: ["convert", "$INPUT", '-define', 'hough-lines:accumulator=true', '-hough-lines', '5x5+20', '-delete', '0', '-contrast-stretch', '0.1%', "$OUTPUT"],
    description: ' '
  },
  {
    id: 'transformChannelSwap1',
    name: 'transformChannelSwap1',
    command: ["convert", "$INPUT", '(', '+clone', '-channel', 'R', '-fx', 'B', ')', '+swap', '-channel', 'B', '-fx', 'v.R', "$OUTPUT"],
    description: ' '
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
    name: 'frame soft rounded corners',
    command: ["convert", "$INPUT", "-alpha", "set", "-virtual-pixel", "transparent", "-channel", "A", "-blur", "0x8", "", "-level", "50%,100%", "+channel", "$OUTPUT"],
    description: 'You can also Feather Images using Blur, using the same method of adding a transparent Virtual Pixels before bluring just the alpha channel. This generates a more softer feathering to the image, as well as noticeably rounded the corners of the image.'
  },
  {
    id: 'frameFeathering3',
    name: 'frame rounded corners',
    command: ["convert", "$INPUT", "-alpha", "set", "-virtual-pixel", "transparent", "-channel", "A", "-blur", "0x8", "", "-threshold", "50%", "+channel", "$OUTPUT"],
    description: ' '
  },
  {
    id: 'framePlasma1',
    name: 'frame plasma 1',
    command: ['convert', '$INPUT', '-matte', '-mattecolor', '#CCC6', '-frame', '10x10+3+4', '(', '-size', '209x245', 'plasma:fractal', '-normalize', '-blur', '0x1', ')', '-compose', 'DstOver', '-composite', '$OUTPUT'],
    description: 'You can even use a semi-transparent \'-mattecolor\' for the frame \'-frame\' and then \'underlay\' a interesting pattern (such as a Fractal Plasma Canvas), to produce a more colorful frame.'
  },


  {
    id: 'frameShape1',
    name: 'frame shape 1',
    command: ["convert", "$INPUT", "-alpha", "set", "-compose", "DstOut", "(", "-size", "20x15", "xc:none", "-draw", "polygon 0,0  0,14 19,0", "-write", "mpr:triangle", "", "+delete", ")", "(", "mpr:triangle", ")", "-gravity", "northwest", "-composite", "(", "mpr:triangle", "-flip", ")", "-gravity", "southwest", "-composite", "(", "mpr:triangle", "-flop", ")", "-gravity", "northeast", "-composite", "(", "mpr:triangle", "-rotate", "180", ")", "-gravity", "southeast", "-composite", "$OUTPUT"],
    description: ' '
  },

  {
    id: 'frameTornPaperEdge1',
    name: 'frame torn paper edges 1',
    command: ["convert", "$INPUT", "(", "+clone", "-alpha", "extract", "-virtual-pixel", "black", "-spread", "10", "-blur", "0x3", "-threshold", "50%", "-spread", "1", "-blur", "0x.7", ")", "-alpha", "off", "-compose", "Copy_Opacity", "-composite", "$OUTPUT"],
    description: ' '
  },
  {
    id: 'frameTornPaperEdge2',
    name: 'frame torn paper edges 2',
    command: ["convert", "$INPUT", "-bordercolor", "linen", "-border", "8x8", "-background", "Linen", "", "-gravity", "SouthEast", "-splice", "10x10+0+0", "(", "+clone", "-alpha", "extract", "-virtual-pixel", "black", "-spread", "10", "-blur", "0x3", "-threshold", "50%", "-spread", "1", "-blur", "0x.7", ")", "-alpha", "off", "-compose", "Copy_Opacity", "-composite", "-gravity", "SouthEast", "-chop", "10x10", "$OUTPUT"],
    description: ' '
  },

  {
    id: 'frameShadow1',
    name: 'frame shadow soft',
    command: ["convert", "$INPUT", "-page", "+4+4", "-alpha", "set", "(", "+clone", "-background", "navy", "-shadow", "60x4+4+4", ")", "+swap", "-background", "none", "-mosaic", "$OUTPUT"],
    description: ' '
  },

  {
    id: 'framePolaroid1',
    name: 'frame polaroid 1',
    command: ["convert", "$INPUT", "-bordercolor", "white", "-border", "6", "-bordercolor", "grey60", "-border", "1", "-background", "none", "-rotate", "6", "-background", "black", "(", "+clone", "-shadow", "60x4+4+4", ")", "+swap", "-background", "none", "-flatten", "$OUTPUT"],
    description: ' '
  },
  {
    id: 'framePolaroid2',
    name: 'frame polaroid 2',
    command: ["convert", "$INPUT", "-bordercolor", "snow", "-background", "black", "+polaroid", "$OUTPUT"],
    description: ' '
  },
  {
    id: 'framePolaroid3',
    name: 'frame polaroid 3',
    command: ["convert", "-size", "150x150", "xc:none", "-background", "none", "-fill", "white", "-stroke", "grey60", "-draw", "rectangle 0,0  119,155", "$INPUT", "-geometry", "+5+5", "-composite", "-rotate", "-10", "-draw", "rectangle 0,0 119,155", "$INPUT", "-geometry", "+5+5", "-composite", "-rotate", "-10", "-draw", "rectangle 0,0 119,155", "$INPUT", "-geometry", "+5+5", "-composite", "-rotate", "+10", "-trim", "+repage", "-background", "LightSteelBlue", "-flatten", "$OUTPUT"],
    description: ' '
  },
  {
    id: 'framePolaroid4',
    name: 'frame polaroid 4',
    command: ["convert", "-caption", 'Spiral Staircase, Arc de Triumph, Paris, April 2006', "$INPUT", '-thumbnail', '240x240', '-bordercolor', 'Lavender', '-border', '5x5', '-density', '144', '', '-gravity', 'center', '-pointsize', '8', '-background', 'black', '-polaroid', '-15', '-resize', '50%', "$OUTPUT"],
    description: ' '
  },


  {
    id: 'gradient1',
    name: 'gradient 1',
    command: ["convert", "(", "xc:red", "xc:blue", "+append", ")", "(", "xc:yellow", "xc:cyan", "+append", ")", "-append", "-filter", "triangle", "-resize", "100x100!", "$OUTPUT"],
    description: ' '
  },
  {
    id: 'gradient2',
    name: 'gradient 2',
    command: ["convert", '-size', '100x100', 'xc:', '+size', 'xc:red', 'xc:blue', 'xc:lime', '-colorspace', 'HSB', '-fx', 'ar=1/max(1,  (i-50)*(i-50)+(j-10)*(j-10)  ); br=1/max(1,  (i-10)*(i-10)+(j-70)*(j-70)  );       cr=1/max(1,  (i-90)*(i-90)+(j-90)*(j-90)  );       ( u[1]*ar + u[2]*br + u[3]*cr )/( ar+br+cr )', '-colorspace', 'sRGB', "$OUTPUT"],
    description: ' '
  },
  {
    id: 'gradient3',
    name: 'gradient 3',
    command: ["convert", '-size', '100x100', 'xc:', '-colorspace', 'RGB', '-define', 'shepards:power=1', '-sparse-color', 'Shepards', '30,10 red  10,80 blue  70,60 lime  80,20 yellow', '-colorspace', 'sRGB', '-fill', 'white', '-stroke', 'black', '-draw', 'circle 30,10 30,12  circle 10,80 10,82', '-draw', 'circle 70,60 70,62  circle 80,20 80,22', "$OUTPUT"],
    description: ' '
  },

  {
    id: 'sinusoid1',
    name: 'sinusoid1',
    command: ["convert", "$INPUT", "-function", "Sinusoid", "3,3", "$OUTPUT"],
    description: ' '
  },

  {
    id: 'pattern1',
    name: 'pattern1',
    command: ["convert", '-size', '80x80', '', 'xc:', '-tile-offset', '+20+20', '+size', '-tile', 'pattern:checkerboard', '-draw', 'color 30,20 reset', "$OUTPUT"],
    description: ' '
  },
  {
    id: 'pattern2',
    name: 'pattern2',
    command: ["convert", '-size', '250x250', 'xc:', '+noise', 'Random', '(', '+clone', '-transpose', ')', '(', '+clone', '-sparse-color', 'voronoi', '%w,0 white 0,%h black', ')', '-composite', '(', '+clone', '-rotate', '-90', ')', '+append', '(', '+clone', '-rotate', '180', ')', '-append', '-virtual-pixel', 'Tile', '-blur', '0x5', '-auto-level', '-separate', '-background', 'white', '-compose', 'ModulusAdd', '-flatten', '-channel', 'R', '-combine', '+channel', '-set', 'colorspace', 'HSB', '-colorspace', 'RGB', "$OUTPUT"],
    description: ' '
  },
  {
    id: 'tile1',
    name: 'tile1',
    command: ["convert", "$INPUT", '-set', 'option:distort:viewport', '100x100-50-50', '-virtual-pixel', 'tile', '-distort', 'Arc', '45 0 50', '+repage', "$OUTPUT"],
    description: ' '
  },

  {
    id: 'backgroundRemoval1',
    name: 'backgroundRemoval1',
    command: ["convert", "$INPUT", "-bordercolor", "grey", "-border", "1x1", "-alpha", "set", "-channel", "RGBA", "-fuzz", "10%", "-fill", "none", "-floodfill", "+0+0", "grey", "-shave", "1x1", "$OUTPUT"],
    description: ' '
  },

  {
    id: 'quantize1',
    name: 'quantize two colors',
    command: ["convert", "$INPUT", '+dither', '-colors', '2', '-colorspace', 'gray', '-normalize', "$OUTPUT"],
    description: ' '
  },
  {
    id: 'quantize2',
    name: 'quantize colormap',
    command: ["convert", '-size', '16x16', 'xc:', '-channel', 'R', '-fx', '(i%8)/7', '-channel', 'G', '-fx', '(j%8)/7', '-channel', 'B', '-fx', '((i>>3&1)|(j>>2&2))/3', '-scale', '600%', "$OUTPUT"],
    description: ' '
  },

  {
    id: 'quantize3',
    name: 'quantize dither 1',
    command: ["convert", '$INPUT', '-set', 'option:distort:viewport', '%wx%h+0+0', '-colorspace', 'CMYK', '-separate', 'null:', '(', '-size', '2x2', 'xc:', '(', '+clone', '-negate', ')', '+append', '(', '+clone', '-negate', ')', '-append', ')', '-virtual-pixel', 'tile', '-filter', 'gaussian', '(', '+clone', '-distort', 'SRT', '2,60', ')', '+swap', '(', '+clone', '-distort', 'SRT', '2,30', ')', '+swap', '(', '+clone', '-distort', 'SRT', '2,45', ')', '+swap', '(', '+clone', '-distort', 'SRT', '2,0', '', '-blur', '0x0.7', ')', '+swap', '+delete', '-compose', 'Overlay', '-layers', 'composite', '-set', 'colorspace', 'CMYK', '-combine', '-colorspace', 'RGB', "$OUTPUT"],
    description: ' '
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
