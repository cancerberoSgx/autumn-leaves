import { Action } from "redux"
import { ActionTypes } from "."

export function selectMorph(id: string): SelectMorphAction {
  return {
    type: ActionTypes.selectMorph,
    id
  }
}
export interface SelectMorphAction extends Action {
  type: ActionTypes.selectMorph,
  id: string
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


export function selectTemplateType(id: string): SelectTemplateTypeAction {
  return {
    type: ActionTypes.selectTemplateType,
    id
  }
}

export interface SelectTemplateTypeAction extends Action {
  type: ActionTypes.selectTemplateType,
  id: string
}
