import * as React from "react"
import * as ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { createStore } from "redux"
import Layout from "./components/layout/layout"
import registerServiceWorker from "./registerServiceWorker"
import { reducers } from "./store/reducers"

const store = createStore(reducers)
​
ReactDOM.render(
  <Provider store={store}>
    <Layout />
  </Provider>,
  document.getElementById("root")
)

registerServiceWorker()
