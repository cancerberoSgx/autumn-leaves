import { ExecuteCommand } from 'wasm-imagemagick';

export interface Example {
  name: string
  description: string
  command: ExecuteCommand
  tags?: ExampleTag[]
}
export enum ExampleTag {
  animation,
  info,
  drawing,
  gradient,
  morph,
  color,
  append,
  format,
  distort
}
export const morphs = [

  {
    name: 'morph resize',
    description: `https://www.imagemagick.org/Usage/anim_mods/#morph_resize`,
    tags: [ExampleTag.morph,ExampleTag.animation],
    command: `
    convert $$IMAGES -morph 10 \\
    -layers TrimBounds -set dispose previous -coalesce \\
    -background black -alpha remove \\
    -set delay '%[fx:(t>0&&t<n-1)?10:60]' \\
    -duplicate 1,-2-1  -loop 0  morph_resize.gif
    
         `.trim(),
  },
  {
    name: 'morph color',
    description: `https://www.imagemagick.org/Usage/anim_mods/#morph_color`,
    tags: [ExampleTag.morph,ExampleTag.animation],
    command: `
    convert $$IMAGES  -morph 5 \\
    -set delay '%[fx:(t>0&&t<n-1)?10:240]' \\
    -duplicate 1,-2-1    rose_flip_anim.gif
    
         `.trim(),
  },

  {
    name: 'morph tile',
    description: `https://www.imagemagick.org/Usage/anim_mods/#morph_color`,
    tags: [ExampleTag.morph,ExampleTag.animation],
    command: `
 convert $$IMAGES \\
    \( -clone 0 -crop 3x0 \) \\
    -set delay 10 -loop 0  wipe.gif

    convert -size 100x60 -delay 100 \\
    gradient:green-yellow gradient:blue-purple \\
    gradient:orange-white gradient:red-black \\
    -write mpr:stack -delete 0--1 \\
    \\
    mpr:stack'[0]' \( mpr:stack'[1]' -set delay 5 -crop 4x0 \) \\
    mpr:stack'[1]' \( mpr:stack'[2]' -set delay 5 -crop 0x4 \) \\
    mpr:stack'[2]' \( mpr:stack'[3]' -set delay 5 -crop 4x0 -reverse \) \\
    mpr:stack'[3]' \( mpr:stack'[0]' -set delay 5 -crop 0x4 -reverse \) \\
    -loop 0 wipe_all.gif
    
         `.trim(),
  },
]