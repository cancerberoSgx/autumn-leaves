import { Reducer } from "redux"
import { morphs } from "src/model/morphs"
import { ActionTypes, ChangeMorphArgumentAction, SelectMorphAction } from "../actions"
import { getDefaultArguments } from "../dispatchers/morphDispatcher"
import { MorphState } from "../store"

const initialState: MorphState[] = morphs.map((m, i) => ({ name: m.name, isSelected: false, description: m.description, definition: m, value: getDefaultArguments(m)}))

const selectMorphsReducer: Reducer<MorphState[]> = (state = initialState, action) => {
  if (action.type === ActionTypes.selectMorph) {
    return state.map((m, i) => ({ ...m, isSelected: (action as SelectMorphAction).index === i }))
  }
  return null
}

const changeMorphArgumentReducer: Reducer<MorphState[]> = (state = initialState, action) => {
  if (action.type === ActionTypes.changeMorphArgument) {
    const maction = (action as ChangeMorphArgumentAction)
    const morph = state.find(m=>m.definition.id===maction.morphId)
    morph.value[maction.argumentId] = maction.argumentValue
    return [...state]
  }
  return null
}
export const morphReducers: Reducer<MorphState[]> = (state = initialState, action) => {
  return selectMorphsReducer(state, action)  || changeMorphArgumentReducer(state, action) || [...state]
}