import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { initApp } from './actions'
import initFontAwesome from './fontAwesome'
import registerServiceWorker from './registerServiceWorker'
import store from './store'
import { App } from './components/App'
import { initHeaderData } from './actions'
import { NAVIGATION_LINKS, SOCIAL_LINKS, WARNING_TEXT } from './constants/config'


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)


store.dispatch(initApp([
  {
    id: 'medium',
    maxWidth: 1140,
  },
  {
    id: 'small',
    maxWidth: 720
  },
  {
    id: 'xsmall',
    maxWidth: 480
  }
]))

store.dispatch(initHeaderData({
  navLinks: NAVIGATION_LINKS,
  socialLinks: SOCIAL_LINKS,
  warning: WARNING_TEXT
}))


initFontAwesome()
registerServiceWorker()
