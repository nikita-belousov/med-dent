import { dataTypes, ITEMS_ON_PAGE, REVIEWS_SLIDES_TO_SHOW, NEWS_IN_SLIDER } from './constants'
import agent from './agent'


//=====================================
//  App
//-------------------------------------

export const INIT_APP = 'INIT_APP'
export const MEDIA_QUERY_CHANGED = 'MEDIA_QUERY_CHANGED'

export const initApp = mediaQueryRules => ({
  type: INIT_APP,
  payload: { mediaQueryRules }
})

export const mediaQueryChanged = mediaQueries => ({
  type: MEDIA_QUERY_CHANGED,
  payload: { mediaQueries }
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

export const APPOINTMENT_SUBMIT = 'SUBMIT_APPOINTMENT'

export const submitAppointment = data => ({
  type: SUBMIT_APPOINTMENT,
  payload: { api: () => agent.Appointment.post(data) }
})


//=====================================
//  Callback
//-------------------------------------

export const CALLBACK_REQUEST = 'CALLBACK_REQUEST'

export const callbackRequest = data => ({
  type: CALLBACK_REQUEST,
  payload: { api: () => agent.callback(data) }
})


//=====================================
//  Count price
//-------------------------------------

export const COUNT_PRICE = 'COUNT_PRICE'

export const countPrice = data => ({
  type: COUNT_PRICE,
  payload: { api: () => agent.countPrice(data) }
})


//=====================================
//  Services
//-------------------------------------

export const FETCH_SERVICES_CATEGORIES = 'FETCH_SERVICES_CATEGORIES'
export const FETCH_SERVICES = 'FETCH_SERVICES'
export const FETCH_SERVICES_BY_CATEGORY = 'FETCH_SERVICES_BY_CATEGORY'
export const FETCH_CATEGORY_PAGE = 'FETCH_CATEGORY_PAGE'

export const fetchServicesCategories = () => ({
  type: FETCH_SERVICES_CATEGORIES,
  payload: {
    dataType: dataTypes.SERVICES_CATEGORIES_COLLECTION,
    api: () => agent.ServiceCategories.all()
  }
})

export const fetchServices = () => ({
  type: FETCH_SERVICES,
  payload: {
    dataType: dataTypes.SERVICES_COLLECTION,
    api: () => agent.Services.all()
  }
})

export const fetchServicesByCategory = categoryId => ({
  type: FETCH_SERVICES_BY_CATEGORY,
  payload: {
    dataType: dataTypes.SERVICES_BY_CATEGORY_COLLECTION,
    api: () => agent.Services.byCategory(categoryId)
  }
})

export const fetchCategoryPage = (categoryId, dentistsIds) => ({
  type: FETCH_CATEGORY_PAGE,
  payload: {
    dataType: dataTypes.CATEGORY_PAGE_CONTENT,
    api: () =>
      Promise
        .all([
          agent.Services.byCategory(categoryId),
          Promise.all(dentistsIds.map(agent.Staff.byId))
        ])
        .then(([ services, dentists ]) => ({ services, dentists }))
  }
})


//=====================================
//  Specials
//-------------------------------------

export const FETCH_SPECIALS_SLIDES = 'FETCH_SPECIALS_SLIDES'
export const FETCH_SPECIALS_PAGE = 'FETCH_SPECIALS_PAGE'
export const FETCH_SPECIAL_ARTICLE = 'FETCH_SPECIAL_ARTICLE'

export const fetchSpecialsSlides = () => ({
  type: FETCH_SPECIALS_SLIDES,
  payload: {
    dataType: dataTypes.SPECIALS_SLIDES_COLLECTION,
    api: () => agent.Specials.cards()
  }
})

export const fetchSpecialsPage = pageNum => ({
  type: FETCH_SPECIALS_PAGE,
  payload: {
    dataType: dataTypes.SPECIALS_PREVIEWS_COLLECTION,
    api: () => agent.Specials.page(ITEMS_ON_PAGE, pageNum)
  }
})

export const fetchSpecialArticle = slug => ({
  type: FETCH_SPECIAL_ARTICLE,
  payload: {
    dataType: dataTypes.SPECIALS_ENTITY,
    api: () => agent.Specials.article(slug)
  }
})


//=====================================
//  News
//-------------------------------------

export const FETCH_NEWS_SLIDES = 'FETCH_NEWS_SLIDES'
export const FETCH_NEWS_PAGE = 'FETCH_NEWS_PAGE'
export const FETCH_NEWS_ARTICLE = 'FETCH_NEWS_ARTICLE'

export const fetchNewsSlides = () => ({
  type: FETCH_NEWS_SLIDES,
  payload: {
    dataType: dataTypes.NEWS_SLIDES_COLLECTION,
    api: () => agent.News.page(NEWS_IN_SLIDER, 1)
  }
})

export const fetchNewsPage = pageNum => ({
  type: FETCH_NEWS_PAGE,
  payload: {
    dataType: dataTypes.NEWS_PREVIEWS_COLLECTION,
    api: () => agent.News.page(ITEMS_ON_PAGE, pageNum)
  }
})

export const fetchNewsArticle = slug => ({
  type: FETCH_NEWS_ARTICLE,
  payload: {
    dataType: dataTypes.NEWS_ENTITY,
    api: () => agent.News.article(slug)
  }
})


//=====================================
//  Reviews
//-------------------------------------

export const FETCH_REVIEWS_SLIDES = 'FETCH_REVIEWS_SLIDES'
export const FETCH_REVIEWS_PAGE = 'FETCH_REVIEWS_PAGE'

export const fetchReviewsSlides = () => ({
  type: FETCH_REVIEWS_SLIDES,
  payload: {
    dataType: dataTypes.REVIEWS_SLIDES_COLLECTION,
    api: () => agent.Reviews.page(REVIEWS_SLIDES_TO_SHOW, 1)
  }
})

export const fetchReviewsPage = pageNum => ({
  type: FETCH_REVIEWS_PAGE,
  payload: {
    dataType: dataTypes.REVIEWS_COLLECTION,
    api: () => agent.Reviews.page(ITEMS_ON_PAGE, pageNum)
  }
})


//=====================================
//  Questions
//-------------------------------------

export const FETCH_QUESTIONS_PAGE = 'FETCH_QUESTIONS_PAGE'

export const fetchQuestionsPage = pageNum => ({
  type: FETCH_QUESTIONS_PAGE,
  payload: {
    dataType: dataTypes.QUESTIONS_COLLECTION,
    api: () => agent.Questions.page(ITEMS_ON_PAGE, pageNum)
  }
})


//=====================================
// Staff
//-------------------------------------

export const FETCH_DENTISTS_PAGE = 'FETCH_DENTISTS_PAGE'
export const FETCH_DENTIST_BY_ID = 'FETCH_DENTIST_BY_ID'
export const FETCH_DENTISTS_AS_OPTIONS = 'FETCH_DENTISTS_AS_OPTIONS'

export const fetchDentistsPage = pageNum => ({
  type: FETCH_DENTISTS_PAGE,
  payload: {
    dataType: dataTypes.DENTISTS_PREVIEWS_COLLECTION,
    api: () => agent.Staff.page(ITEMS_ON_PAGE, pageNum)
  }
})

export const fetchDentistById = id => ({
  type: FETCH_DENTIST_BY_ID,
  payload: {
    dataType: dataTypes.DENTISTS_ENTITY,
    api: () => agent.Staff.byId(id)
  }
})

export const fetchDentistsAsOptions = () => ({
  type: FETCH_DENTISTS_AS_OPTIONS,
  payload: {
    dataType: dataTypes.DENTISTS_OPTIONS_COLLECTION,
    api: () => agent.Staff.options()
  }
})


//=====================================
//  Appointment
//-------------------------------------

export const LOAD_APPOINTMENT_FORM = 'LOAD_APPOINTMENT_FORM'

export const loadAppointmentForm = () => ({
  type: LOAD_APPOINTMENT_FORM
})


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


export const pageReloadingActions = [
  FETCH_SERVICES_CATEGORIES,
  FETCH_SERVICES,
  FETCH_SERVICES_BY_CATEGORY,
  FETCH_CATEGORY_PAGE,
  FETCH_SPECIALS_SLIDES,
  FETCH_SPECIALS_PAGE,
  FETCH_SPECIAL_ARTICLE,
  FETCH_NEWS_SLIDES,
  FETCH_NEWS_PAGE,
  FETCH_NEWS_ARTICLE,
  FETCH_REVIEWS_SLIDES,
  FETCH_REVIEWS_PAGE,
  FETCH_DENTISTS_PAGE,
  FETCH_DENTIST_BY_ID,
  FETCH_QUESTIONS_PAGE
]

export const requestActions = [
  ...pageReloadingActions,
  FETCH_DENTISTS_AS_OPTIONS
]

export const actions = {
  APPOINTMENT_SUBMIT,
  CALLBACK_REQUEST,
  COUNT_PRICE,
  FETCH_SERVICES_CATEGORIES,
  FETCH_SERVICES_BY_CATEGORY,
  FETCH_SPECIALS_SLIDES,
  FETCH_SPECIALS_PAGE,
  FETCH_SPECIAL_ARTICLE,
  FETCH_NEWS_SLIDES,
  FETCH_NEWS_PAGE,
  FETCH_NEWS_ARTICLE,
  FETCH_NEWS_SLIDES,
  FETCH_REVIEWS_PAGE,
  FETCH_QUESTIONS_PAGE,
  FETCH_DENTISTS_PAGE,
  FETCH_DENTIST_BY_ID,
  FETCH_DENTISTS_AS_OPTIONS,
  PAGE_LOADING_START,
  DATA_RECEIVED
}
