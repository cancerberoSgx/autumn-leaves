import { Action } from "redux"
import { ActionTypes } from "."
import { ImageState, Status } from "../store"

export function addImages(files: ImageState[]): AddImagesAction {
  return {
    type: ActionTypes.addImages,
    files
  }
}

export interface AddImagesAction extends Action {
  type: ActionTypes.addImages,
  files: ImageState[]
}

export function selectImages(indexes: {[index: number]: boolean}): SelectImagesAction {
  return {
    type: ActionTypes.selectImages,
    indexes
  }
}

export interface SelectImagesAction extends Action {
  type: ActionTypes.selectImages,
  indexes: {[index: number]: boolean}
}


export function changeStatus(status: Status): ChangeStatusAction {
  return {
    type: ActionTypes.changeStatus,
    status
  }
}

export interface ChangeStatusAction extends Action {
  type: ActionTypes.changeStatus,
  status: Status
}
