import { SERVICES_CATEGORIES_COLLECTION } from '../constants'
import { INIT_HEADER_DATA, DATA_RECEIVED } from '../actions'


export default (state = {}, action) => {
  switch (action.type) {
    case INIT_HEADER_DATA:
      return {
        ...state,
        navLinks: action.payload.navLinks || [],
        socialLinks: action.payload.socialLinks || [],
        warning: action.payload.warning || null
      }
    case DATA_RECEIVED:
      const servicesCategories = action.payload.data[SERVICES_CATEGORIES_COLLECTION]
      if (servicesCategories) {
        return {
          ...state,
          servicesLinks: servicesCategories.docs
            .sort((a, b) => a.order > b.order)
        }
      }
      return state
    default:
      return state
  }
}
