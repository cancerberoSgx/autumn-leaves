import reduceReducers from "reduce-reducers";
import { Reducer } from "redux";
import { ActionTypes } from "../actions";
import { SetUIStateAction } from '../actions/ui';
import { UIState } from "../store";

const initialState: UIState = {
  layoutLocked: false,
  helpModalOpen: false
}

const setLayoutLockReducer: Reducer<UIState>= (state = initialState, action)=>{
  if(action.type===ActionTypes.setUIState){
    return{...state, ...(action as SetUIStateAction).state}
  }
  return state
}

export const uiReducers =reduceReducers( setLayoutLockReducer)
