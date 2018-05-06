import {
  APP_LOADED,
  APP_UNLOADED,
  SERVICE_CATEGORIES_LOADED,
  SERVICE_CATEGORIES_UNLOADED
} from './../constants/actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case APP_LOADED:
      return {
        ...state,
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
