import { combineReducers } from "redux"
import { RootState } from "../store"
import { imageReducers } from "./images"
import { morphReducers } from "./morphs"
import { outputImageReducers } from "./outputImage"

export const reducers = combineReducers<RootState>({
  images: imageReducers,
  morphs: morphReducers,
  outputImage: outputImageReducers
}) 
