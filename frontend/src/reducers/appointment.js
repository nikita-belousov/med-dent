import { APPOINTMENT_SHOW, APPOINTMENT_CLOSE, SET_DEFAULT_DENTIST } from '../constants/actionTypes'
import { DATA_RECEIVED } from '../actions'
import { DENTISTS_OPTIONS_COLLECTION } from '../constants'

const defaultState = { isActive: false }

export default (state = defaultState, action) => {
  switch (action.type) {
    case APPOINTMENT_SHOW:
      return {
        ...state,
        isActive: true
      }
    case APPOINTMENT_CLOSE:
      return {
        ...state,
        isActive: false
      }
    case DATA_RECEIVED:
      const dentistsOptions = action.payload.data[DENTISTS_OPTIONS_COLLECTION]
      if (dentistsOptions) {
        return {
          ...state,
          dentistsOptions: dentistsOptions.docs || []
        }
      }
      return state
    case SET_DEFAULT_DENTIST:
      return {
        ...state,
        defaultDentist: {
          value: action.payload.value,
          name: action.payload.name
        }
      }
    default:
      return state
  }
}
