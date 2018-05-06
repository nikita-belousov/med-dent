import {
  APPOINTMENT_LOADED,
  APPOINTMENT_UNLOADED
} from './../constants/actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case APPOINTMENT_LOADED:
      return {
        ...state,
        staff: action.payload.docs || []
      }
    case APPOINTMENT_UNLOADED:
      return {}
    default:
      return state
  }
}
