import * as ReactDOM from 'react-dom';
import App from './ui/main/app'
import { store } from './state/Store';

function install() {
  const app = document.createElement('div')
  app.setAttribute('id', 'app')
  document.body.appendChild(app)

  store().subscribe(render)
  window.addEventListener('hashchange', render)
}

function render() {

  ReactDOM.render(App(), document.querySelector('#app'));
}

install()
render()