import { ArgumentType } from "imagemagick-browser";
import { extractInfoOne } from 'src/util/toCommitInWASMIM';
import { buildInputFile, execute, MagickFile, MagickInputFile } from "wasm-imagemagick";
import { MagickTemplate, MagickTemplateArgument, MagickTemplateTag, MorphConfig } from "../MagickTemplate";
import { textCommonArguments, prepareDefaultFont } from './textBanners';


export class TextBannerBeveledFont implements MagickTemplate {
  name = "Text Banner Beveled Font"
  id = "textBannerBlurBeveledFont"
  description = `TODO`
  tags = [MagickTemplateTag.textBanner]
  arguments = [].concat(textCommonArguments).concat([

  ])

  async template(config: MorphConfig) {
    const {fontName, inputFiles} = await prepareDefaultFont(config)
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
