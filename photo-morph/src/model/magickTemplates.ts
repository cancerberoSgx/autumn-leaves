import { registerAllMagickTemplateMorphs } from './morph/morphs';
import { MagickTemplate } from './MagickTemplate';
import { registerAllTextBanners } from './textBanner/textBanners';
import { registerAllMagickTemplateColorTools } from './colorTools/colorTools';

export function getMagickTemplates(): MagickTemplate[] {
  if (!magickTemplates) {
    magickTemplates = []
    registerAllMagickTemplateMorphs()
    registerAllTextBanners()
    registerAllMagickTemplateColorTools()
  }
  return magickTemplates
}
let magickTemplates: MagickTemplate[]

export function registerMagickTemplates(arr: MagickTemplate[]) {
  const templates = getMagickTemplates()
  arr.forEach(t => templates.push(t))
}
