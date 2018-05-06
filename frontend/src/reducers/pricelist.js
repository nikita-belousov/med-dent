import {
  PRICELIST_LOADED,
  PRICELIST_UNLOADED
} from './../constants/actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case PRICELIST_LOADED:
      return {
        ...state,
        services: action.payload.docs || []
      }
    case PRICELIST_UNLOADED:
      return {}
    default:
      return state
  }
}
