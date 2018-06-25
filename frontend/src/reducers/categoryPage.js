import { DATA_RECEIVED } from '../actions'
import { DENTISTS_FOR_CATEGORY_PAGE, SERVICES_BY_CATEGORY_COLLECTION } from '../constants'

export default (state = {}, action) => {
  switch (action.type) {
    case DATA_RECEIVED:
      const services = action.payload.data[SERVICES_BY_CATEGORY_COLLECTION]
      const dentists = action.payload.data[DENTISTS_FOR_CATEGORY_PAGE]

      if (dentists && services) {
        return {
          ...state,
          services: services.docs,
          dentists: [].concat(dentists)
                      .slice(0, 2)
                      .reduce((res, { doc }) => [ ...res, doc ], [])
        }
      }
      return state
    default:
      return state
  }
}
