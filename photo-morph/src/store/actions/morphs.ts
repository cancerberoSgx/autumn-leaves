import { Action } from "redux"
import { ActionTypes } from "."
import { ImageState, MorphState } from "../store"

export function selectMorph(index: number): SelectMorphAction {
  return {
    type: ActionTypes.selectMorph,
    index
  }
}
export interface SelectMorphAction extends Action {
  type: ActionTypes.selectMorph,
  index: number
}

export function setOutputImage(image: ImageState): SetOutputImageAction {
  return {
    type: ActionTypes.setOutputImage,
    image
  }
}
export interface SetOutputImageAction extends Action {
  type: ActionTypes.setOutputImage,
  image: ImageState
}
