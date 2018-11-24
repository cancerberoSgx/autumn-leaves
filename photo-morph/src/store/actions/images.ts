import { Action } from "redux"
import { ActionTypes } from "."
import { ImageState } from "../store"

export function addImages(files: ImageState[]): AddImagesAction {
  return {
    type: ActionTypes.addImages,
    files
  }
}
export function selectImages(indexes: {[index: number]: boolean}): SelectImagesAction {
  return {
    type: ActionTypes.selectImages,
    indexes
  }
}


export interface AddImagesAction extends Action {
  type: ActionTypes.addImages,
  files: ImageState[]
}

export interface SelectImagesAction extends Action {
  type: ActionTypes.selectImages,
  indexes: {[index: number]: boolean}
}
