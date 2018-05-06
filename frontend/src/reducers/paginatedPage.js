import {
  PAGINATED_PAGE_LOADED,
  PAGINATED_PAGE_UNLOADED
} from './../constants/actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case PAGINATED_PAGE_LOADED:
      return {
        ...state,
        path: action.path || null,
        pager: action.pager || null,
        docs: action.payload.docs || [],
        count: action.payload.count || 0
      }
    case PAGINATED_PAGE_UNLOADED:
      return {}
    default:
      return state
  }
}
