import { ArgumentType } from "imagemagick-browser";
import { registerMagickTemplates } from '../magickTemplates';
import { TextBannerVibratoFont } from './TextBannerVibrato';
import { MagickTemplateArgument } from '../MagickTemplate';
import { TextBannerBlurShadowFont } from './TextBannerBlurShadow';
import { store } from 'src';

export function registerAllTextBanners(){
  const all = [
    new TextBannerVibratoFont(), 
    new TextBannerBlurShadowFont()
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
  // {
  //   type: ArgumentType.text,
  //   id: "font",
  //   name: "Font",
  //   description: "Font file to use. By default helvetiva.ttf will be automatically loaded. To use oter fonts, just load .ttf files as if they were images, and set the file name here or leave this empty to use the first .ttf image file detected.",
  //   defaultValue: 'helvetica.ttf'
  // },
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
