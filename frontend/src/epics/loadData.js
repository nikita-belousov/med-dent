import { timer, Subject, ReplaySubject } from 'rxjs'
import { from } from 'rxjs/observable/from'
import { empty } from 'rxjs/observable/empty'
import { of } from 'rxjs/observable/of'
import { fromPromise } from 'rxjs/observable/fromPromise'
import { skipWhile, defaultIfEmpty, multicast, refCount, first, concat, count, publish, share, shareReplay, merge, mergeAll, take, takeUntil, reduce, map, mapTo, throttleTime, switchMap, mergeMap, tap, startWith, auditTime, delay, pairwise } from 'rxjs/operators'
import { combineEpics, ofType } from 'redux-observable'

import { FETCH_THROTTLE } from '../constants'
import { PAGE_LOADED, LOAD_APPOINTMENT_FORM } from '../actions'
import { dataReceived, pageLoadingStart, pageReloadingActions, requestActions, initLoader, updateLoader, fetchDentistsAsOptions } from '../actions'


const loadAppointmentForm = action$ =>
  action$.pipe(
    ofType(LOAD_APPOINTMENT_FORM),
    map(fetchDentistsAsOptions)
  )


const loadPage = action$ => {
  const request$ = action$.pipe(ofType(...requestActions), share())

  return request$.pipe(
    throttleTime(FETCH_THROTTLE),
    switchMap(action => {
      const requestGroup$ = request$.pipe(
        takeUntil(timer(FETCH_THROTTLE)),
        startWith(action),
      )

      const startLoading$ = requestGroup$.pipe(
        ofType(...pageReloadingActions),
        skipWhile(({ type }) => !pageReloadingActions.includes(type)),
        take(1),
        mapTo(pageLoadingStart())
      )

      const requestsCount$ = requestGroup$.pipe(
        reduce((acc, { type }) => ({
          count: acc.count + 1,
          reload: (pageReloadingActions.includes(type)) || acc.reload
        }), { count: 0, reload: false }),
        mergeMap(val => val.reload
          ? of(initLoader(val.count))
          : empty()
        )
      )

      const response$ = requestGroup$.pipe(
        mergeMap(action =>
          fromPromise(action.payload.api()).pipe(
            map(data => ({
              ...data,
              dataType: action.payload.dataType
            }))
          )
        )
      )

      const responseReplay$ = new ReplaySubject(100)
      response$.subscribe(responseReplay$)

      const loaderUpdate$ = responseReplay$.pipe(
        mapTo(updateLoader())
      )

      const data$ = responseReplay$.pipe(
        reduce((acc, { dataType, ...data }) => ({
          ...acc,
          [dataType]: data
        }), {}),
        map(dataReceived),
        delay(1000)
      )

      return startLoading$.pipe(
        merge(requestsCount$),
        concat(loaderUpdate$.pipe(merge(data$)))
      )
    })
  )
}


export default combineEpics(
  loadPage,
  // loadAppointmentForm
)
