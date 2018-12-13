import { Action } from "redux"

export enum ActionTypes {
  addImages,
  selectImages,
  setOutputImage,
  selectMorph,
  executeMorph,
  changeMorphArgument,
  changeStatus,
  updateUrl,
  urlChanged,
  resetMorphValues,
  setUIState,
  addUrlImage,
  selectTemplateType
}

export * from "./images"
export * from "./templates"


export function urlChanged(): Action<ActionTypes.urlChanged> {
  return { type: ActionTypes.urlChanged }
}
export function updateUrl(): Action<ActionTypes.updateUrl> {
  return { type: ActionTypes.updateUrl }
}

export interface AddUrlImageAction extends Action<ActionTypes.addUrlImage> {
  url: string
}
export function addUrlImage(url: string): AddUrlImageAction {
  return { type: ActionTypes.addUrlImage, url }
}
