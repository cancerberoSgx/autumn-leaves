import { ImageRef } from '../state/State';

export class ImageManager {

  images: { [name: string]: ImageWithBlob } = {}

  add(image: ImageRef, blob: Blob) {
    this.images[image.name] = { ...image, blob }
  }

  get(name: string): ImageWithBlob {
    return this.images[name]
  }
}

export interface ImageWithBlob extends ImageRef {
  blob: Blob
}