import { SERVICES_COLLECTION } from '../constants'
import { DATA_RECEIVED } from '../actions'

export default (state = {}, action) => {
  switch (action.type) {
    case DATA_RECEIVED:
      const services = action.payload.data[SERVICES_COLLECTION]
      if (services) {
        return {
          ...state,
          services: services.docs
        }
      }
      return state
    default:
      return state
  }
}
