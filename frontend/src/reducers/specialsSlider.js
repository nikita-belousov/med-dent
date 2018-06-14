import { SPECIALS_SLIDES_COLLECTION } from '../constants'
import { DATA_RECEIVED } from '../actions'

export default (state = {}, action) => {
  switch (action.type) {
    case DATA_RECEIVED:
      const specialsCards = action.payload.data[SPECIALS_SLIDES_COLLECTION]
      if (specialsCards) {
        return {
          ...state,
          specialsCards: specialsCards.docs
        }
      }
      return state
    default:
      return state
  }
}
