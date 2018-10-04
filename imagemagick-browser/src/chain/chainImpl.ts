import { Fragment, Chain, FragmentType } from './chain';
import { MagickInputFile, Command, ExecuteResult, ExecuteConfig } from '..';
import { RotateFragment, RotateFragmentImpl } from './rotateFragment';
import { execute } from '../execute';
import { ImagesFragmentImpl } from './imageFragment';

class ChainImpl implements Chain {
  fragments: Fragment[] = []
  inputImages: MagickInputFile[] = []
  constructor(public firstCommand: string = 'convert') {
  }
  rotate(degrees: number): Chain {
    this.fragments.push(new RotateFragmentImpl(degrees))
    return this
  }
  toCommand(): Command {
    return Array.prototype.concat.apply([this.firstCommand], this.fragments.map(f => f.toCommand()))
  }
  image(image: MagickInputFile | string): Chain {
    return this.images([typeof image === 'string' ? { name: image } : image])
  }
  images(images: MagickInputFile[]): Chain {
    this.fragments.push(new ImagesFragmentImpl(images))
    return this
  }
  async execute(): Promise<ExecuteResult> {
    const inputImages: MagickInputFile[] = []
    const config: ExecuteConfig = {
      inputFiles: this.inputImages,
      commands: [this.toCommand()]
    }
    const result = await execute(config)
    return result[0]
  }
}

export function convert(inputImages?: MagickInputFile[] | MagickInputFile): Chain {
  const chain = new ChainImpl('convert')
  if (inputImages) {
    return chain.images(Array.isArray(inputImages) ? inputImages : [inputImages])
  }
}
