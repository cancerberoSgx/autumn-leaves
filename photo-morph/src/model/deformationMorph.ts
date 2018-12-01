import { Argument, ArgumentType, list, seq } from "imagemagick-browser"
import { getUniqueId } from "src/util/misc"
import { execute, IMNoise, IMVirtualPixel } from "wasm-imagemagick"
import {commonArguments, forceSameSize} from "./morphs"
import { CommonArguments, Morph, MorphConfig, MorphTag } from "./morphTypes"

type DeformationArguments = CommonArguments & {
  frames: number,
  transformationFactor: number,
  delayShort: number,
  delayLong: number,
  backAndForwards: boolean,
}

type DeformationConfig = MorphConfig & {
  arguments: DeformationArguments,
}

interface ArgumentsConfig {
  arguments?: Partial<DeformationArguments>,
  extraArguments?: Argument[],
  transformCommand: (config: DeformationConfig, value: number) => string,
  framesValues?: (i: number, config: DeformationConfig) => number
}

const argumentsConfigDefaults: ArgumentsConfig = {
  framesValues: ((i, config) => Math.round(i * config.arguments.transformationFactor)),
  arguments: {
    imageWidth: 0,
    imageHeight: 0,
    backAndForwards: true,
    loop: 0,
    transformationFactor: 100,
    frames: 10,
    delayLong: 100,
    delayShort: 10,
  } as DeformationArguments,
  extraArguments: [],
  transformCommand: (config, value) => `-swirl ${value}`
}

export class DeformationMorph implements Morph {
  description = `mutate both images and concatenate the sequences`
  tags = [MorphTag.morph, MorphTag.animation]
  command = ""
  arguments: Argument[]
  constructor(public id: string, public name: string = id, protected argumentConfig: Partial<ArgumentsConfig>) {

    this.argumentConfig = { 
      ...argumentsConfigDefaults, ...argumentConfig, arguments: { 
        ...argumentsConfigDefaults.arguments||{}, 
        ...argumentConfig.arguments || {} 
      } 
    }

    this.arguments = [
      {
        type: ArgumentType.number,
        id: "transformationFactor",
        name: "transformation factor",
        description: "",
        defaultValue: this.argumentConfig.arguments.transformationFactor
      },
      {
        type: ArgumentType.boolean,
        id: "backAndForwards",
        name: "back and forwards",
        description: "If true it will perform the transformation twice, first from image 1 to image 2, and then from image 2 to image 1",
        defaultValue: true
      },
      {
        type: ArgumentType.number,
        id: "frames",
        name: "frames",
        description: "determine how many deformed frames to create",
        defaultValue: this.argumentConfig.arguments.frames
      } as Argument,
      {
        type: ArgumentType.number,
        id: "delayShort",
        name: "delayShort",
        description: "how much delay between deformed frames",
        defaultValue: this.argumentConfig.arguments.delayShort
      } as Argument, ,

      {
        type: ArgumentType.number,
        id: "delayLong",
        name: "delayLong",
        description: "how much delay to start and end images",
        defaultValue: this.argumentConfig.arguments.delayLong
      } as Argument,
    ]
    .concat(commonArguments)
    .concat(argumentConfig.extraArguments||[])
    .filter(a=>a)
  }

  async template(config: DeformationConfig) {
    const inputFiles = await forceSameSize(config)
    const values = seq(1, 1, config.arguments.frames).map(i => this.argumentConfig.framesValues(i, config))
    const fileNames1 = []
    const fileNames2 = []
    const commands = `
      ${values.map((value, i) => {
        const name1 = `img1_${i}.miff`
        fileNames1.push(name1)
        const name2 = `img2_${i}.miff`
        fileNames2.push(name2)
        return `
        convert ${inputFiles[0].name} ${this.argumentConfig.transformCommand(config, value)} ${name1}
        convert ${inputFiles[1].name} ${this.argumentConfig.transformCommand(config, value)} ${name2}
        `
      }).join("\n")}
      convert -morph 1 -delay ${config.arguments.delayLong} ${inputFiles[0].name} -delay ${config.arguments.delayShort} ${[].concat(fileNames1).concat(fileNames2.reverse()).join(" ")} -delay ${config.arguments.delayLong * 2} ${inputFiles[1].name} ${config.arguments.backAndForwards ? `-delay ${config.arguments.delayShort} ${fileNames2.reverse().join(" ")} ${fileNames1.reverse().join(" ")} ${inputFiles[0].name}` : ""} -loop ${config.arguments.loop} -layers Optimize out${getUniqueId()}.gif`

    console.log(commands)

    const result = await execute({ inputFiles, commands })
    return [result.outputFiles[result.outputFiles.length - 1]]
  }
}

export const swirlDeformation = 
new DeformationMorph("swirlDeformation", "Deformation Swirl", { transformCommand: (config, value) => `-swirl ${value}`, arguments: { frames: 10, transformationFactor: 100 } })

export const spreadDeformation = 
new DeformationMorph("spreadDeformation", "Deformation spread", { transformCommand: (config, value) => `-spread ${value}`, arguments: { frames: 6, transformationFactor: 10 } })

export const implodeDeformation = 
new DeformationMorph("implodeDeformation", "Deformation implode", {
  transformCommand: (config, value) => `-implode ${value}`,
  framesValues: (i, config) => i * config.arguments.transformationFactor,
  arguments: { frames: 12, transformationFactor: 0.1, delayLong: 70, delayShort: 10, virtualPixel: IMVirtualPixel.Random },
  extraArguments: [
    {
      type: ArgumentType.selectOne,
      id: "virtualPixel",
      name: "Virtual Pixel",
      list: list(IMVirtualPixel).map(i => ({ id: i, name: i })),
      description: "",
      defaultValue: "Random"
    } as Argument,]
})

export const tornPaperDeformation = 
new DeformationMorph("tornPaperDeformation", "Deformation torn paper", {
  transformCommand: (config, value) => ` \( +clone -alpha extract -virtual-pixel black -spread ${value} -blur 0x3 -threshold 60% -spread ${value} -blur 0x1 \) -alpha off -compose Copy_Opacity -composite`,
  arguments: { frames: 5, transformationFactor: 20, delayLong: 40, delayShort: 20 }
})

export const noiseDeformation = 
new DeformationMorph("noiseDeformation", "Deformation noise", {
  transformCommand: (config, value) => `-noise ${value} +noise ${config.arguments.noiseType || "Poisson"}`,
  arguments: { frames: 6, transformationFactor: 14, delayLong: 50, delayShort: 10 },
  extraArguments: [
    {
      type: ArgumentType.selectOne,
      id: "noiseType",
      name: "Noise type",
      list: list(IMNoise).map(i => ({ id: i, name: i })),
      description: "noise type",
      defaultValue: IMNoise.Laplacian,
    } as Argument,]
})