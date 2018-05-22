import {
  APPOINTMENT_SHOW,
  APPOINTMENT_CLOSE,
  APPOINTMENT_LOADED,
  APPOINTMENT_UNLOADED,
  SET_DEFAULT_DENTIST
} from './../constants/actionTypes'

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
    case APPOINTMENT_LOADED:
      return {
        ...state,
        staff: action.payload.docs || []
      }
    case SET_DEFAULT_DENTIST:
      return {
        ...state,
        defaultDentist: {
          value: action.payload.value,
          name: action.payload.name
        }
      }
    case APPOINTMENT_UNLOADED:
      return {}
    default:
      return state
  }
}
