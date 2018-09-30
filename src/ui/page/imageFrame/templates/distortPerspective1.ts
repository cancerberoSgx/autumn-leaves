import { CommandTemplate, Color, SizedImageContext, ArgumentType, PointHandler } from "imagemagick-browser";
import { Command } from "imagemagick-browser";

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
}

export const DistortPerspective1: CommandTemplate<DistortPerspective1Context> = {
  id: 'DistortPerspective1',
  name: 'Distort Perspective 1',
  commands: [["convert", "$INPUT", "-virtual-pixel", "black", "-distort", "Perspective", "9,76,7,82 14,-18,21,-47 76,2,76,-25 77,42,81,9", "$OUTPUT"]],
  description: "TODO",
  template: function (context: DistortPerspective1Context) {
    const s = `[["convert", "$INPUT","-virtual-pixel","black","-distort","Perspective","${context.points[0]},${context.points[1]} ${context.points[2]},${context.points[3]} ${context.points[4]},${context.points[5]} ${context.points[6]},${context.points[7]}", "$OUTPUT"]]`
    const result = JSON.parse(s) as Command[]
    console.log('sssss', s);

    return result
  },
  defaultTemplateContext: {
    points: defaultPoints
  },
  arguments: [
    {
      type: ArgumentType.imagePoints,
      id: 'points',
      name: 'points',
      description: 'TODO',
      points: defaultPoints
    }
  ]
}




      // {
      //   id: 'source1',
      //   x: 0,
      //   y: 0,
      //   toString: pointToString
      // },
      // {
      //   id: 'target1',
      //   x: 0,
      //   y: 0
      // },
      // {
      //   id: 'source2',
      //   
      // {
      //   id: 'source1',
      //   x: 0,
      //   y: 0,
      //   toString: pointToString
      // },
      // {
      //   id: 'target1',
      //   x: 0,
      //   y: 0
      // },
      // {
      //   id: 'source2',
      //   x: 0,
      //   y: 45
      // },
      // {
      //   id: 'target2',
      //   x: 0,
      //   y: 45
      // },
      // {
      //   id: 'source3',
      //   x: 69,
      //   y: 0
      // },
      // {
      //   id: 'target3',
      //   x: 60,
      //   y: 10
      // },
      // {
      //   id: 'source4',
      //   x: 69,
      //   y: 45
      // },
      // {
      //   id: 'target4',
      //   x: 60,
      //   y: 35
      // }
      // ]
      //   
      // {
      //   id: 'source1',
      //   x: 0,
      //   y: 0,
      //   toString: pointToString
      // },
      // {
      //   id: 'target1',
      //   x: 0,
      //   y: 0
      // },
      // {
      //   id: 'source2',
      //   x: 0,
      //   y: 45
      // },
      // {
      //   id: 'target2',
      //   x: 0,
      //   y: 45
      // },
      // {
      //   id: 'source3',
      //   x: 69,
      //   y: 0
      // },
      // {
      //   id: 'target3',
      //   x: 60,
      //   y: 10
      // },
      // {
      //   id: 'source4',
      //   x: 69,
      //   y: 45
      // },
      // {
      //   id: 'target4',
      //   x: 60,
      //   y: 35
      // }
      // ]
      // },
      // {
      //   id: 'source1',
      //   x: 0,
      //   y: 0,
      //   toString: pointToString
      // },
      // {
      //   id: 'target1',
      //   x: 0,
      //   y: 0
      // },
      // {
      //   id: 'source2',
      //   x: 0,
      //   y: 45
      // },
      // {
      //   id: 'target2',
      //   x: 0,
      //   y: 45
      // },
      // {
      //   id: 'source3',
      //   x: 69,
      //   y: 0
      // },
      // {
      //   id: 'target3',
      //   x: 60,
      //   y: 10
      // },
      // {
      //   id: 'source4',
      //   x: 69,
      //   y: 45
      // },
      // {
      //   id: 'target4',
      //   x: 60,
      //   y: 35
      // }
      // ]
      // {
      //   
      // {
      //   id: 'source1',
      //   x: 0,
      //   y: 0,
      //   toString: pointToString
      // },
      // {
      //   id: 'target1',
      //   x: 0,
      //   y: 0
      // },
      // {
      //   id: 'source2',
      //   x: 0,
      //   y: 45
      // },
      // {
      //   id: 'target2',
      //   x: 0,
      //   y: 45
      // },
      // {
      //   id: 'source3',
      //   x: 69,
      //   y: 0
      // },
      // {
      //   id: 'target3',
      //   x: 60,
      //   y: 10
      // },
      // {
      //   id: 'source4',
      //   x: 69,
      //   y: 45
      // },
      // {
      //   id: 'target4',
      //   x: 60,
      //   y: 35
      // }
      // ]
      //   
      // {
      //   id: 'source1',
      //   x: 0,
      //   y: 0,
      //   toString: pointToString
      // },
      // {
      //   id: 'target1',
      //   x: 0,
      //   y: 0
      // },
      // {
      //   id: 'source2',
      //   x: 0,
      //   y: 45
      // },
      // {
      //   id: 'target2',
      //   x: 0,
      //   y: 45
      // },
      // {
      //   id: 'source3',
      //   x: 69,
      //   y: 0
      // },
      // {
      //   id: 'target3',
      //   x: 60,
      //   y: 10
      // },
      // {
      //   id: 'source4',
      //   x: 69,
      //   y: 45
      // },
      // {
      //   id: 'target4',
      //   x: 60,
      //   y: 35
      // }
      // ]
      //   
      // {
      //   id: 'source1',
      //   x: 0,
      //   y: 0,
      //   toString: pointToString
      // },
      // {
      //   id: 'target1',
      //   x: 0,
      //   y: 0
      // },
      // {
      //   id: 'source2',
      //   x: 0,
      //   y: 45
      // },
      // {
      //   id: 'target2',
      //   x: 0,
      //   y: 45
      // },
      // {
      //   id: 'source3',
      //   x: 69,
      //   y: 0
      // },
      // {
      //   id: 'target3',
      //   x: 60,
      //   y: 10
      // },
      // {
      //   id: 'source4',
      //   x: 69,
      //   y: 45
      // },
      // {
      //   id: 'target4',
      //   x: 60,
      //   y: 35
      // }
      // ]
      // },
      // {
      //   id: 'source1',
      //   x: 0,
      //   y: 0,
      //   toString: pointToString
      // },
      // {
      //   id: 'target1',
      //   x: 0,
      //   y: 0
      // },
      // {
      //   id: 'source2',
      //   x: 0,
      //   y: 45
      // },
      // {
      //   id: 'target2',
      //   x: 0,
      //   y: 45
      // },
      // {
      //   id: 'source3',
      //   x: 69,
      //   y: 0
      // },
      // {
      //   id: 'target3',
      //   x: 60,
      //   y: 10
      // },
      // {
      //   id: 'source4',
      //   x: 69,
      //   y: 45
      // },
      // {
      //   id: 'target4',
      //   x: 60,
      //   y: 35
      // }
      // ]
      // {
      //   id: 'source3',
      //   x: 69,
      //   y: 0
      // },
      // {
      //   id: 'target3',
      //   x: 60,
      //   y: 10
      // },
      // {
      //   id: 'source4',
      //   x: 69,
      //   y: 45
      // },
      // {
      //   id: 'target4',
      //   x: 60,
      //   y: 35
      // }
      // ]