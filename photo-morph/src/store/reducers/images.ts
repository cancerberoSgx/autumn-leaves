import { Reducer } from "redux"
import { ActionTypes, AddImagesAction, SelectImagesAction } from "../actions"
import { ImageState, RootState } from "../store"

const initialState: ImageState[] =[]
const addImagesReducer: Reducer<ImageState[]>= (state = initialState, action)=>{
  if(action.type===ActionTypes.addImages){
    return[...state, ...(action as AddImagesAction).files]
  }
  return null
}
const selectImagesReducer: Reducer<ImageState[]>= (state = initialState, action)=>{
  if(action.type===ActionTypes.selectImages){
    return Object.keys((action as SelectImagesAction).indexes).map(i=>({...state[i], isSelected: (action as SelectImagesAction).indexes[i]}))
  }
  return null
}

export const imageReducers: Reducer<ImageState[]>= (state = initialState, action)=>{
  return addImagesReducer(state, action) || selectImagesReducer(state, action) || [...state]
}