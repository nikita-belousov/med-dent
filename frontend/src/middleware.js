import agent from './agent'
import { LOGIN, LOGOUT } from './constants/actionTypes'

export const promiseMiddleware = store => next => action => {
  if (isPromise(action.payload)) {
    action.payload.then(res => {
      action.payload = res
      store.dispatch(action)
    })
  } else {
    next(action)
  }
}

export const localStorageMiddleware = store => next => action => {
  if (action.type === LOGIN) {
    if (!action.error) {
      window.localStorage.setItem('jwt', action.payload.user.token)
      agent.setToken(action.payload.user.token)
    }
  } else if (action.type === LOGOUT) {
    window.localStorage.setItem('', action.payload.user.token)
    agent.setToken(null)
  }
}

const isPromise = (val) => {
  return val && typeof val.then === 'function'
}
