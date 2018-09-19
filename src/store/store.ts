import { createStore, Store, combineReducers, AnyAction, Action } from 'redux'
import { addNewUnit } from './addNewUnit'
// import { clickAddNewUnitButton } from './clickAddNewUnitButton'
// import { gameLoop } from './gameLoop'
// import { selectUnit } from './selectUnit'
// import { changeGameSettings } from './changeGameSettings'
// import { IState } from '../state/state-interfaces'
// import { State } from '../state/state'

export const ACTION_VOID = 'void-action'
export interface IVoidAction {
  type: string
}
// function voidReducer(state: IState, action: IVoidAction): IState {
//   return State.get()
// }


let storeInternal: Store
export function store() {
  if (!storeInternal) {
    const allReducers = combineReducers({
      addNewUnit
    })
    storeInternal = createStore(allReducers)
  }
  return storeInternal
}
