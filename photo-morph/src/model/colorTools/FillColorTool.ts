import { ArgumentType } from "imagemagick-browser";
import { buildExecuteResultWithError, execute } from "wasm-imagemagick";
import { MagickTemplate, MagickTemplateArgument, MagickTemplateTag } from "../MagickTemplate";


export class FillColorTool implements MagickTemplate {
  name = "Fill color tool"
  id = "FillColorTool"
  description = `https://www.imagemagick.org/Usage/anim_mods/#morph_color`
  tags = [MagickTemplateTag.color]
  arguments = [

    {
      type: ArgumentType.selectOne,
      id: "fillMode",
      name: "Fill Mode",
      description: "'floodfill' requires a point and from there it will start filling neibors while 'opaque' will just replace any pixel with fill color",
      defaultValue: "floodfill",
      list: ['floodfill', 'opaque'].map(i => ({ id: i, name: i }))
    } as MagickTemplateArgument,
    {
      type: ArgumentType.color,
      id: "fillColor",
      name: "Fill Color",
      description: "The color to fill in",
      defaultValue: "#cc8877"
    } as MagickTemplateArgument,
    {
      type: ArgumentType.color,
      id: "opaqueColor",
      name: "Opaque Color",
      description: "Required in case fillMode=='opaque'",
      defaultValue: "white"
    } as MagickTemplateArgument,
    {
      type: ArgumentType.number,
      id: "fuzz",
      name: "fuzz",
      description: "tolerance when matching similar colors",
      defaultValue: 6
    },
    {
      type: ArgumentType.number,
      id: "floodfillPointX",
      name: "floodfillPointX",
      description: "required in case mode=='floodfill'",
      defaultValue: 6
    },
    {
      type: ArgumentType.number,
      id: "floodfillPointY",
      name: "floodfillPointY",
      description: "required in case mode=='floodfill'",
      defaultValue: 6
    },


  ].concat([])

  async template(config) {
    if (config.inputFiles.length < 1) {
      return buildExecuteResultWithError('Please select 1 or more images in order to create a morph animation')
    }
    const inputFiles = config.inputFiles.map(f => f.file)
    const commands = `
  <%
  const fuzz=${config.arguments.fuzz}
  const fillMode='${config.arguments.fillMode}'
  const floodfillPointX = ${config.arguments.floodfillPointX}
  const floodfillPointY = ${config.arguments.floodfillPointY}
  const opaqueColor =  '${config.arguments.opaqueColor}'
  const fillColor = '${config.arguments.fillColor}'
  const floodfillFragment = \` -floodfill +\${floodfillPointX}+\${floodfillPointY} \\\`convert '${inputFiles[0].name}' -format '%[pixel:p{\${floodfillPointX},\${floodfillPointY}}]\\\\n' info:\\\`\`
  const opaqueFragment = \`-opaque \${opaqueColor}\`
  %>
  convert '${inputFiles[0].name}' -alpha set -fuzz <%= fuzz%>% -fill <%= fillColor%> \\
    <%= fillMode==='floodfill' ? floodfillFragment : opaqueFragment %> \`uniqueName\`.png
      `
    return await execute({ inputFiles, commands })
  }
}
