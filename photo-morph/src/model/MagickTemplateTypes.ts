import { MagickTemplateTag } from "./MagickTemplate";

export type MagickTemplateTypes = MagickTemplateTag.morph | MagickTemplateTag.frame | MagickTemplateTag.color | MagickTemplateTag.textBanner | MagickTemplateTag.all

export interface MagickTemplateType {
  id: string
  type: MagickTemplateTypes
  name: string
  description: string
}

export const magickTemplateTypes: MagickTemplateType[] = [
  {
    id: 'all',
    name: 'All',
    description: 'Show all kind of magick',
    type: MagickTemplateTag.all,
  },
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
  },
  {
    id: 'color-tools',
    name: 'Color Tools',
    description: 'Tools for color processing and manipulation such as color filling / replacement, saturation, hue, color channels, palettes, and general color effects',
    type: MagickTemplateTag.color,
  }
]