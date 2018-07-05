import { DENTIST_PAGE } from '../constants'
import { DATA_RECEIVED } from '../actions'


export default (state = {}, action) => {
  switch (action.type) {
    case DATA_RECEIVED:
      const dentistPage = action.payload.data[DENTIST_PAGE]
      if (dentistPage) {
        return {
          ...state,
          ...dentistPage.doc
        }
      }
      return state
    default:
      return state
  }
}
