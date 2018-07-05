export const COMPANY_LOGO_URL = 'https://lh4.googleusercontent.com/qTY649PuvacuUixqRY5rd1Jam8Iauz_-lW0HS7qZd7ZJeHhzSutIndhFhJoEIwufSJyDF3aPpJ5PF1jZcWoz=w1366-h637'


export const apiRoot = host => `http://${host}/api`


export const QUESTIONS_ROOT = '/questions'
export const questions = () => QUESTIONS_ROOT
export const questionsPage = (itemsOnPage, pageNum) =>
  `${QUESTIONS_ROOT}/?_limit=${itemsOnPage}&_start=${(pageNum - 1) * itemsOnPage}&_sort=createdAt:desc`


export const REVIEWS_ROOT = '/reviews'
export const reviews = () => REVIEWS_ROOT
export const reviewsPage = (itemsOnPage, pageNum) =>
  `${REVIEWS_ROOT}/?_limit=${itemsOnPage}&_start=${(pageNum - 1) * itemsOnPage}&_sort=createdAt:desc`


export const SPECIALS_ROOT = '/specials'
export const specialsPreviews = () => `${SPECIALS_ROOT}/cards/?_sort=createdAt:desc`
export const specialsPage = (itemsOnPage, pageNum) =>
  `${SPECIALS_ROOT}/?_limit=${itemsOnPage}&_start=${(pageNum - 1) * itemsOnPage}&_sort=createdAt:desc`
export const specialArticle = slug => `${SPECIALS_ROOT}/${slug}`


export const DENTISTS_ROOT = '/staff'
export const dentistsOptions = () => `${DENTISTS_ROOT}/select_options`
export const dentistsPage = (itemsOnPage, pageNum) =>
  `${DENTISTS_ROOT}/?_limit=${itemsOnPage}&_start=${(pageNum - 1) * itemsOnPage}&_sort=createdAt:desc`
export const dentistBySlug = slug => `${DENTISTS_ROOT}/${slug}`


export const NEWS_ROOT = '/news'
export const newsPage = (itemsOnPage, pageNum) =>
  `${NEWS_ROOT}/?_limit=${itemsOnPage}&_start=${(pageNum - 1) * itemsOnPage}&_sort=createdAt:desc`
export const newsArticle = slug => `${NEWS_ROOT}/${slug}`


export const SERVICE_CATEGORIES_ROOT = '/service_categories'
export const serviceCategories = () => `${SERVICE_CATEGORIES_ROOT}`


export const SERVICES_ROOT = '/services'
export const servicesAll = () => `${SERVICES_ROOT}/?_sort=order`
export const servicesByCategory = categoryId =>
  `${SERVICES_ROOT}/?category=${categoryId}&_sort=order`


export const APPOINTMENT_ROOT = '/appointment'
export const appointmentRegister = () => `${APPOINTMENT_ROOT}`


export const COUNT_COST_ROOT = '/count_cost'
export const countCost = () => `${COUNT_COST_ROOT}`


export const CALLBACK_ROOT = '/callback'
export const callbackRequest = () => `${CALLBACK_ROOT}`
