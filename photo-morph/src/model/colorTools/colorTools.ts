import { registerMagickTemplates } from "../magickTemplates"
import { MagickTemplate, MagickTemplateArgument } from "../MagickTemplate";
import { FillColorTool } from './FillColorTool';


export function registerAllMagickTemplateColorTools() {

const templates: MagickTemplate[] = [
  new FillColorTool()

]
registerMagickTemplates(templates)
}
