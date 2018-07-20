import linksStructure, { HOME } from '../constants/linksStructure'
import { SERVICES_CATEGORIES_COLLECTION } from '../constants'
import { UPDATE_BREADCRUMBS, RESET_BREADCRUMBS, MEDIA_QUERY_CHANGED } from '../actions'
import { PAGE_LOADING_START, DATA_RECEIVED, INIT_LOADER, UPDATE_LOADER } from '../actions'


class Loader {
  start(segmentsCount) {
    this.completion = 0
    this._step = 1 / segmentsCount
  }

  update() {
    this.completion += this._step
  }
}

const loader = new Loader()


const getLinkHierarchy = (linksStructure, parentLink) => {
  let parent = parentLink
  let res = []
  while (parent) {
    res.unshift(linksStructure[parent])
    parent = linksStructure[parent].parent
  }
  return res
}


const defaultState = {
  breadcrumbs: getLinkHierarchy(linksStructure, HOME),
  maintenance: true
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_BREADCRUMBS:
      return {
        ...state,
        breadcrumbs: getLinkHierarchy(linksStructure, action.payload.parentLink)
      }
    case RESET_BREADCRUMBS:
      return {
        ...state,
        breadcrumbs: getLinkHierarchy(linksStructure, HOME)
      }
    case MEDIA_QUERY_CHANGED:
      return {
        ...state,
        mediaQueries: action.payload.mediaQueries
      }
    case PAGE_LOADING_START:
      return {
        ...state,
        isLoading: true,
        loadingCompletion: 0
      }
    case INIT_LOADER:
      loader.start(action.payload.requestsCount)
      return state
    case UPDATE_LOADER: {
      loader.update()
      return {
        ...state,
        loadingCompletion: loader.completion
      }
    }
    case DATA_RECEIVED:
      return {
        ...state,
        isLoading: false
      }
    default:
      return state
  }
}
