import { Reducer } from "redux"
// import { morphs } from "src/model/morph/morphs"
import { ActionTypes, ChangeMorphArgumentAction, ResetMorphValueAction, SelectMorphAction } from "../actions"
import { getDefaultArguments } from "../dispatchers/morphDispatcher"
import { TemplateState } from "../store"

import reduceReducers from "reduce-reducers"
import { magickTemplates } from "src/model/magickTemplates"
import { magickTemplateTypes } from 'src/model/MagickTemplateTypes';

function getInitialState(): TemplateState[] {
  return magickTemplates.map((m, i) => ({
    name: m.name,
    isSelected: false,
    description: m.description,
    definition: m,
    value: getDefaultArguments(m)
  }))
}

const selectMorphsReducer: Reducer<TemplateState[]> = (state = getInitialState(), action) => {
  if (action.type === ActionTypes.selectMorph) {
    return state.map((m, i) => ({ ...m, isSelected: (action as SelectMorphAction).index === i }))
  }
  return state
}

const changeMorphArgumentReducer: Reducer<TemplateState[]> = (state = getInitialState(), action) => {
  if (action.type === ActionTypes.changeMorphArgument) {
    const mAction = (action as ChangeMorphArgumentAction)
    const morph = state.find(m => m.definition.id === mAction.morphId)
    morph.value[mAction.argumentId] = mAction.argumentValue
    return [...state]
  }
  return state
}

const resetMorphValuesReducer: Reducer<TemplateState[]> = (state = getInitialState(), action): TemplateState[] => {
  if (action.type === ActionTypes.resetMorphValues) {
    const a = (action as ResetMorphValueAction)
    const result = state.map((m, i) => ({ ...m, value: m.definition.id === a.morphId ? getDefaultArguments(m.definition) : m.value }))
    return result
  }
  return state
}


export const morphReducers = reduceReducers(selectMorphsReducer, changeMorphArgumentReducer, resetMorphValuesReducer)