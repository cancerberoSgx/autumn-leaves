import { ArgumentType, Color, Command, CommandTemplate, Distort, PointHandler, SizedImageContext, VirtualPixel, VirtualPixelMethods, CommandTemplateTag } from "../..";

type ThisDistorts = Distort.Perspective | Distort.BilinearForward | Distort.BilinearReverse | Distort.Shepards
const thisDistorts = [Distort.Perspective, Distort.BilinearForward, Distort.BilinearReverse, Distort.Shepards]

class PointHandlerImpl implements PointHandler {
  constructor(public x: number, public y: number, public id: string, public color: Color) { }
  toString() { return this.x + ',' + this.y }
}

const defaultPoints = [
  new PointHandlerImpl(0, 0, 'a1', 'red'),
  new PointHandlerImpl(0, 0, 'b1', 'red'),

  new PointHandlerImpl(0, 45, 'a2', 'blue'),
  new PointHandlerImpl(0, 45, 'b2', 'blue'),

  new PointHandlerImpl(69, 0, 'a3', 'green'),
  new PointHandlerImpl(60, 10, 'b3', 'green'),

  new PointHandlerImpl(69, 45, 'a4', 'orange'),
  new PointHandlerImpl(60, 35, 'b4', 'orange')
]

export interface DistortPerspective1Context extends Partial<SizedImageContext> {
  points: PointHandler[]
  virtualPixel: VirtualPixel
  distort: ThisDistorts
}

export const DistortPerspective1: CommandTemplate<DistortPerspective1Context> = {
  id: 'DistortPerspective1',
  name: 'Distort Perspective 1',
  // commands: [["convert", "$INPUT", "-virtual-pixel", "dither", "-distort", "Perspective", "9,76,7,82 14,-18,21,-47 76,2,76,-25 77,42,81,9", "$OUTPUT"]],
  description: "TODO",
  template: function (context: DistortPerspective1Context) {
    const s = `[["convert", "$INPUT","-virtual-pixel","${context.virtualPixel}","-distort","${context.distort}","${context.points[0]},${context.points[1]} ${context.points[2]},${context.points[3]} ${context.points[4]},${context.points[5]} ${context.points[6]},${context.points[7]}", "$OUTPUT"]]`
    const result = JSON.parse(s) as Command[]
    return result
  },
  tags: [CommandTemplateTag.distort],
  defaultTemplateContext: {
    points: defaultPoints,
    virtualPixel: VirtualPixel.Tile,
    distort: Distort.Perspective
  },
  arguments: [
    {
      type: ArgumentType.selectOne,
      id: 'virtualPixel',
      name: 'Virtual Pixel',
      description: 'TODO',
      list: VirtualPixelMethods.map(m => ({ name: m, id: m }))
    },
    {
      type: ArgumentType.selectOne,
      id: 'distort',
      name: 'Distort type',
      description: 'TODO',
      list: thisDistorts.map(m => ({ name: m, id: m }))
    },
    {
      type: ArgumentType.imagePoints,
      id: 'points',
      name: 'points',
      description: 'TODO',
      points: defaultPoints
    },
  ]
}
