import * as React from "react"
import * as ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { createStore } from "redux"
import App from "./components/App"
import Images from "./components/images"
import "./index.css"
import registerServiceWorker from "./registerServiceWorker"
import { reducers } from "./store/reducers"

// ReactDOM.render(
//   <App />,
//   document.getElementById("root") as HTMLElement
// )

const store = createStore(reducers)
​
ReactDOM.render(
  <Provider store={store}>
    <Images />
  </Provider>,
  document.getElementById("root")
)


registerServiceWorker()
