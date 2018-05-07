import {
  ARTICLE_PAGE_LOADED,
  ARTICLE_PAGE_UNLOADED
} from './../constants/actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case ARTICLE_PAGE_LOADED:
      return {
        ...state,
        ...action.payload.doc
      }
    case ARTICLE_PAGE_UNLOADED:
      return {}
    default:
      return state
  }
}
