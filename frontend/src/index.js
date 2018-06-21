import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { initApp } from './actions'
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


store.dispatch(initApp(
  [
    {
      id: 'medium',
      maxWidth: 980
    },
    {
      id: 'small',
      maxWidth: 720
    }
  ]
))


initFontAwesome()
registerServiceWorker()
