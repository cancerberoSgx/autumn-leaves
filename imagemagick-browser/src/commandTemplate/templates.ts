import { CommandTemplate } from "../";
import { colorizeTemplate } from "./templates/colorizeTemplate";
import { cropTemplate1 } from './templates/cropTemplate1';
import { DistortPerspective1 } from './templates/distortPerspective1';
import { ditherColorsTemplate } from "./templates/ditherColorsTemplate1";
import { frameFeathering1 } from './templates/frameFeathering1';
import { frameShape1 } from './templates/frameShape1';
import { morphologyTemplate } from "./templates/morphologyTemplate1";
import { oilTemplate } from "./templates/oilTemplate";
import { plasmaFrame1 } from './templates/plasmaFrame1';
import { polaroidTemplate2 } from './templates/polaroid2';
import { polaroidTemplate3 } from './templates/polaroid3';
import { replaceColorTemplate } from "./templates/replaceColorTemplate";
import { shadeTemplate } from "./templates/shadeTemplate";
import { shadowFrame1 } from './templates/shadowFrame1';
import { sharpenBlurTemplate } from "./templates/sharpenBlurTemplate";
import { shearTemplate } from "./templates/shearTemplate";
import { sketchTemplate } from "./templates/sketchTemplate";
import { SpreadTemplate } from "./templates/spreadTemplate";
import { swirlTemplate } from "./templates/swirlTemplate";
import { tintTemplate } from "./templates/tintTemplate";
import { tornPaper1 } from './templates/tornPaper1';
import { tornPaper2 } from './templates/tornPaper2';
import { vignetteTemplate1 } from './templates/vignetteTemplate1';
import { virtualPixel1 } from './templates/virtualPixel1';
import { waveTemplate } from "./templates/waveTemplate";
import { RotateGif } from "./templates/rotateGif";

export const templates: CommandTemplate[] = [
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
  waveTemplate,
  tintTemplate,
  replaceColorTemplate,
  shearTemplate,
  sharpenBlurTemplate,
  colorizeTemplate,
  RotateGif

]