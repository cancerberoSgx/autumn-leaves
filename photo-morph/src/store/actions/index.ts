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

  setUIState
}

export * from "./images"
export * from "./morphs"


export function urlChanged(): Action<ActionTypes.urlChanged> {
  return { type: ActionTypes.urlChanged }
}
export function updateUrl(): Action<ActionTypes.updateUrl> {
  return { type: ActionTypes.updateUrl }
}
