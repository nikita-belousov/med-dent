import { dataTypes, ITEMS_ON_PAGE, REVIEWS_SLIDES_TO_SHOW, NEWS_IN_SLIDER } from './constants'
import agent from './agent'


//=====================================
//  App
//-------------------------------------

export const INIT_APP = 'INIT_APP'
export const MEDIA_QUERY_CHANGED = 'MEDIA_QUERY_CHANGED'
export const UPDATE_BREADCRUMBS = 'UPDATE_BREADCRUMBS'
export const RESET_BREADCRUMBS = 'RESET_BREADCRUMBS'

export const initApp = mediaQueryRules => ({
  type: INIT_APP,
  payload: { mediaQueryRules }
})

export const mediaQueryChanged = mediaQueries => ({
  type: MEDIA_QUERY_CHANGED,
  payload: { mediaQueries }
})

export const updateBreadcrumbs = parentLink => ({
  type: UPDATE_BREADCRUMBS,
  payload: { parentLink }
})

export const resetBreadcrumbs = () => ({
  type: RESET_BREADCRUMBS
})


//=====================================
//  Header
//-------------------------------------

export const INIT_HEADER_DATA = 'INIT_HEADER_DATA'

export const initHeaderData = data => ({
  type: INIT_HEADER_DATA,
  payload: { ...data }
})


//=====================================
//  Appointment
//-------------------------------------

export const APPOINTMENT_LOAD = 'APPOINTMENT_LOAD'
export const APPOINTMENT_OPEN = 'APPOINTMENT_OPEN'
export const APPOINTMENT_CLOSE = 'APPOINTMENT_CLOSE'
export const APPOINTMENT_SUBMIT = 'SUBMIT_APPOINTMENT'

export const appointmentLoad = () => ({
  type: APPOINTMENT_LOAD
})

export const appointmentOpen = () => ({
  type: APPOINTMENT_OPEN
})

export const appointmentClose = () => ({
  type: APPOINTMENT_CLOSE
})

export const appointmentSubmit = data => ({
  type: APPOINTMENT_SUBMIT,
  payload: {
    api: () => agent.appointmentApi.submit().api(data)
  }
})


//=====================================
//  Pagination
//-------------------------------------

export const RESET_PAGINATION = 'RESET_PAGINATION'

export const resetPagination = () => ({
  type: RESET_PAGINATION
})


//=====================================
//  Callback
//-------------------------------------

export const CALLBACK_SUBMIT = 'CALLBACK_SUBMIT'

export const callbackSubmit = data => ({
  type: CALLBACK_SUBMIT,
  payload: {
    api: () => agent.callbackApi.submit().api(data)
  }
})


//=====================================
//  Count price
//-------------------------------------

export const COUNT_COST_SUBMIT = 'COUNT_COST_SUBMIT'

export const countPrice = data => ({
  type: COUNT_COST_SUBMIT,
  payload: {
    api: () => agent.countCostApi.submit().api(data)
  }
})


//=====================================
//  Services
//-------------------------------------

export const FETCH_SERVICES_CATEGORIES = 'FETCH_SERVICES_CATEGORIES'
export const FETCH_SERVICES = 'FETCH_SERVICES'
export const FETCH_SERVICES_BY_CATEGORY = 'FETCH_SERVICES_BY_CATEGORY'
export const FETCH_CATEGORY_PAGE = 'FETCH_CATEGORY_PAGE'

export const fetchServicesCategories = () => {
  const { url, api } = agent.serviceCategoriesApi.all()
  return {
    type: FETCH_SERVICES_CATEGORIES,
    payload: {
      dataType: dataTypes.SERVICES_CATEGORIES_COLLECTION,
      url,
      api
    }
  }
}

export const fetchServices = () => {
  const { url, api } = agent.servicesApi.all()
  return {
    type: FETCH_SERVICES,
    payload: {
      dataType: dataTypes.SERVICES_COLLECTION,
      url,
      api
    }
  }
}

export const fetchServicesByCategory = categoryId => {
  const { url, api } = agent.servicesApi.byCategory(categoryId)
  return {
    type: FETCH_SERVICES_BY_CATEGORY,
    payload: {
      dataType: dataTypes.SERVICES_BY_CATEGORY_COLLECTION,
      url,
      api
    }
  }
}


//=====================================
//  Specials
//-------------------------------------

export const FETCH_SPECIALS_SLIDES = 'FETCH_SPECIALS_SLIDES'
export const FETCH_SPECIALS_PAGE = 'FETCH_SPECIALS_PAGE'
export const FETCH_SPECIALS_ARTICLE = 'FETCH_SPECIALS_ARTICLE'

export const fetchSpecialsSlides = () => {
  const { url, api } = agent.specialsApi.previews()
  return {
    type: FETCH_SPECIALS_SLIDES,
    payload: {
      dataType: dataTypes.SPECIALS_SLIDES_COLLECTION,
      url,
      api
    }
  }
}

export const fetchSpecialsPage = pageNum => {
  const { url, api } = agent.specialsApi.page(ITEMS_ON_PAGE, pageNum)
  return {
    type: FETCH_SPECIALS_PAGE,
    payload: {
      dataType: dataTypes.SPECIALS_PREVIEWS_COLLECTION,
      url,
      api
    }
  }
}

export const fetchSpecialsArticle = slug => {
  const { url, api } = agent.specialsApi.article(slug)
  return {
    type: FETCH_SPECIALS_ARTICLE,
    payload: {
      dataType: dataTypes.SPECIALS_ENTITY,
      url,
      api
    }
  }
}


//=====================================
//  specialsApi
//-------------------------------------

export const FETCH_NEWS_SLIDES = 'FETCH_NEWS_SLIDES'
export const FETCH_NEWS_PAGE = 'FETCH_NEWS_PAGE'
export const FETCH_NEWS_ARTICLE = 'FETCH_NEWS_ARTICLE'

export const fetchNewsSlides = () => {
  const { url, api } = agent.newsApi.page(NEWS_IN_SLIDER, 1)
  return {
    type: FETCH_NEWS_SLIDES,
    payload: {
      dataType: dataTypes.NEWS_SLIDES_COLLECTION,
      url,
      api
    }
  }
}

export const fetchNewsPage = pageNum => {
  const { url, api } = agent.newsApi.page(ITEMS_ON_PAGE, pageNum)
  return {
    type: FETCH_NEWS_PAGE,
    payload: {
      dataType: dataTypes.NEWS_PREVIEWS_COLLECTION,
      url,
      api
    }
  }
}

export const fetchNewsArticle = slug => {
  const { url, api } = agent.newsApi.article(slug)
  return {
    type: FETCH_NEWS_ARTICLE,
    payload: {
      dataType: dataTypes.NEWS_ENTITY,
      url,
      api
    }
  }
}


//=====================================
//  Reviews
//-------------------------------------

export const FETCH_REVIEWS_SLIDES = 'FETCH_REVIEWS_SLIDES'
export const FETCH_REVIEWS_PAGE = 'FETCH_REVIEWS_PAGE'
export const REVIEW_SUBMIT = 'REVIEW_SUBMIT'

export const fetchReviewsSlides = () => {
  const { url, api } = agent.reviewsApi.page(REVIEWS_SLIDES_TO_SHOW, 1)
  return {
    type: FETCH_REVIEWS_SLIDES,
    payload: {
      dataType: dataTypes.REVIEWS_SLIDES_COLLECTION,
      url,
      api
    }
  }
}

export const fetchReviewsPage = pageNum => ({
  type: FETCH_REVIEWS_PAGE,
  payload: {
    dataType: dataTypes.REVIEWS_COLLECTION,
    url: agent.reviewsApi.page(ITEMS_ON_PAGE, pageNum).url,
    api: agent.reviewsApi.page(ITEMS_ON_PAGE, pageNum).api
  }
})

export const reviewSubmit = data => ({
  type: REVIEW_SUBMIT,
  payload: {
    api: () => agent.reviewsApi.submit().api(data)
  }
})


//=====================================
//  Questions
//-------------------------------------

export const FETCH_QUESTIONS_PAGE = 'FETCH_QUESTIONS_PAGE'
export const QUESTION_SUBMIT = 'QUESTION_SUBMIT'

export const fetchQuestionsPage = pageNum => ({
  type: FETCH_QUESTIONS_PAGE,
  payload: {
    dataType: dataTypes.QUESTIONS_COLLECTION,
    url: agent.questionsApi.page(ITEMS_ON_PAGE, pageNum).url,
    api: agent.questionsApi.page(ITEMS_ON_PAGE, pageNum).api
  }
})

export const questionSubmit = data => ({
  type: QUESTION_SUBMIT,
  payload: {
    api: () => agent.questionsApi.submit().api(data)
  }
})


//=====================================
// Dentists
//-------------------------------------

export const FETCH_DENTISTS_PAGE = 'FETCH_DENTISTS_PAGE'
export const FETCH_DENTIST_BY_ID = 'FETCH_DENTIST_BY_ID'
export const FETCH_DENTISTS_AS_OPTIONS = 'FETCH_DENTISTS_AS_OPTIONS'
export const FETCH_DENTIST_FOR_CATEGORY = 'FETCH_DENTIST_FOR_CATEGORY'

export const fetchDentistsPage = pageNum => {
  const { api, url } = agent.dentistsApi.page(ITEMS_ON_PAGE, pageNum)
  return {
    type: FETCH_DENTISTS_PAGE,
    payload: {
      dataType: dataTypes.DENTISTS_PREVIEWS_COLLECTION,
      api,
      url
    }
  }
}

export const fetchDentistById = id => {
  const { api, url } = agent.dentistsApi.byId(id)
  return {
    type: FETCH_DENTIST_BY_ID,
    payload: {
      dataType: dataTypes.DENTISTS_ENTITY,
      api,
      url
    }
  }
}

export const fetchDentistForCategory = id => {
  const { api, url } = agent.dentistsApi.byId(id)
  return {
    type: FETCH_DENTIST_FOR_CATEGORY,
    payload: {
      dataType: dataTypes.DENTISTS_FOR_CATEGORY_PAGE,
      api,
      url
    }
  }
}

export const fetchDentistsAsOptions = () => {
  const { api, url } = agent.dentistsApi.options()
  return {
    type: FETCH_DENTISTS_AS_OPTIONS,
    payload: {
      dataType: dataTypes.DENTISTS_OPTIONS_COLLECTION,
      api,
      url
    }
  }
}


//=====================================
//  Side effects
//-------------------------------------

export const DATA_RECEIVED = 'DATA_RECEIVED'
export const PAGE_LOADING_START = 'PAGE_LOADING_START'
export const INIT_LOADER = 'INIT_LOADER'
export const UPDATE_LOADER = 'UPDATE_LOADER'

export const dataReceived = data => ({
  type: DATA_RECEIVED,
  payload: { data }
})

export const pageLoadingStart = () => ({
  type: PAGE_LOADING_START
})

export const initLoader = requestsCount => ({
  type: INIT_LOADER,
  payload: { requestsCount }
})

export const updateLoader = () => ({
  type: UPDATE_LOADER
})


export const submitDataActions = [
  APPOINTMENT_SUBMIT,
  CALLBACK_SUBMIT,
  COUNT_COST_SUBMIT,
  REVIEW_SUBMIT,
  QUESTION_SUBMIT
]

export const pageReloadingActions = [
  FETCH_SERVICES_CATEGORIES,
  FETCH_SERVICES,
  FETCH_SERVICES_BY_CATEGORY,
  FETCH_CATEGORY_PAGE,
  FETCH_SPECIALS_SLIDES,
  FETCH_SPECIALS_PAGE,
  FETCH_SPECIALS_ARTICLE,
  FETCH_NEWS_SLIDES,
  FETCH_NEWS_PAGE,
  FETCH_NEWS_ARTICLE,
  FETCH_REVIEWS_SLIDES,
  FETCH_REVIEWS_PAGE,
  FETCH_DENTISTS_PAGE,
  FETCH_DENTIST_BY_ID,
  FETCH_DENTIST_FOR_CATEGORY,
  FETCH_QUESTIONS_PAGE
]

export const getDataActions = [
  ...pageReloadingActions,
  FETCH_DENTISTS_AS_OPTIONS
]

export const actions = {
  ...submitDataActions,
  ...getDataActions,
  APPOINTMENT_LOAD,
  APPOINTMENT_OPEN,
  APPOINTMENT_CLOSE,
  PAGE_LOADING_START,
  DATA_RECEIVED,
  RESET_PAGINATION
}
