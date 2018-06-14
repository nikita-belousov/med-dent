import { DATA_RECEIVED } from '../actions'
import { CATEGORY_PAGE_CONTENT } from '../constants'

export default (state = {}, action) => {
  switch (action.type) {
    case DATA_RECEIVED:
      const content = action.payload.data[CATEGORY_PAGE_CONTENT]
      if (content && content.dentists && content.services) {
        return {
          ...state,
          services: content.services.docs,
          dentists: content.dentists
            .reduce((res, { doc }) => [ ...res, doc ], []),
        }
      }
      return state
    default:
      return state
  }
}
