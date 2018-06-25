import { map } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { APPOINTMENT_LOAD, fetchDentistsAsOptions } from '../actions'


const loadAppointmentForm = action$ =>
  action$.pipe(
    ofType(APPOINTMENT_LOAD),
    map(fetchDentistsAsOptions)
  )


export default loadAppointmentForm
