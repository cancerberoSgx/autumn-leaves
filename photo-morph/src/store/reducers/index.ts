import { combineReducers } from "redux"
import {  imageReducers } from './images';
import { morphReducers } from './morphs';
import { RootState } from '../store';
import { outputImageReducers } from './outputImage';

export const reducers = 
// function(){
//   const f = 
  combineReducers<RootState>({
  images: imageReducers,
  morphs: morphReducers, 
  outputImage: outputImageReducers
}); 
// debugger; 
// return f.apply(null, arguments)
// }
