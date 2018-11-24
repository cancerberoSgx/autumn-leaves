import { Argument, ArgumentType, Color, seq } from "imagemagick-browser"
import { ImageState } from "src/store/store"
import { getUniqueId } from "src/util/misc"
import { asInputFile, execute, MagickInputFile, MagickOutputFile } from "wasm-imagemagick"

export interface Morph<Config extends MorphConfig = MorphConfig> {
  name: string
  description: string
  command: string
  tags?: MorphTag[]
  id: string
  arguments?: Argument[]
  template(config: Config): Promise<MagickOutputFile[]>
}

export interface MorphConfig {
  inputFiles: ImageState[]
  arguments: CommonArguments
}
export interface CommonArguments extends Arguments { frames: number, loop: number, imageWidth: number, imageHeight: number }
interface Arguments { [key: string]: (string | number) }

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

const commonArguments : Argument[]= [
  {
    type: ArgumentType.number,
    id: "loop",
    name: "loop",
    description: "Set iterations to zero to repeat the animation an infinite number of times, otherwise the animation repeats itself up to iterations times.",
    defaultValue: 0
  },
]

class MutateAndLint implements Morph {
  name = "swirl"
  id = "swirl"
  description = `mutate both images and tint with same color until both are very similar, then concatenate sequences`
  tags = [MorphTag.morph, MorphTag.animation]
  command = ""
  arguments: Argument[] = [
    {
      type: ArgumentType.number,
      id: "swirlFactor",
      name: "swirlFactor",
      description: "",
      defaultValue: 100
    },
    {
      type: ArgumentType.number,
      id: "frames",
      name: "frames",
      description: "determine how many images to interpolate between each image",
      defaultValue: 6
    } as Argument
  ].concat(commonArguments)
  async template(config: MorphConfig & { arguments: Arguments & { frames: number, swirlFactor: number } }) {
    const inputFiles = await forceSameSize(config)
    const swirl = seq(1, 1, config.arguments.frames).map(i => Math.round(i * config.arguments.swirlFactor))
    const fileNames1 = []
    const fileNames2 = []
    const commands = `
      ${swirl.map((swirl, i) => {
        const name1 = `img1_${i}.miff`
        fileNames1.push(name1)
        const name2 = `img2_${i}.miff`
        fileNames2.push(name2)
        return `
        convert ${inputFiles[0].name} -swirl ${swirl} ${name1}
        convert ${inputFiles[1].name} -swirl ${swirl} ${name2}
        `
      }).join("\n")}
      
      convert -morph 2 -delay 100 ${inputFiles[0].name} -delay 10 ${[].concat(fileNames1).concat(fileNames2.reverse()).join(" ")} -delay 200 ${inputFiles[1].name} -delay 10 ${fileNames2.reverse().join(" ")} ${fileNames1.reverse().join(" ")} ${inputFiles[0].name} -loop 0 -layers Optimize out${getUniqueId()}.gif`

    const result = await execute({ inputFiles, commands })
    return [result.outputFiles[result.outputFiles.length - 1]]
  }
}

class ColorMorph implements Morph {
  name = "morph color"
  id = "colorMorph"
  description = `https://www.imagemagick.org/Usage/anim_mods/#morph_color`
  tags = [MorphTag.morph, MorphTag.animation]
  command = ""
  arguments = [
    {
      type: ArgumentType.color,
      id: "backgroundColor",
      name: "Background Color",
      description: "background color for the smaller image that is enlarged",
      defaultValue: "#ffffff"
    } as Argument,
    {
      type: ArgumentType.number,
      id: "frames",
      name: "frames",
      description: "determine how many images to interpolate between each image",
      defaultValue: 6
    },
  ].concat(commonArguments)

  async template(config) {
    const inputFiles = await forceSameSize({...config, backgroundColor: config.arguments.backgroundColor})
    const commands = `
      convert ${inputFiles[0].name} ${inputFiles[1].name} \\
        -morph ${config.arguments.frames} \\
        -set delay '%[fx:(t>0&&t<n-1)?10:640]' \\
        -duplicate 1,-2-1 -loop ${config.arguments.loop} output${getUniqueId()}.gif`
    const result = await execute({ inputFiles, commands })
    return result.outputFiles
  }
}


class ComposeMorph implements Morph {
  name = "compose"
  id = "composeMorph"
  description = `http://www.imagemagick.org/Usage/compose/#dissolve`
  tags = [MorphTag.morph, MorphTag.animation]
  command = ""
  arguments: Argument[] = [
    {
    type: ArgumentType.color,
    id: "backgroundColor",
    name: "Background Color",
    description: "background color for the smaller image that is enlarged",
    defaultValue: "#ffffff"
  } ,
    {
      type: ArgumentType.selectOne,
      id: "method",
      name: "Method",
      list: [{id: "dissolve", name: "dissolve"}, {id: "blend", name: "blend"} ],
      description: "compose method",
      defaultValue: "dissolve"
    } as Argument,
  ].concat(commonArguments)

  async template(config) {
    const inputFiles = await forceSameSize({...config, backgroundColor: config.arguments.backgroundColor})
    const list = seq(1, 1, 10).map(i=>i*10)
    const commands = `
    convert ${inputFiles[0].name} f0.miff
    convert ${inputFiles[1].name} f1.miff
    ${list.map(i=>
      `convert f0.miff f1.miff -alpha on \\
    -compose ${config.arguments.method}  -define compose:args=${i} \\
    -gravity South  -composite     compose_output_${i}.miff`).join("\n")}
    convert -delay 50 f0.miff -morph 4 -delay 20 ${list.map(i=>`compose_output_${i}.miff`).join(" ")} -delay 200 f1.miff -delay 20 ${list.map(i=>`compose_output_${i}.miff`).reverse().join(" ")} output.gif
    `
    const result = await execute({ inputFiles, commands })
    return [result.outputFiles[result.outputFiles.length-1]]
  }

}



class PixelatedMorph implements Morph {
  name = "pixelated"
  id = "pixelated "
  description = `http://www.imagemagick.org/Usage/transform/#pixelate`
  tags = [MorphTag.morph, MorphTag.animation]
  command = ""
  arguments: Argument[] = [
    {
    type: ArgumentType.color,
    id: "backgroundColor",
    name: "Background Color",
    description: "background color for the smaller image that is enlarged",
    defaultValue: "#ffffff"
  } ,
  {
  type: ArgumentType.number,
  id: "count",
  name: "Pixelation amount",
  description: "The larger, the more pixelated the images will be in the animation",
  defaultValue: 10
} ,
    {
      type: ArgumentType.selectOne,
      id: "method",
      name: "Method",
      list: [{id: "sample", name: "sample"}, {id: "scale", name: "scale"}, {id: "resize", name: "resize"} ],
      description: "compose method",
      defaultValue: "sample"
    } as Argument,
  ].concat(commonArguments)

  async template(config) {
    const inputFiles = await forceSameSize({...config, backgroundColor: config.arguments.backgroundColor})
    const list = seq(1, 1, config.arguments.count).map(n=>60/(n*2))
    const newSize = `${config.inputFiles[0].info.image.geometry.width}x${config.inputFiles[0].info.image.geometry.height}`
    // convert f0.miff  -sample 25%  -scale 70x46\!  
    const commands = `
    convert ${inputFiles[0].name} f0.miff
    convert ${inputFiles[1].name} f1.miff
    ${list.map((n, i)=>
      `convert f0.miff -${config.arguments.method} ${n}% -scale ${newSize}! f0_${i}.miff
      convert f1.miff -${config.arguments.method} ${n}% -scale ${newSize}! f1_${i}.miff`).join("\n")}
    convert -delay 50 f0.miff -morph 2 -delay 20 ${list.map((n, i)=>`f0_${i}.miff`).join(" ")} ${list.map((n, i)=>`f1_${i}.miff`).reverse().join(" ")} -delay 200 f1.miff   output.gif
    `
    console.log(commands)
    
    const result = await execute({ inputFiles, commands })
    return [result.outputFiles[result.outputFiles.length-1]]
  }

}





export const morphs: Morph[] = [

  new MutateAndLint(),
  new ColorMorph(),
  new ComposeMorph(),
  new PixelatedMorph(),

  {
    name: "morph resize",
    id: "resizeMorph",
    description: `https:// www.imagemagick.org/Usage/anim_mods/#morph_resize`,
    tags: [MorphTag.morph, MorphTag.animation],
    // arguments: commonArguments,
    command: "",
    arguments: [
      {
        type: ArgumentType.number,
        id: "frames",
        name: "frames",
        description: "determine how many images to interpolate between each image",
        defaultValue: 6
       } as Argument
    ].concat(commonArguments),

    async template(config) {
      const inputFiles = config.inputFiles.map(i => i.file)
      const commands = `
      convert -morph ${config.arguments.frames} \\
      ${inputFiles[0].name} ${inputFiles[1].name} \\
      -layers TrimBounds -set dispose previous -coalesce \\
      -set delay '%[fx:(t>0&&t<n-1)?10:60]' \\
      -duplicate 1,-2-1  -loop ${config.arguments.loop}  output${getUniqueId()}.gif`
      const result = await execute({ inputFiles, commands })
      return [result.outputFiles[result.outputFiles.length-1]]
    }
  },
  {
    name: "morph tile",
    id: "tileMorph",
    description: `https://www.imagemagick.org/Usage/anim_mods/#morph_color`,
    tags: [MorphTag.morph, MorphTag.animation],
    command: "",
    arguments: [
      {
        type: ArgumentType.color,
        id: "backgroundColor",
        name: "Background Color",
        description: "background color for the smaller image that is enlarged",
        defaultValue: "#ffffff"
      } as Argument,
      {
        type: ArgumentType.number,
        id: "cropSpeed",
        name: "Crop Speed",
        description: "Horizontal crop speed",
        defaultValue: 9
      } as Argument,
      {
        type: ArgumentType.selectOne,
        id: "direction",
        name: "Direction",
        list: [{id: "vertical", name: "vertical"}, {id: "horizontal", name: "horizontal"}, {id: "both", name: "both"}],
        description: "crop direction",
        defaultValue: "horizontal"
      } as Argument,
    ].concat(commonArguments),

    async template(config) {
      const inputFiles = await forceSameSize({...config, backgroundColor: config.arguments.backgroundColor+""})
      const commands = `
      convert  \\
      ${inputFiles[0].name} ${inputFiles[1].name} \\
      \( -clone 0 -crop ${config.arguments.direction!=="vertical" ? config.arguments.cropSpeed : 0}x${config.arguments.direction!=="horizontal" ? config.arguments.cropSpeed : 0} \) \\
      -set delay 10  -loop ${config.arguments.loop} output${getUniqueId()}.gif`
      const result = await execute({ inputFiles, commands })
      return result.outputFiles
    }
  },

  {
    name: "morph tile 2",
    id: "tileMorph2",
    description: `https://www.imagemagick.org/Usage/anim_mods/#morph_color`,
    tags: [MorphTag.morph, MorphTag.animation],
    arguments: commonArguments,
    command: `
   convert  -delay 100 $$IMAGES \\
      -write mpr:stack -delete 0--1 \\
      mpr:stack[0] \( mpr:stack[1] -set delay 5 -crop 4x0 \) \\
      mpr:stack[1] \( mpr:stack[2] -set delay 5 -crop 0x4 \) \\
      mpr:stack[2] \( mpr:stack[3] -set delay 5 -crop 4x0 -reverse \) \\
      mpr:stack[3] \( mpr:stack[0] -set delay 5 -crop 0x4 -reverse \) \\
      -loop 0 wipe_all.gif
      
           `.trim(),
    template: async c => []
  },


]


async function forceSameSize(config: MorphConfig & { backgroundColor?: Color }): Promise<MagickInputFile[]> {
  const newSize = `${config.inputFiles[0].info.image.geometry.width}x${config.inputFiles[0].info.image.geometry.height}`
  const resizeCommands = `convert ${config.inputFiles[1].file.name} -resize ${newSize}> -size ${newSize} xc:${config.backgroundColor || "white"} +swap -gravity center -composite newImage.miff`
  const inputFiles = config.inputFiles.map(f => f.file)
  const resizeResult = await execute({ inputFiles, commands: resizeCommands })
  inputFiles[1] = await asInputFile(resizeResult.outputFiles[0])
  return inputFiles
}