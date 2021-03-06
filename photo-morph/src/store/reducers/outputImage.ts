import { Reducer } from "redux";
import { ActionTypes, SetOutputImageAction } from "../actions";
import { ImageState } from "../store";

const initialState: ImageState|false =false

const setOutputImage: Reducer<ImageState|false>= (state = initialState, action)=>{
  if(action.type===ActionTypes.setOutputImage){
    return {...state, ...(action as SetOutputImageAction).image}
  }
  return  false
}

export const outputImageReducers: Reducer<ImageState|false>= (state = initialState, action)=>{
  return setOutputImage(state, action)/*  || selectImagesReducer(state, action)  */|| false
}