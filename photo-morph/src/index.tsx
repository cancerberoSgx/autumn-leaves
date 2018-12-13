import * as React from "react"
import * as ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { AnyAction, createStore, Store } from "redux"
import Layout from "./components/layout/layout"
import registerServiceWorker from "./registerServiceWorker"
import { urlChanged } from "./store/actions"
import { reducers } from "./store/reducers"
import { RootState } from "./store/store"
import { addMissingImagesFromUrlState } from './store/dispatchers/imageDispatcher';
import { executeMorph } from './store/dispatchers/morphDispatcher';
import { registerAllMagickTemplateMorphs } from './model/morph/morphs';
import { registerMagickTemplates } from './model/magickTemplates';


registerAllMagickTemplateMorphs()
registerMagickTemplates([
  // // need this because issue not showing editors
  // {
  //   name: "dummy", id: "dummy", description: "", template: async c => null, arguments: [], tags: []
  // },
])


export const store: Store<RootState, AnyAction> = createStore(reducers)

window.addEventListener("hashchange", (e: HashChangeEvent)=>{
  store.dispatch(urlChanged())
}, false)

ReactDOM.render(
  <Provider store={store}>
    <Layout />
  </Provider>,
  document.getElementById("root"), 
  async ()=>{
    store.dispatch(urlChanged())
    await addMissingImagesFromUrlState()
    await executeMorph()
  }
)

registerServiceWorker()
