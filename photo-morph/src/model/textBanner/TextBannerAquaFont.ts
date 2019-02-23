import { buildInputFile, execute } from "wasm-imagemagick";
import { MagickTemplate, MagickTemplateTag, MorphConfig } from "../MagickTemplate";
import { textCommonArguments, prepareDefaultFont } from './textBanners';

export class TextBannerAquaFont implements MagickTemplate {
  name = "Text Banner Aqua Font"
  id = "textBannerBlurAquaFont"
  description = `TODO`
  tags = [MagickTemplateTag.textBanner]
  arguments = [].concat(textCommonArguments).concat([

  ]).map(a => a.id === 'textColor' ? { ...a, defaultValue: '#7472b2' } : a.id === 'fontSize' ? { ...a, defaultValue: 172 } : a)

  async template(config: MorphConfig) {
    const {fontName, inputFiles} = await prepareDefaultFont(config)
    const commands = `
convert -background none -fill ${config.arguments.textColor} \\
  -font '${fontName}' -pointsize ${config.arguments.fontSize}  'label:${config.arguments.text}'   -trim +repage \\
  -bordercolor None -border 1x1  \\
  aqua_shape.png

convert aqua_shape.png  \\
  -alpha Extract -blur 0x4 -shade 170x30 -alpha On \\
  -background gray50 -alpha background  -function polynomial  '3.5,-5.05,2.05,0.3' -auto-level -normalize \\
  aqua_shade.png

convert aqua_shade.png aqua_shape.png \\
  -alpha Off -compose CopyOpacity -composite    aqua_shade-mask.png

convert aqua_shape.png aqua_shade-mask.png \\
  -compose Hardlight -composite   \`uniqueName\`.png
    
    `
    const result = await execute({ inputFiles, commands })
    return result
  }
}

