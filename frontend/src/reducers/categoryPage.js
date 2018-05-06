import {
  CATEGORY_PAGE_LOADED,
  CATEGORY_PAGE_UNLOADED
} from './../constants/actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_PAGE_LOADED:
      return {
        ...state,
        services: action.payload[0].docs,
        doctors: action.payload[1]
          .reduce((res, el) => [...res, el.doc], []),
        loaded: true
      }
    case CATEGORY_PAGE_UNLOADED:
      return {}
    default:
      return state
  }
}
