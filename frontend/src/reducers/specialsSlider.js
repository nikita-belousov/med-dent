import {
  SPECIALS_SLIDER_LOADED,
  SPECIALS_SLIDER_UNLOADED
} from './../constants/actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case SPECIALS_SLIDER_LOADED:
      return {
        ...state,
        cards: action.payload.docs || []
      }
    case SPECIALS_SLIDER_UNLOADED:
      return {}
    default:
      return state
  }
}
