import { Action, combineReducers, compose, Reducer } from "redux"
import { CommonArguments } from "src/model/morphTypes"
import { jsonParseOr } from "src/util/misc"
import { ActionTypes } from "../actions"
import { getDefaultArguments } from "../dispatchers/morphDispatcher"
import { RootState, UrlState } from "../store"
import { changeStatusReducer, imageReducers } from "./images"
import { morphReducers } from "./morphs"
import { outputImageReducers } from "./outputImage"


const initialState = jsonParseOr<UrlState>(decodeURIComponent(window.location.hash), {}) || {}

const setUrlStateReducer: Reducer<UrlState> = (state = initialState, action) => {
  if (action.type === ActionTypes.updateUrl) {
    return { ...state, urlState: { ...action } }
  }
  return state
}

import reduceReducers from "reduce-reducers"
export const urlStateReducers: Reducer<UrlState> = reduceReducers(setUrlStateReducer)

export const reducers = reduceReducers(
  combineReducers<RootState>({
    images: imageReducers,
    morphs: morphReducers,
    outputImage: outputImageReducers,
    status: changeStatusReducer,
    urlState: (state, action) => state || {}
  })
  , (state: RootState, action) => {
    if (action.type === ActionTypes.updateUrl) { // this happens when user select / change a morph so we must update the url
      const selectedMorph = state.morphs.find(m => m.isSelected)
      if (selectedMorph) {
        const urlState: UrlState = { selectedMorph: selectedMorph.definition.id, selectedMorphValue: selectedMorph.value }
        history.replaceState(null, null, document.location.pathname + "#" + encodeURIComponent(JSON.stringify(urlState)))
        return { ...state, urlState }
      }
    }
    else if (action.type === ActionTypes.urlChanged) { // this happens when user changes / navigates to an url with a state in the hash
      const hash = decodeURIComponent(location.hash && location.hash.substring(1, location.hash.length)) + ""
      const urlState = jsonParseOr(hash, state.urlState || {})
      const morph = state.morphs.find(m => m.definition.id === urlState.selectedMorph)
      const result = {
        ...state,
        urlState,
        morphs: state.morphs.map(m => ({
          ...m,
          isSelected: morph ? m.definition.id === morph.definition.id : false,
          value: urlState.selectedMorphValue || (morph ? morph.value : m.value)
        }))
      }
      return result
    }
    return state
  }
)

