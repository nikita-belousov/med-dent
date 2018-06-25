import { empty } from 'rxjs/observable/empty'
import { mergeMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { submitDataActions } from '../actions'


const submitData = action$ =>
  action$.pipe(
    ofType(...submitDataActions),
    mergeMap(action => {
      action.payload.api()
      return empty()
    })
  )


export default submitData
