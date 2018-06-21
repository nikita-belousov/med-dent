import { empty } from 'rxjs/observable/empty'
import { from } from 'rxjs/observable/from'
import { combineLatest } from 'rxjs/observable/combineLatest'
import { fromEventPattern } from 'rxjs/observable/fromEventPattern'
import { map, debounceTime, switchMap, reduce, tap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { INIT_APP, mediaQueryChanged } from '../actions'


const mediaQuery = action$ =>
  action$.pipe(
    ofType(INIT_APP),
    switchMap(action =>
      combineLatest(...getMqlObservables(action.payload.mediaQueryRules))
        .pipe(
          map(getResults),
          map(mediaQueryChanged),
          tap(console.log)
        )
    )
  )


function getMedia(rule) {
  let media = rule.type || 'screen'

  if (rule.minWidth) media += ` and (min-width: ${rule.minWidth}px)`
  if (rule.maxWidth) media += ` and (max-width: ${rule.maxWidth}px)`
  if (rule.orientation) media += ` and (orientation: ${rule.orientation}px)`

  return media
}


function getMqlObservables(rules) {
  let observables = rules.map(rule => {
    const mediaQueryList = global.matchMedia(getMedia(rule))

    return fromEventPattern(
      handler => {
        handler(mediaQueryList)
        mediaQueryList.addListener(handler)
      },
      handler => mediaQueryList.removeListener(handler),
      mql => ({ mql, rule })
    )
  })

  return observables
}


function getResults(updates) {
  return updates.reduce((acc, cur) => {
    acc[cur.rule.id] = cur.mql.matches
    return acc
  }, {})
}


export default mediaQuery
