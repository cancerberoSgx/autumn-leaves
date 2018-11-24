import { MagickInputFile } from "wasm-imagemagick"
import { Action } from 'redux';

export enum ActionTypes {
  addImages
}

export function addImages(files: string[]): AddImagesAction {
  return {
    type: ActionTypes.addImages,
    files
  }
}

export interface AddImagesAction extends Action {
  type: ActionTypes.addImages,
  files: string[]
}

