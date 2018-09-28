import { CommandTemplate } from '../../components/commandEditor/CommandTemplate';
import { cropTemplate1 } from './templates/cropTemplate1';
import { vignetteTemplate1 } from './templates/vignetteTemplate1';
import { polaroidTemplate2 } from './templates/polaroid2';
import { tornPaper1 } from './templates/tornPaper1';
import { polaroidTemplate3 } from './templates/polaroid3';
import { plasmaFrame1 } from './templates/plasmaFrame1';
import { shadowFrame1 } from './templates/shadowFrame1';
import { virtualRandom1 } from './templates/virtualRandom1';
import { frameFeathering1 } from './templates/frameFeathering1';

export const imageFrames: CommandTemplate[] = [
  cropTemplate1,
  vignetteTemplate1,
  polaroidTemplate2,
  polaroidTemplate3,
  tornPaper1,
  plasmaFrame1,
  shadowFrame1,
  virtualRandom1,
  frameFeathering1,

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
    id: 'framePolaroid1',
    name: 'frame polaroid 1',
    commands: [["convert", "$INPUT", "-bordercolor", "white", "-border", "6", "-bordercolor", "grey60", "-border", "1", "-background", "none", "-rotate", "6", "-background", "black", "(", "+clone", "-shadow", "60x4+4+4", ")", "+swap", "-background", "none", "-flatten", "$OUTPUT"]],
    description: ' '
  },
  {
    id: 'framePolaroid4',
    name: 'frame polaroid 4',
    commands: [["convert", "-caption", 'Spiral Staircase, Arc de Triumph, Paris, April 2006', "$INPUT", '-thumbnail', '240x240', '-bordercolor', 'Lavender', '-border', '5x5', '-density', '144', '', '-gravity', 'center', '-pointsize', '8', '-background', 'black', '-polaroid', '-15', '-resize', '50%', "$OUTPUT"]],
    description: ' '
  },

]