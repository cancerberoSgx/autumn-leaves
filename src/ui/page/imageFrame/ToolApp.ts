import { MagickInputFile } from '../../../imagemagick';

export interface ToolApp {
  images: MagickInputFile[]
  addImage(image: MagickInputFile): void
  selectedImages: MagickInputFile[]
}
/**
 * takes care of manage a set of loaded image files and know current user selection of input images (selectedImages)
 */
class ToolAppImpl implements ToolApp {

  protected _images: MagickInputFile[] = []
  protected _selectedImages: MagickInputFile[] = []

  public get images(): MagickInputFile[] {
    return this._images
  }

  public set images(images: MagickInputFile[]) {
    this._images = images
  }

  public get selectedImages(): MagickInputFile[] {
    return this._selectedImages
  }

  public set selectedImages(images: MagickInputFile[]) {
    this._selectedImages = images
  }

  addImage(image: MagickInputFile) {
    this._images.push(image) // TODO: exists ?
  }
}

export function create(): ToolApp {
  return new ToolAppImpl()
}

export const app: ToolApp = new ToolAppImpl()