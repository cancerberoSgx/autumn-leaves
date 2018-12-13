import { Action } from "redux"
import { ActionTypes } from "."

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

export function changeMorphArgument(morphId: string, argumentId: string, argumentValue: any): ChangeMorphArgumentAction {
  return {
    type: ActionTypes.changeMorphArgument,
    morphId, 
    argumentId, 
    argumentValue
  }
}
export interface ChangeMorphArgumentAction extends Action {
  type: ActionTypes.changeMorphArgument,
  morphId: string, 
  argumentId: string, 
  argumentValue: any
}

export function resetMorphValues(morphId: string): ResetMorphValueAction {
  return {
    type: ActionTypes.resetMorphValues,
    morphId
  }
}
export interface ResetMorphValueAction extends Action {
  type: ActionTypes.resetMorphValues,
  morphId: string, 
}
