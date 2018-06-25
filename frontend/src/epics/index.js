import { combineEpics } from 'redux-observable'

import submitData from './submitData'
import getData from './getData'
import loadAppointmentForm from './loadAppointmentForm'
import mediaQueries from './mediaQueries'


export default combineEpics(
  submitData,
  getData,
  loadAppointmentForm,
  mediaQueries
)
