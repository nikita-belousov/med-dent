import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { promiseMiddleware } from './middleware'
import reducer from './reducers'
import rootEpic from './epics'


const epicMiddleware = createEpicMiddleware(rootEpic)

const getMiddleware = () => {
  if (process.env.NODE_ENV === 'production') {
    return applyMiddleware(promiseMiddleware, epicMiddleware)
  } else {
    // return applyMiddleware(promiseMiddleware, epicMiddleware)
    return applyMiddleware(promiseMiddleware, epicMiddleware, createLogger())
  }
}


export default createStore(
  reducer,
  composeWithDevTools(getMiddleware())
)
