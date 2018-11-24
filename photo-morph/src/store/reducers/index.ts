import { combineReducers } from "redux"
import { addImagesReducer } from './addImages';

export const reducers = combineReducers({
  images: addImagesReducer
})
