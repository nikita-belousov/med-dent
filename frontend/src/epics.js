import { timer, Subject, BehaviorSubject } from 'rxjs'
import { from } from 'rxjs/observable/from'
import { of } from 'rxjs/observable/of'
import { fromPromise } from 'rxjs/observable/fromPromise'
import { concat, count, publish, share, merge, mergeAll, take, takeUntil, reduce, map, mapTo, throttleTime, switchMap, mergeMap, tap, startWith, auditTime, delay, pairwise } from 'rxjs/operators'
import { combineEpics, ofType } from 'redux-observable'

import { FETCH_THROTTLE } from './constants'
import { dataReceived, pageLoadingStart, pageReloadingActions, updateLoader, PAGE_LOADED } from './actions'


const loadPage = action$ =>
  action$.pipe(
    ofType(...pageReloadingActions),
    throttleTime(FETCH_THROTTLE),
    switchMap(action => {
      const request$ = action$.pipe(
        ofType(...pageReloadingActions),
        takeUntil(timer(FETCH_THROTTLE)),
        startWith(action)
      )

      const response$ = request$.pipe(
        mergeMap(action =>
          fromPromise(action.payload.api()).pipe(
            map(data => ({
              ...data,
              dataType: action.payload.dataType
            }))
          )
        )
      )

      const loaderInit$ = request$.pipe(
        count(),
        take(1),
        map(pageLoadingStart)
      )

      const loaderUpdate$ = response$.pipe(
        mapTo(updateLoader())
      )

      const dataReceived$ = response$.pipe(
        reduce((acc, { dataType, ...data }) => ({
          ...acc,
          [dataType]: data
        }), {}),
        map(dataReceived)
      )

      const loading$ = loaderUpdate$.pipe(
        merge(dataReceived$)
      )

      return loading$.pipe(
        startWith(pageLoadingStart())
      )

      // return loading$.pipe(
      //   startWith(loaderInit$),
      //   mergeAll()
      // )
    })
  )


export default combineEpics(loadPage)
