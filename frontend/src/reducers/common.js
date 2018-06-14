import { SERVICES_CATEGORIES_COLLECTION } from '../constants'
import { PAGE_LOADING_START, DATA_RECEIVED } from '../actions'


export default (state = { isLoading: true }, action) => {
  switch (action.type) {
    case PAGE_LOADING_START:
      return {
        ...state,
        isLoading: true
      }
    case DATA_RECEIVED:
      const servicesCategories = action.payload.data[SERVICES_CATEGORIES_COLLECTION]
      if (servicesCategories) {
        return {
          ...state,
          menuLinks: servicesCategories.docs,
          isLoading: false
        }
      }
      return {
        ...state,
        isLoading: false
      }
    default:
      return state
  }
}
