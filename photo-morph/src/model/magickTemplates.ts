import { registerAllMagickTemplateColorTools } from './colorTools/colorTools';
import { registerAllMagickTemplateFrameDecorations } from './frameDecorations/frameDecorations';
import { MagickTemplate } from './MagickTemplate';
import { registerAllMagickTemplateMorphs } from './morph/morphs';
import { registerAllTextBanners } from './textBanner/textBanners';

export function getMagickTemplates(): MagickTemplate[] {
  if (!magickTemplates) {
    magickTemplates = []
    registerAllMagickTemplateMorphs()
    registerAllTextBanners()
    registerAllMagickTemplateColorTools()
    registerAllMagickTemplateFrameDecorations()
  }
  return magickTemplates
}
let magickTemplates: MagickTemplate[]

export function registerMagickTemplates(arr: MagickTemplate[]) {
  const templates = getMagickTemplates()
  arr.forEach(t => templates.push(t))
}
