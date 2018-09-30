import { ArgumentType, Command, CommandTemplate, SizedImageContext, VirtualPixelMethod, VirtualPixelMethods, Filter, filters } from "imagemagick-browser";

export interface VirtualRandom1Context extends Partial<SizedImageContext> {
  width: number
  height: number
  virtualPixel: VirtualPixelMethod
  // filter: Filter
}

export const virtualRandom1: CommandTemplate<VirtualRandom1Context> = {
  id: 'virtualRandom1',
  name: 'Virtual Random 1',
  commands: [["convert", "$INPUT", "-set", "option:distort:viewport", "70x70-19-19", "-virtual-pixel", "Random", "-filter", "point", "-distort", "SRT", "0", "+repage", "$OUTPUT"]],
  description: "TODO",
  template: function (context: VirtualRandom1Context) {
    const s = `[["convert", "$INPUT", "-set", "option:distort:viewport", "${context.imageWidth + context.width * 2}x${context.imageHeight + context.height * 2}-${context.width}-${context.height}", "-virtual-pixel", "${context.virtualPixel}", "-filter", "point", "-distort", "SRT", "0", "+repage", "$OUTPUT"]]`

    const result = JSON.parse(s) as Command[]
    return result
  },
  defaultTemplateContext: {
    width: 50,
    height: 20,
    virtualPixel: VirtualPixelMethod.dither,
    // filter: Filter.Point
  },
  arguments: [
    { type: ArgumentType.number, id: 'width', name: 'width', description: 'TODO' },
    { type: ArgumentType.number, id: 'height', name: 'height', description: 'TODO' },
    {
      type: ArgumentType.selectOne,
      id: 'virtualPixel',
      name: 'Virtual Pixel',
      description: 'TODO',
      list: VirtualPixelMethods.map(m => ({ name: m, id: m }))
    },
    // {
    //   type: ArgumentType.selectOne,
    //   id: 'filter',
    //   name: 'Filter',
    //   description: 'TODO',
    //   list: filters.map(filter => ({ name: filter, id: filter }))
    // },
  ]
}


// {
//   id: 'virtualRandom1',
//   name: 'virtual random 1',
//   commands: [['convert', '$INPUT', '-set', 'option:distort:viewport', '70x70-19-19', '-virtual-pixel', 'Random', '-filter', 'point', '-distort', 'SRT', '0', '+repage', '$OUTPUT']],
//   description: 'pick random pixels of the image to build the frame'
// },
