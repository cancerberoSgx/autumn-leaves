import { asInputFile, asOutputFile, buildImageSrc, execute, ExecuteCommand, ExecuteConfig, extractInfo, getFileNameExtension, MagickInputFile, MagickOutputFile } from "wasm-imagemagick"

import { Argument, ArgumentType, Color, Command, CommandTemplate, SizedImageContext, TemplateContext } from "imagemagick-browser"

import { ImageState } from "src/store/store"
export interface Morph {
  name: string
  description: string
  command: string
  tags?: MorphTag[]

  arguments?: Argument[]

  template?: (config: MorphConfig)=>Promise<ImageState[]>
}

export interface MorphConfig {
  inputFiles: ImageState[]
  arguments: {[key: string]: (string|number)}
}

export enum MorphTag {
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

export const morphs: Morph[] = [

  {
    name: "morph resize",
    description: `https://www.imagemagick.org/Usage/anim_mods/#morph_resize`,
    tags: [MorphTag.morph,MorphTag.animation],
    command: `
    convert $$IMAGES -morph 10 \\
    -layers TrimBounds -set dispose previous -coalesce \\
    -background black -alpha remove \\
    -set delay '%[fx:(t>0&&t<n-1)?10:60]' \\
    -duplicate 1,-2-1  -loop 0  morph_resize.gif
         `.trim(),
  },
  {
    name: "morph color",
    description: `https://www.imagemagick.org/Usage/anim_mods/#morph_color`,
    tags: [MorphTag.morph,MorphTag.animation],
    command: `
    convert $$IMAGES  -morph 5 \\
    -set delay '%[fx:(t>0&&t<n-1)?10:240]' \\
    -duplicate 1,-2-1    rose_flip_anim.gif
         `.trim(),
  },
    {
      name: "morph tile",
      description: `https://www.imagemagick.org/Usage/anim_mods/#morph_color`,
      tags: [MorphTag.morph,MorphTag.animation],
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

//   {
//     name: "morph color2",
//     description: `https://www.imagemagick.org/Usage/anim_mods/#morph_color`,
//     tags: [MorphTag.morph,MorphTag.animation],
//          template: async (config: MorphConfig):  Promise<ImageState[]> => {
//           const newSize = `${config.inputFiles[0].info.image.geometry.width}x${config.inputFiles[0].info.image.geometry.height}`
//           const extension = getFileNameExtension(config.inputFiles[1].name)
//           const resizeCommands = `convert ${config.inputFiles[1].name} -resize ${newSize}> -size ${newSize} xc:white +swap -gravity center -composite newImage.${extension}`

//           const inputFiles = config.inputFiles.map(f=>f.file)
//           const resizeResult = await execute({inputFiles, commands: resizeCommands})
//           inputFiles[1] = await asInputFile(resizeResult.outputFiles[0])
      
//           const commands = `
//           convert ${inputFiles[0].name} ${inputFiles[1].name} \\
//             -morph ${config.arguments.frames} \\
//             -set delay "%[fx:(t>0&&t<n-1)?10:240]" \\
//             -duplicate 1,-2-1 output.gif`

//           // const commands = morph.command.replace("$$IMAGES", inputFiles.map(f => f.name).join(" "))
//           const result = await execute({ inputFiles, commands })
          
//           const file = result.outputFiles[0]
//           return [{
//             file: await asInputFile(file), 
//             name: file.name,
//             href: URL.createObjectURL((await asOutputFile(file)).blob),
//             info: (await extractInfo(file))[0],
//             isSelected: false,
//             src: await buildImageSrc(file)
//           }]

//          },
//         arguments: [
//           {
//             type: ArgumentType.number,
//             id: "frames",
//             name: "frames",
//             description: "determine how many images to interpolate between each image",
//             defaultValue: 5
//           },
//           {
//             type: ArgumentType.color,
//             id: "backgroundColor",
//             name: "Background Color",
//             description: "background color for the smaller image that is enlarged",
//             defaultValue: "#ffffff"
//           },
//         ],

//   },
// ]


// import { CommandTemplateTag } from "../commandTemplate";

// export interface ColorMorphContext extends TemplateContext {
//   value: number
//   color: Color
//   image1Name: string
//   image2Name: string
// }
// // -colorize amount -interpolate SOMETHING https://www.imagemagick.org/script/command-line-options.php#colorize
// export const colorizeTemplate: CommandTemplate<ColorMorphContext> = {
//   id: "color morph",
//   name: "color morph",
//   description: ``,
//   template: context => `
//   convert $$IMAGES  -morph 5 \\
//     -set delay '%[fx:(t>0&&t<n-1)?10:240]' \\
//     -duplicate 1,-2-1 output.gif
//   `,
//   defaultTemplateContext: {
//     value: 10, 
//     color: "#ed9843"
//   },
//   arguments: [
//     {
//       type: ArgumentType.number,
//       id: "value",
//       name: "value",
//       description: "TODO"
//     },
//     {
//       type: ArgumentType.color,
//       id: "color",
//       name: "color",
//       description: "TODO"
//     },
//   ],
//   tags: [CommandTemplateTag.colors]
// }
  ]