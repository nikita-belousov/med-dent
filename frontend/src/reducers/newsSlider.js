import {
  NEWS_SLIDER_LOADED,
  NEWS_SLIDER_UNLOADED
} from './../constants/actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case NEWS_SLIDER_LOADED:
      return {
        ...state,
        news: action.payload.docs || []
      }
    case NEWS_SLIDER_UNLOADED:
      return {}
    default:
      return state
  }
}
