import { paginationDataTypes } from '../constants'
import { RESET_PAGINATION, DATA_RECEIVED } from '../actions'


export default (state = {}, action) => {
  switch (action.type) {
    case DATA_RECEIVED:
      const { data } = action.payload
      for (let collection in data) {
        if (paginationDataTypes.includes(collection)) {
          return {
            ...state,
            docs: data[collection].docs,
            count: data[collection].count
          }
        }
      }
      return state
    case RESET_PAGINATION:
      return {
        ...state,
        docs: [],
        count: 0
      }
    default:
      return state
  }
}
