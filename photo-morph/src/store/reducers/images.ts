import { Action, compose, Reducer } from "redux"
import { ActionTypes, AddImagesAction, ChangeStatusAction, SelectImagesAction } from "../actions"
import { ImageState, RootState, Status } from "../store"

const initialState: ImageState[] =[]

const addImagesReducer: Reducer<ImageState[]>= (state = initialState, action)=>{
  if(action.type===ActionTypes.addImages){
    return[...state, ...(action as AddImagesAction).files]
  }
  return state
}
const selectImagesReducer: Reducer<ImageState[]>= (state = initialState, action)=>{
  if(action.type===ActionTypes.selectImages){
    return Object.keys((action as SelectImagesAction).indexes).map(i=>({
      ...state[i], 
      isSelected: (action as SelectImagesAction).indexes[i]
    }))
  }
  return state
}


import reduceReducers from "reduce-reducers"
export const imageReducers =reduceReducers( selectImagesReducer, addImagesReducer)

export const changeStatusReducer: Reducer<Status>= (state = "idle", action)=>{
  if(action.type===ActionTypes.changeStatus){
    return (action as ChangeStatusAction).status
  }
  return state
}
