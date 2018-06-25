import { timer, Subject, ReplaySubject, merge, concat } from 'rxjs'
import { from } from 'rxjs/observable/from'
import { empty } from 'rxjs/observable/empty'
import { of } from 'rxjs/observable/of'
import { fromPromise } from 'rxjs/observable/fromPromise'
import { scan, concat as _concat, delayWhen, filter, skipWhile, defaultIfEmpty, multicast, refCount, first, count, publish, share, shareReplay, mergeAll, take, takeUntil, reduce, map, mapTo, throttleTime, switchMap, mergeMap, tap, startWith, auditTime, delay, pairwise } from 'rxjs/operators'
import { combineEpics, ofType } from 'redux-observable'

import { FETCH_THROTTLE } from '../constants'
import { PAGE_LOADED, APPOINTMENT_LOAD } from '../actions'
import { dataReceived, pageLoadingStart, pageReloadingActions, requestActions, initLoader, updateLoader, fetchDentistsAsOptions } from '../actions'


const cacheData = (url, data) => {
  const storage = window.localStorage
  const serialized = JSON.stringify(data)
  storage.setItem(url, serialized)
}


const loadAppointmentForm = action$ =>
  action$.pipe(
    ofType(APPOINTMENT_LOAD),
    map(fetchDentistsAsOptions)
  )


const loadPage = action$ => {
  const request$ = action$.pipe(
    ofType(...requestActions),
    share()
  )

  return request$.pipe(
    throttleTime(FETCH_THROTTLE),
    switchMap(action => {
      const requestGroup$ = request$
        .pipe(
          takeUntil(timer(FETCH_THROTTLE)),
          share(),
          startWith(action)
        )

      const filterByCached = cached => action$ => action$.pipe(
        filter(({ payload }) => {
          const storage = window.localStorage
          return cached === !!storage.getItem(payload.url)
        })
      )

      const cached$ = requestGroup$
        .pipe(filterByCached(true), share())

      const uncached$ = requestGroup$
        .pipe(filterByCached(false)) // почему-то startLoading неправильно работает с share()

      const startLoading$ = uncached$.pipe(
        ofType(...pageReloadingActions),
        take(1),
        mapTo(pageLoadingStart())
      )

      const requestsCount$ = uncached$.pipe(
        reduce((acc, { type }) => ({
          count: acc.count + 1,
          reload: (pageReloadingActions.includes(type)) || acc.reload
        }), { count: 0, reload: false }),
        mergeMap(val => val.reload
          ? of(initLoader(val.count))
          : empty()
        )
      )

      const cachedData$ = cached$.pipe(
        map(({ payload }) => {
          const { url, dataType } = payload
          let data = window.localStorage.getItem(url)
          data = JSON.parse(data)
          return { ...data, dataType }
        })
      )

      const responseData$ = uncached$.pipe(
        mergeMap(({ payload }) =>
          fromPromise(payload.api()).pipe(
            tap(data => cacheData(payload.url, data)),
            map(data => ({ ...data, dataType: payload.dataType }))
          )
        )
      )

      const cachedReplay$ = new ReplaySubject(100)
      const responseReplay$ = new ReplaySubject(100)
      cachedData$.subscribe(cachedReplay$)
      responseData$.subscribe(responseReplay$)

      const packData = data$ => data$.pipe(
        reduce((acc, { dataType, ...data }) => ({
          ...acc,
          [dataType]: acc[dataType] ? [ data ].concat(acc[dataType]) : data
        }), {}),
        map(dataReceived)
      )

      const delay = data$ => data$.pipe(
        _concat(
          responseReplay$.pipe(
            take(1),
            mergeMap(val => val ? delay(3000) : empty())
          )
        )
      )

      const init$ = merge(startLoading$, requestsCount$)
      const loading$ = responseReplay$.pipe(mapTo(updateLoader()))
      const data$ = merge(cachedReplay$, responseReplay$)
        .pipe(packData)

      return concat(init$, loading$, data$)
        // .pipe(tap(console.log))
    })
  )
}


export default combineEpics(loadPage, loadAppointmentForm)
