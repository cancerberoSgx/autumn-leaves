import { Reducer } from "redux"
import { morphs } from "src/model/morphs"
import { ActionTypes, AddImagesAction, SelectImagesAction, SelectMorphAction } from "../actions"
import { ImageState, MorphState, RootState } from "../store"

const initialState: MorphState[] =morphs.map((m, i)=>({name: m.name, isSelected: i===0, description: m.description}))

const selectMorphsReducer: Reducer<MorphState[]>= (state = initialState, action)=>{
  if(action.type===ActionTypes.selectMorph){
    return state.map((m, i)=>({...m, isSelected: (action as SelectMorphAction).index===i}))
  }
  return null
}

export const morphReducers: Reducer<MorphState[]>= (state = initialState, action)=>{
  return selectMorphsReducer(state, action)/*  || selectImagesReducer(state, action)  */|| [...state]
}