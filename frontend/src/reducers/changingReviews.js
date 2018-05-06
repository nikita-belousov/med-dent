import {
  CHANGING_REVIEWS_LOADED,
  CHANGING_REVIEWS_UNLOADED
} from './../constants/actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case CHANGING_REVIEWS_LOADED:
      return {
        ...state,
        reviews: action.payload.docs
      }
    case CHANGING_REVIEWS_UNLOADED:
      return {}
    default:
      return state
  }
}
