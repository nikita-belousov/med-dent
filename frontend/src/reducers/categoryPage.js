import { DATA_RECEIVED } from '../actions'
import { DENTISTS_FOR_CATEGORY_PAGE, SERVICES_BY_CATEGORY_COLLECTION } from '../constants'

export default (state = {}, action) => {
  switch (action.type) {
    case DATA_RECEIVED:
      const services = action.payload.data[SERVICES_BY_CATEGORY_COLLECTION]
      let dentists = action.payload.data[DENTISTS_FOR_CATEGORY_PAGE]
      dentists = dentists && [].concat(dentists)

      if (services) {
        return {
          ...state,
          services: services.docs,
          dentists: (dentists && dentists.length > 0) &&
                      dentists
                        .slice(0, 2)
                        .reduce((res, { doc }) => [ ...res, doc ], [])
        }
      }
      return state
    default:
      return state
  }
}
