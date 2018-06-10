import {
  APP_LOADED,
  APP_UNLOADED,
  SERVICE_CATEGORIES_LOADED,
  SERVICE_CATEGORIES_UNLOADED
} from './../constants/actionTypes'


const defaultState = { isLoading: true }

export default (state = defaultState, action) => {
  switch (action.type) {
    case APP_LOADED:
      return {
        ...state,
        isLoading: false,
        onPageNotFound: action.onPageNotFound
      }
    case APP_UNLOADED:
      return {
        ...state,
        onPageNotFound: null
      }
    case SERVICE_CATEGORIES_LOADED:
      return {
        ...state,
        serviceCategories: action.payload.docs || []
      }
    case SERVICE_CATEGORIES_UNLOADED:
      return {
        ...state,
        serviceCategories: []
      }
    default:
      return state
  }
}
