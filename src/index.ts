import * as ReactDOM from 'react-dom';
import App from './main/app'

const app = document.createElement('div')
app.setAttribute('id', 'app')
document.body.appendChild(app)
ReactDOM.render(App(), document.querySelector('#app'));