import { Command } from '../../../imagemagick';

export interface Frame {
  name: string
  description?: string
  id: string
  /**
   * commands implementing this image frame. need to consume input image using "$INPUT" file name and declare
   * the output image as "$OUTPUT". See example provided.
   */
  commands: Command[]
}
export const imageFrames: Frame[] = [
  {
    // name: 'test1',
    id: 'frameVignette1',
    name: 'frame Vignette',
    // command: ["convert", "$INPUT", "-alpha", "set", "-background", "none", "-vignette", "0x4", "$OUTPUT"],
    description: 'The Vignette Operator provides a simple means to add a blurry edge around an image.',
    commands: [["convert", "$INPUT", "-alpha", "set", "-background", "none", "-vignette", "0x4", "$OUTPUT"]],
  },

  {
    id: 'frameFeathering1',
    name: 'frame feathering 1',
    commands: [["convert", "$INPUT", "-alpha", "set", "-virtual-pixel", "transparent", "-channel", "A", "-morphology", "Distance", "Euclidean:1,10!", "+channel", "$OUTPUT"]],
    description: 'The Morphology Distance method provides a true transparent \'Feathering\' of an image\'s edges.'
  },
]