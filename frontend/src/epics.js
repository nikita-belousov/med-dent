import { timer } from 'rxjs'
import { from } from 'rxjs/observable/from'
import { fromPromise } from 'rxjs/observable/fromPromise'
import { take, takeUntil, reduce, map, mapTo, throttleTime, switchMap, mergeMap, tap, startWith, auditTime, delay, pairwise } from 'rxjs/operators'
import { combineEpics, ofType } from 'redux-observable'


import { FETCH_THROTTLE } from './constants'
import { dataReceived, pageLoadingStart, pageReloadingActions, PAGE_LOADED } from './actions'


const startPageLoading = action$ =>
  action$.pipe(
    ofType(...pageReloadingActions),
    throttleTime(FETCH_THROTTLE),
    mapTo(pageLoadingStart())
  )

const loadPage = action$ =>
  action$.pipe(
    ofType(...pageReloadingActions),
    throttleTime(FETCH_THROTTLE),
    switchMap(action => action$.pipe(
      ofType(...pageReloadingActions),
      startWith(action),
      takeUntil(timer(FETCH_THROTTLE)),
      mergeMap(action =>
        fromPromise(action.payload.api()).pipe(
          map(data => ({ ...data, dataType: action.payload.dataType }))
        )
      ),
      reduce((acc, { dataType, ...data }) => ({
        ...acc,
        [dataType]: data
      }), {}),
      map(dataReceived)
    ))
  )


export default combineEpics(
  startPageLoading,
  loadPage
)
