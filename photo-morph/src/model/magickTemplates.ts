import { registerAllMagickTemplateMorphs } from './morph/morphs';
import { MagickTemplate } from './MagickTemplate';

export function getMagickTemplates(): MagickTemplate[] {
  if (!magickTemplates) {
    magickTemplates = []
    registerAllMagickTemplateMorphs()
  }
  return magickTemplates
}
let magickTemplates: MagickTemplate[]

export function registerMagickTemplates(arr: MagickTemplate[]) {
  const templates = getMagickTemplates()
  arr.forEach(t => templates.push(t))
}
