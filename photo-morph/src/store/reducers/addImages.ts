import { Reducer } from "redux"
import { morphs } from "src/model/morphs"
import { MagickInputFile } from "wasm-imagemagick"
import { ActionTypes, AddImagesAction } from "../actions"
import { ImagesState, RootState } from "../store"

const initialState: ImagesState = {
  images: []
}
export const addImagesReducer: Reducer<ImagesState>= (state = initialState, action)=>{
  if(action.type===ActionTypes.addImages){
    // debugger
    return {...state, images: [...state.images, ...(action as AddImagesAction).files.map(f=>({name: f}))]}
  }
  else {
    return state
  }
}