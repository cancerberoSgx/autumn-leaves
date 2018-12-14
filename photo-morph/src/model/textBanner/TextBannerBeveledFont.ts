import { ArgumentType } from "imagemagick-browser";
import { extractInfoOne } from 'src/util/toCommitInWASMIM';
import { buildInputFile, execute } from "wasm-imagemagick";
import { MagickTemplate, MagickTemplateArgument, MagickTemplateTag, MorphConfig } from "../MagickTemplate";
import { textCommonArguments } from './textBanners';


export class TextBannerBeveledFont implements MagickTemplate {
  name = "Text Banner Beveled Font"
  id = "textBannerBlurBeveledFont"
  description = `TODO`
  tags = [MagickTemplateTag.textBanner]
  arguments = [].concat(textCommonArguments).concat([

  ])

  async template(config: MorphConfig) {
    const fontName = (config.arguments.font + '') || 'helvetica.ttf'
    const inputFiles = config.inputFiles.map(f => f.file).concat(fontName === 'helvetica.ttf' ? [await buildInputFile('helvetica.ttf')] : [])
    // buildFile Candice.ttf

    // convert -font Candice.ttf -pointsize 64 -background black -fill white \
    //           'label:Arriba nosotros'  -trim +repage -bordercolor black -border 10x5 \
    //           shade_a_mask.gif
    
      // convert shade_a_mask.gif   -shade  135x45   shade_direction_135.gif 
      // convert shade_a_mask.gif   -shade  90x90   shade_elevation_90.gif
    
    // convert shade_direction_135.gif \
    //           ( shade_elevation_90.gif -normalize -negate \
    //              shade_a_mask.gif -compose screen -composite ) \
    //           -alpha Off -compose CopyOpacity -composite  -alpha On  -normalize  -fill Red -tint 80% shade_beveled_plus.png
    
    const commands = `
convert -background black -fill white -font '${fontName}' -pointsize ${config.arguments.fontSize} 'label:${config.arguments.text}' \\
-trim +repage -bordercolor black -border 10x5 shade_a_mask.gif

convert shade_a_mask.gif   -shade  135x45   shade_direction_135.gif 
convert shade_a_mask.gif   -shade  90x90   shade_elevation_90.gif

convert shade_direction_135.gif \\
( shade_elevation_90.gif -normalize -negate \\
   shade_a_mask.gif -compose screen -composite ) \\
-alpha Off -compose CopyOpacity -composite  -alpha On  -normalize  -fill ${config.arguments.textColor} -tint 80% \`uniqueName\`.png

    `
    const result = await execute({ inputFiles, commands })
    return result
  }
}

