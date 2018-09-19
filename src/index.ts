import * as ReactDOM from 'react-dom';
import App from './main/app'
import { store } from './state/Store';

function install() {
  const app = document.createElement('div')
  app.setAttribute('id', 'app')
  document.body.appendChild(app)
}

function render() {
  ReactDOM.render(App(), document.querySelector('#app'));
}

store().subscribe(() => {
  ReactDOM.render(App(), document.querySelector('#app'));
})


install()
render()