import { Reducer } from "redux"
import { morphs } from "src/model/morph/morphs"
import { ActionTypes, ChangeMorphArgumentAction, ResetMorphValueAction, SelectMorphAction } from "../actions"
import { getDefaultArguments } from "../dispatchers/morphDispatcher"
import { MorphState } from "../store"

const initialState: MorphState[] = morphs.map((m, i) => ({
  name: m.name,
  isSelected: false,
  description: m.description,
  definition: m,
  value: getDefaultArguments(m)
}))

const selectMorphsReducer: Reducer<MorphState[]> = (state = initialState, action) => {
  if (action.type === ActionTypes.selectMorph) {
    return state.map((m, i) => ({ ...m, isSelected: (action as SelectMorphAction).index === i }))
  }
  return state
}

const changeMorphArgumentReducer: Reducer<MorphState[]> = (state = initialState, action) => {
  if (action.type === ActionTypes.changeMorphArgument) {
    const mAction = (action as ChangeMorphArgumentAction)
    const morph = state.find(m => m.definition.id === mAction.morphId)
    morph.value[mAction.argumentId] = mAction.argumentValue
    return [...state]
  }
  return state
}

const resetMorphValuesReducer: Reducer<MorphState[]> = (state = initialState, action): MorphState[] => {
  if (action.type === ActionTypes.resetMorphValues) {
    const a = (action as ResetMorphValueAction)
    const result = state.map((m, i) => ({ ...m, value: m.definition.id===a.morphId ? getDefaultArguments(m.definition) : m.value}))
    return result
  }
  return state
}


import reduceReducers from "reduce-reducers"
export const morphReducers = reduceReducers(selectMorphsReducer, changeMorphArgumentReducer, resetMorphValuesReducer)