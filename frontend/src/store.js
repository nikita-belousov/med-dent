import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'

import { promiseMiddleware } from './middleware'
import reducer from './reducers'

const getMiddleware = () => {
  if (process.env.NODE_ENV === 'production') {
    return applyMiddleware(promiseMiddleware)
  } else {
    // return applyMiddleware(promiseMiddleware)
    return applyMiddleware(promiseMiddleware, createLogger())
  }
}

export default createStore(
  reducer,
  composeWithDevTools(getMiddleware())
)
