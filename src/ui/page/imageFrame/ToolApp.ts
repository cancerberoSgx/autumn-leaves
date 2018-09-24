// import { MagickInputFile } from '../../../imagemagick';

// export interface ToolApp {
//   images: MagickInputFile[]
//   addImage(image: MagickInputFile): void
// }

// class ToolAppImpl implements ToolApp {

//   protected _images: MagickInputFile[] = []

//   public get images(): MagickInputFile[] {
//     return this._images
//   }

//   public set images(images: MagickInputFile[]) {
//     this._images = images
//   }

//   addImage(image: MagickInputFile) {
//     this._images.push(image) // TODO: exists ?
//   }
// }

// export const app: ToolApp = new ToolAppImpl()