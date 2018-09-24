import { Command } from '../../../imagemagick';
import { CommandTemplate, TemplateContext, SizedImageContext, Color, ArgumentType } from '../convertDemo/CommandTemplate';
// import { ArgumentType, Color } from '../../components/argumentEditor/types';

export interface Crop1Context extends SizedImageContext {
  background?: Color
}
export const imageFrames: CommandTemplate[] = [
  {
    id: 'crop1',
    name: 'simple crop 1',
    commands: [["convert", "$INPUT", "-quiet", "-crop", "129x158-9-6!", "-background", "skyblue", "-flatten", "$OUTPUT"]],
    description: ' '
  },
  {
    id: 'crop2',
    name: 'simple crop 2',
    commands: [["convert", "$INPUT", "-quiet", "-crop", "129x158-9-6!", "-background", "red", "-flatten", "$OUTPUT"]],
    description: ' ',
    template: function (context: Crop1Context) {
      return JSON.parse(`[["convert", "$INPUT", "-quiet", "-crop", "129x158-9-6!", "-background", "${context.background || 'skyblue'}", "-flatten", "$OUTPUT"]]`) as Command[]
    },
    arguments: [{ type: ArgumentType.color, id: 'background', name: 'background' }]
  },
  {
    // name: 'test1',
    id: 'frameVignette1',
    name: 'frame Vignette',
    // commands:[ ['convert', '$INPUT', '-alpha', 'set', '-background', 'none', '-vignette', '0x4', '$OUTPUT'],
    description: 'The Vignette Operator provides a simple means to add a blurry edge around an image.',
    commands: [['convert', '$INPUT', '-alpha', 'set', '-background', 'none', '-vignette', '0x4', '$OUTPUT']],
  },

  {
    id: 'frameFeathering1',
    name: 'frame feathering 1',
    commands: [['convert', '$INPUT', '-alpha', 'set', '-virtual-pixel', 'transparent', '-channel', 'A', '-morphology', 'Distance', 'Euclidean:1,10!', '+channel', '$OUTPUT']],
    description: 'The Morphology Distance method provides a true transparent \'Feathering\' of an image\'s edges.'
  },
  {
    id: 'framePlasma1',
    name: 'frame plasma 1',
    commands: [['convert', '$INPUT', '-matte', '-mattecolor', '#CCC6', '-frame', '10x10+3+4', '(', '-size', '209x245', 'plasma:fractal', '-normalize', '-blur', '0x1', ')', '-compose', 'DstOver', '-composite', '$OUTPUT']],
    description: 'You can even use a semi-transparent \'-mattecolor\' for the frame \'-frame\' and then \'underlay\' a interesting pattern (such as a Fractal Plasma Canvas), to produce a more colorful frame.'
  },


  {
    id: 'frameFeathering2',
    name: 'frame soft rounded corners',
    commands: [["convert", "$INPUT", "-alpha", "set", "-virtual-pixel", "transparent", "-channel", "A", "-blur", "0x8", "", "-level", "50%,100%", "+channel", "$OUTPUT"]],
    description: 'You can also Feather Images using Blur, using the same method of adding a transparent Virtual Pixels before bluring just the alpha channel. This generates a more softer feathering to the image, as well as noticeably rounded the corners of the image.'
  },
  {
    id: 'frameFeathering3',
    name: 'frame rounded corners',
    commands: [["convert", "$INPUT", "-alpha", "set", "-virtual-pixel", "transparent", "-channel", "A", "-blur", "0x8", "", "-threshold", "50%", "+channel", "$OUTPUT"]],
    description: ' '
  },

  {
    id: 'frameShape1',
    name: 'frame shape 1',
    commands: [["convert", "$INPUT", "-alpha", "set", "-compose", "DstOut", "(", "-size", "20x15", "xc:none", "-draw", "polygon 0,0  0,14 19,0", "-write", "mpr:triangle", "", "+delete", ")", "(", "mpr:triangle", ")", "-gravity", "northwest", "-composite", "(", "mpr:triangle", "-flip", ")", "-gravity", "southwest", "-composite", "(", "mpr:triangle", "-flop", ")", "-gravity", "northeast", "-composite", "(", "mpr:triangle", "-rotate", "180", ")", "-gravity", "southeast", "-composite", "$OUTPUT"]],
    description: ' '
  },

  {
    id: 'frameTornPaperEdge1',
    name: 'frame torn paper edges 1',
    commands: [["convert", "$INPUT", "(", "+clone", "-alpha", "extract", "-virtual-pixel", "black", "-spread", "10", "-blur", "0x3", "-threshold", "50%", "-spread", "1", "-blur", "0x.7", ")", "-alpha", "off", "-compose", "Copy_Opacity", "-composite", "$OUTPUT"]],
    description: ' '
  },
  {
    id: 'frameTornPaperEdge2',
    name: 'frame torn paper edges 2',
    commands: [["convert", "$INPUT", "-bordercolor", "linen", "-border", "8x8", "-background", "Linen", "", "-gravity", "SouthEast", "-splice", "10x10+0+0", "(", "+clone", "-alpha", "extract", "-virtual-pixel", "black", "-spread", "10", "-blur", "0x3", "-threshold", "50%", "-spread", "1", "-blur", "0x.7", ")", "-alpha", "off", "-compose", "Copy_Opacity", "-composite", "-gravity", "SouthEast", "-chop", "10x10", "$OUTPUT"]],
    description: ' '
  },

  {
    id: 'frameShadow1',
    name: 'frame shadow soft',
    commands: [["convert", "$INPUT", "-page", "+4+4", "-alpha", "set", "(", "+clone", "-background", "navy", "-shadow", "60x4+4+4", ")", "+swap", "-background", "none", "-mosaic", "$OUTPUT"]],
    description: ' '
  },

  {
    id: 'framePolaroid1',
    name: 'frame polaroid 1',
    commands: [["convert", "$INPUT", "-bordercolor", "white", "-border", "6", "-bordercolor", "grey60", "-border", "1", "-background", "none", "-rotate", "6", "-background", "black", "(", "+clone", "-shadow", "60x4+4+4", ")", "+swap", "-background", "none", "-flatten", "$OUTPUT"]],
    description: ' '
  },
  {
    id: 'framePolaroid2',
    name: 'frame polaroid 2',
    commands: [["convert", "$INPUT", "-bordercolor", "snow", "-background", "black", "+polaroid", "$OUTPUT"]],
    description: ' '
  },
  {
    id: 'framePolaroid3',
    name: 'frame polaroid 3',
    commands: [["convert", "-size", "150x150", "xc:none", "-background", "none", "-fill", "white", "-stroke", "grey60", "-draw", "rectangle 0,0  119,155", "$INPUT", "-geometry", "+5+5", "-composite", "-rotate", "-10", "-draw", "rectangle 0,0 119,155", "$INPUT", "-geometry", "+5+5", "-composite", "-rotate", "-10", "-draw", "rectangle 0,0 119,155", "$INPUT", "-geometry", "+5+5", "-composite", "-rotate", "+10", "-trim", "+repage", "-background", "LightSteelBlue", "-flatten", "$OUTPUT"]],
    description: ' '
  },
  {
    id: 'framePolaroid4',
    name: 'frame polaroid 4',
    commands: [["convert", "-caption", 'Spiral Staircase, Arc de Triumph, Paris, April 2006', "$INPUT", '-thumbnail', '240x240', '-bordercolor', 'Lavender', '-border', '5x5', '-density', '144', '', '-gravity', 'center', '-pointsize', '8', '-background', 'black', '-polaroid', '-15', '-resize', '50%', "$OUTPUT"]],
    description: ' '
  },

]