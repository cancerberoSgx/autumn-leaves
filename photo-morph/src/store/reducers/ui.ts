import reduceReducers from "reduce-reducers"
import { Reducer } from "redux"
import { layouts } from "src/components/layout/layouts"
import { getFromLS } from "src/util/misc"
import { ActionTypes } from "../actions"
import { SetUIStateAction } from "../actions/ui"
import { UIState } from "../store"

const initialState: UIState = {
  helpModalOpen: false,
  layoutLocked: true,
  tooltipModalOpen: false,
  tooltipText: '',
  layouts: getFromLS("layouts") || layouts

}

const setLayoutLockReducer: Reducer<UIState> = (state = initialState, action) => {
  if (action.type === ActionTypes.setUIState) {
    return { ...state, ...(action as SetUIStateAction).state }
  }
  return state
}

export const uiReducers = reduceReducers(setLayoutLockReducer)
