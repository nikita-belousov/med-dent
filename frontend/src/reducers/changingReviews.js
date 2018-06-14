import { REVIEWS_SLIDES_COLLECTION } from '../constants'
import { DATA_RECEIVED } from '../actions'

export default (state = {}, action) => {
  switch (action.type) {
    case DATA_RECEIVED:
      const reviews = action.payload.data[REVIEWS_SLIDES_COLLECTION]
      if (reviews) {
        return {
          ...state,
          reviews: reviews.docs
        }
      }
      return state
    default:
      return state
  }
}
