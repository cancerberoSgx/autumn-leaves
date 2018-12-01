import { Action } from "redux"
import { ActionTypes } from "."
import { UIState } from '../store';

export function setUIState(state: Partial<UIState>): SetUIStateAction {
  return {
    type: ActionTypes.setUIState,
    state
  }
}

export interface SetUIStateAction extends Action<ActionTypes.setUIState> {
  state: Partial<UIState>
}