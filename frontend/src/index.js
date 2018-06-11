import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import initFontAwesome from './fontAwesome'
import registerServiceWorker from './registerServiceWorker'
import store from './store'
import { App } from './components/App'


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)


initFontAwesome()
registerServiceWorker()
