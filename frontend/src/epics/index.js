import { combineEpics } from 'redux-observable'
import loadData from './loadData'
import mediaQuery from './mediaQuery'


export default combineEpics(
  loadData,
  mediaQuery
)
