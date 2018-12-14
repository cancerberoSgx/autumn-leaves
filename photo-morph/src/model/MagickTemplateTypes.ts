import { MagickTemplateTag } from "./MagickTemplate";

export type MagickTemplateTypes = MagickTemplateTag.morph | MagickTemplateTag.frame | MagickTemplateTag.textBanner

export interface MagickTemplateType {
  id: string
  type: MagickTemplateTypes
  name: string
  description: string
}

export const magickTemplateTypes: MagickTemplateType[] = [
  {
    id: 'morphs',
    name: 'Morphs',
    description: 'Animations from one image that slowly mutates into another',
    type: MagickTemplateTag.morph,
  },
  {
    id: 'text-banners',
    name: 'Text banners',
    description: 'Text banners using cool font effects, composition and animation',
    type: MagickTemplateTag.textBanner,
  },
  {
    id: 'frame-decors',
    name: 'Frame decorations',
    description: 'Decorate images with frames-like effects',
    type: MagickTemplateTag.frame,
  }
]