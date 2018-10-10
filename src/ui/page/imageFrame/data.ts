import { CommandTemplate, Color, SizedImageContext, ArgumentType } from "imagemagick-browser";
import { cropTemplate1 } from './templates/cropTemplate1';
import { vignetteTemplate1 } from './templates/vignetteTemplate1';
import { polaroidTemplate2 } from './templates/polaroid2';
import { tornPaper1 } from './templates/tornPaper1';
import { polaroidTemplate3 } from './templates/polaroid3';
import { plasmaFrame1 } from './templates/plasmaFrame1';
import { shadowFrame1 } from './templates/shadowFrame1';
import { virtualPixel1 } from './templates/virtualPixel1';
import { frameFeathering1 } from './templates/frameFeathering1';
import { frameShape1 } from './templates/frameShape1';
import { tornPaper2 } from './templates/tornPaper2';
import { DistortPerspective1 } from './templates/distortPerspective1';
import { oilTemplate } from "./templates/oilTemplate";
import { SpreadTemplate } from "./templates/spreadTemplate";
import { ditherColorsTemplate } from "./templates/ditherColorsTemplate1";
import { morphologyTemplate } from "./templates/morphologyTemplate1";
import { shadeTemplate } from "./templates/shadeTemplate";
import { sketchTemplate } from "./templates/sketchTemplate";
import { swirlTemplate } from "./templates/swirlTemplate";

export const imageFrames: CommandTemplate[] = [
  cropTemplate1,
  vignetteTemplate1,
  polaroidTemplate2,
  polaroidTemplate3,
  tornPaper1,
  tornPaper2,
  plasmaFrame1,
  shadowFrame1,
  virtualPixel1,
  frameFeathering1,
  frameShape1,
  DistortPerspective1,
  oilTemplate,
  SpreadTemplate,
  ditherColorsTemplate,
  morphologyTemplate,
  shadeTemplate,
  sketchTemplate,
  swirlTemplate,
  
  // {
  //   id: 'frameFeathering2',
  //   name: 'frame soft rounded corners',
  //   commands: [["convert", "$INPUT", "-alpha", "set", "-virtual-pixel", "transparent", "-channel", "A", "-blur", "0x8", "", "-level", "50%,100%", "+channel", "$OUTPUT"]],
  //   description: 'You can also Feather Images using Blur, using the same method of adding a transparent Virtual Pixels before bluring just the alpha channel. This generates a more softer feathering to the image, as well as noticeably rounded the corners of the image.'
  // },
  // {
  //   id: 'frameFeathering3',
  //   name: 'frame rounded corners',
  //   commands: [["convert", "$INPUT", "-alpha", "set", "-virtual-pixel", "transparent", "-channel", "A", "-blur", "0x8", "", "-threshold", "50%", "+channel", "$OUTPUT"]],
  //   description: ' '
  // },


  // {
  //   id: 'frameTornPaperEdge1',
  //   name: 'frame torn paper edges 1',
  //   commands: [["convert", "$INPUT", "(", "+clone", "-alpha", "extract", "-virtual-pixel", "black", "-spread", "10", "-blur", "0x3", "-threshold", "50%", "-spread", "1", "-blur", "0x.7", ")", "-alpha", "off", "-compose", "Copy_Opacity", "-composite", "$OUTPUT"]],
  //   description: ' '
  // },
  // // {
  // //   id: 'frameTornPaperEdge2',
  // //   name: 'frame torn paper edges 2',
  // //   commands: [["convert", "$INPUT", "-bordercolor", "linen", "-border", "8x8", "-background", "Linen", "", "-gravity", "SouthEast", "-splice", "10x10+0+0", "(", "+clone", "-alpha", "extract", "-virtual-pixel", "black", "-spread", "10", "-blur", "0x3", "-threshold", "50%", "-spread", "1", "-blur", "0x.7", ")", "-alpha", "off", "-compose", "Copy_Opacity", "-composite", "-gravity", "SouthEast", "-chop", "10x10", "$OUTPUT"]],
  // //   description: ' '
  // // },


  // {
  //   id: 'framePolaroid1',
  //   name: 'frame polaroid 1',
  //   commands: [["convert", "$INPUT", "-bordercolor", "white", "-border", "6", "-bordercolor", "grey60", "-border", "1", "-background", "none", "-rotate", "6", "-background", "black", "(", "+clone", "-shadow", "60x4+4+4", ")", "+swap", "-background", "none", "-flatten", "$OUTPUT"]],
  //   description: ' '
  // },
  // {
  //   id: 'framePolaroid4',
  //   name: 'frame polaroid 4',
  //   commands: [["convert", "-caption", 'Spiral Staircase, Arc de Triumph, Paris, April 2006', "$INPUT", '-thumbnail', '240x240', '-bordercolor', 'Lavender', '-border', '5x5', '-density', '144', '', '-gravity', 'center', '-pointsize', '8', '-background', 'black', '-polaroid', '-15', '-resize', '50%', "$OUTPUT"]],
  //   description: ' '
  // },

]