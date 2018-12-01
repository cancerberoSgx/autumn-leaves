import reduceReducers from "reduce-reducers";
import { combineReducers } from "redux";
import { jsonParseOr } from "src/util/misc";
import { ActionTypes, AddUrlImageAction } from "../actions";
import { RootState, UrlState } from "../store";
import { changeStatusReducer, imageReducers } from "./images";
import { morphReducers } from "./morphs";
import { outputImageReducers } from "./outputImage";
import { uiReducers } from './ui';

const updateUrlReducer = (state: RootState, action) => {
  if (action.type === ActionTypes.updateUrl) { // this happens when user select / change a morph so we must update the url
    const selectedMorph = state.morphs.find(m => m.isSelected)
    const urlState: UrlState = {
      ...state.urlState || { selectedImageUrls: [] },
      selectedMorph: selectedMorph && selectedMorph.definition.id,
      selectedMorphValue: selectedMorph && selectedMorph.value,
    }
    history.replaceState(null, null, document.location.pathname + "#" + encodeURIComponent(JSON.stringify(urlState)))
    return { ...state, urlState }
  }
  return state
}

const urlChangedReducer = (state: RootState, action) => {
  if (action.type === ActionTypes.urlChanged) { // this happens when user changes / navigates to an url with a state in the hash
    const hash = decodeURIComponent(location.hash && location.hash.substring(1, location.hash.length)) + ""
    const urlState = jsonParseOr(hash, state.urlState || { selectedImageUrls: [] })
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
  return state || {}
}

const addImageUrlState = (state: UrlState = { selectedImageUrls: [] }, action) => {
  if (action.type === ActionTypes.addUrlImage) {
    return { ...state, selectedImageUrls: [...(state.selectedImageUrls || []), (action as AddUrlImageAction).url] }
  }
  return state
}

export const reducers = reduceReducers(
  combineReducers<RootState>({
    images: imageReducers,
    morphs: morphReducers,
    outputImage: outputImageReducers,
    status: changeStatusReducer,
    urlState: reduceReducers(addImageUrlState),
    uiState: uiReducers
  })
  , reduceReducers(updateUrlReducer, urlChangedReducer)
)