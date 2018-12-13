import reduceReducers from "reduce-reducers"
import { Reducer } from "redux"
import { magickTemplateTypes } from "src/model/MagickTemplateTypes"
import { ActionTypes, SelectTemplateTypeAction } from "../actions"
import { TemplateTypeState } from "../store"

const initialState= magickTemplateTypes.map((m, i) => ({
  isSelected: i===0,
  definition: m
} ))

const selectTemplateTypeReducer: Reducer<TemplateTypeState[]> = (state = initialState, action) => {
  if (action.type === ActionTypes.selectTemplateType) {
    return state.map((m, i) => ({ ...m, isSelected: (action as SelectTemplateTypeAction).index === i }))
  }
  return state
}


export const templateTypesReducers = reduceReducers(selectTemplateTypeReducer)