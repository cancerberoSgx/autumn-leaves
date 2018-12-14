import { ArgumentType } from "imagemagick-browser";
import { store } from 'src';
import { MagickTemplateArgument } from '../MagickTemplate';
import { registerMagickTemplates } from '../magickTemplates';
import { TextBannerCometFont } from './TextBannerCometFont';
import { TextBannerConicalFont } from './TextBannerConicalFont';
import { TextBannerGradientArc } from './TextBannerGradientArc';
import { TextBannerPsychedelicFont } from './TextBannerPsychedelicFont';
import { TextBannerShearedShadowFont } from './TextBannerShearedShadowFont';
import { TextBannerSmokedFont } from './TextBannerSmokedFont';
import { TextBannerVibratoFont } from './TextBannerVibrato';
import { TextBannerNeonFont } from './TextBannerNeonFont';
import { TextBannerAquaFont } from './TextBannerAquaFont';
import { TextBannerBeveledFont } from './TextBannerBeveledFont';

export function registerAllTextBanners(){
  const all = [
    new TextBannerVibratoFont(), 
    new TextBannerCometFont(),  
    new TextBannerSmokedFont(), 
    new TextBannerPsychedelicFont(), 
    new TextBannerShearedShadowFont(),
    new TextBannerConicalFont(),
    new TextBannerGradientArc(),
    new TextBannerNeonFont(), 
    new TextBannerAquaFont(),
    new TextBannerBeveledFont()
  ]
  registerMagickTemplates(all)
}



export const textCommonArguments = [
  {
    type: ArgumentType.text,
    id: "text",
    name: "Text",
    description: "Text",
    defaultValue: "Cool Banner"
  },
  {
    type: ArgumentType.selectOne,
    id: "font",
    name: "Font",
    description: "Font file to use. By default helvetica.ttf will be automatically loaded. To use other fonts, just load .ttf files as if they were images and they will be available for selection in this list. ",
    list: ()=>store.getState().images.filter(i=>['ttf', 'otf'].indexOf(i.info.image.format.toLowerCase())!==-1).map(i=>({id: i.file.name, name:i.file.name})).concat([{id: 'helvetica.ttf', name: 'helvetica.ttf'}]),
    defaultValue: 'helvetica.ttf'
  },
  
  {
    type: ArgumentType.color,
    id: "backgroundColor",
    name: "Background Color",
    description: "background color",
    defaultValue: "#ffffff"
  },
  {
    type: ArgumentType.color,
    id: "textColor",
    name: "Text Color",
    description: "Text color",
    defaultValue: "#000000"
  },
  {
    type: ArgumentType.number,
    isInteger: true,
    id: "fontSize",
    name: "Font size ",
    description: "Font size (in points)",
    defaultValue: 72
  },

] as MagickTemplateArgument[]
