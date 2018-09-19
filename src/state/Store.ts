import { createStore, Store, combineReducers, AnyAction, Action } from 'redux'
import { selectInputImage } from './selectInputImage'

let storeInternal: Store
export function store() {
  if (!storeInternal) {
    const allReducers = combineReducers({
      selectInputImage
    })
    storeInternal = createStore(allReducers)
  }
  return storeInternal
}
