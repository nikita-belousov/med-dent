import { SERVICES_CATEGORIES_COLLECTION } from '../constants'
import { PAGE_LOADING_START, DATA_RECEIVED, UPDATE_LOADER } from '../actions'


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


export default (state = { isLoading: true }, action) => {
  switch (action.type) {
    case PAGE_LOADING_START:
      loader.start(action.payload.requestsCount)
      return {
        ...state,
        isLoading: true,
        loadingCompletion: 0
      }
    case UPDATE_LOADER: {
      loader.update()
      return {
        ...state,
        loadingCompletion: loader.completion
      }
    }
    case DATA_RECEIVED:
      const servicesCategories = action.payload.data[SERVICES_CATEGORIES_COLLECTION]
      if (servicesCategories) {
        return {
          ...state,
          menuLinks: servicesCategories.docs,
          isLoading: false
        }
      }
      return {
        ...state,
        isLoading: false
      }
    default:
      return state
  }
}
