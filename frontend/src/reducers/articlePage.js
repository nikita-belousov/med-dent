import { DATA_RECEIVED } from '../actions'
import { articlePageDataTypes } from '../constants'


export default (state = {}, action) => {
  switch (action.type) {
    case DATA_RECEIVED:
      const { data } = action.payload
      for (let dataType of Object.keys(data)) {
        if (articlePageDataTypes.includes(dataType)) {
          return {
            ...state,
            ...data[dataType].doc
          }
        }
      }
      return state
    default:
      return state
  }
}
