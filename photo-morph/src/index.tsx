import * as React from "react"
import * as ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { AnyAction, createStore, Store } from "redux"
import Layout from "./components/layout/layout"
import registerServiceWorker from "./registerServiceWorker"
import { reducers } from "./store/reducers"
import { RootState } from "./store/store"

export const store: Store<RootState, AnyAction> = createStore(reducers)


ReactDOM.render(
  <Provider store={store}>
    <Layout />
  </Provider>,
  document.getElementById("root")
)

registerServiceWorker()
