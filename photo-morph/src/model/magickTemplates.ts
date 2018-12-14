import { registerAllMagickTemplateMorphs } from './morph/morphs';
import { MagickTemplate } from './MagickTemplate';
import { registerAllTextBanners } from './textBanner/textBanners';

export function getMagickTemplates(): MagickTemplate[] {
  if (!magickTemplates) {
    magickTemplates = []
    registerAllMagickTemplateMorphs()
    registerAllTextBanners()
  }
  return magickTemplates
}
let magickTemplates: MagickTemplate[]

export function registerMagickTemplates(arr: MagickTemplate[]) {
  const templates = getMagickTemplates()
  arr.forEach(t => templates.push(t))
}
