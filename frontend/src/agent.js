import superagentPromise from 'superagent-promise'
import _superagent from 'superagent'

const superagent = superagentPromise(_superagent, global.Promise);

const ROOT = process.env.NODE_ENV === 'production'
  ? '188.166.23.34'
  : 'localhost:8080'

const API_ROOT = `http://${ROOT}/api`

const getBody = res => res.body

const token = null
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`)
  }
}

const requests = {
  del: url =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(getBody),
  get: url =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(getBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(getBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(getBody)
}

const pageQuery = (count, page = 0) => `_limit=${count}&_start=${(page - 1) * count}`

export const Reviews = {
  all: () =>
    requests.get('/reviews'),
  page: (itemsOnPage, page) =>
    requests.get(`/reviews/?${pageQuery(itemsOnPage, page)}&isPublished=true&_sort=createdAt:desc`)
}

export const Staff = {
  all: () =>
    requests.get('/staff'),
  page: (itemsOnPage, page) =>
    requests.get(`/staff/?${pageQuery(itemsOnPage, page)}`),
  byId: id =>
    requests.get(`/staff/${id}`),
  options: () =>
    requests.get('/staff/selectOptions')
}

export const Questions = {
  create: data =>
    requests.post('/questions', data),
  all: () =>
    requests.get('/questions'),
  page: (itemsOnPage, page) =>
    requests.get(`/questions/?${pageQuery(itemsOnPage, page)}&_sort=createdAt:desc`)
}

export const Specials = {
  all: () =>
    requests.get('/specials/?_sort=createdAt:desc'),
  cards: () =>
    requests.get('/specials/cards/?_sort=createdAt:desc'),
  page: (itemsOnPage, page) =>
    requests.get(`/specials/?${pageQuery(itemsOnPage, page)}&_sort=createdAt:desc`),
  article: slug =>
    requests.get(`/specials/${slug}`)
}

export const News = {
  all: () =>
    requests.get('/news'),
  page: (itemsOnPage, page) =>
    requests.get(`/news/?${pageQuery(itemsOnPage, page)}&_sort=createdAt:desc`),
  article: slug =>
    requests.get(`/news/${slug}`)
}


export const ServiceCategories = {
  all: () =>
    requests.get('/service_categories')
}

export const Services = {
  all: () =>
    requests.get('/services'),
  byCategory: id =>
    requests.get(`/services/?category=${id}&_sort=order`)
}

export default {
  Reviews,
  Staff,
  Questions,
  News,
  Specials,
  ServiceCategories,
  Services
}
