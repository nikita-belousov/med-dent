import superagentPromise from 'superagent-promise'
import _superagent from 'superagent'

import { apiRoot as _apiRoot } from './constants/urls'
import { questions, questionsAll, questionsPage } from './constants/urls'
import { reviews, reviewsAll, reviewsPage } from './constants/urls'
import { newsArticle, newsPage } from './constants/urls'
import { specialsPreviews, specialsPage, specialArticle } from './constants/urls'
import { dentistsPage, dentistsOptions, dentistBySlug } from './constants/urls'
import { serviceCategories } from './constants/urls'
import { servicesAll, servicesByCategory } from './constants/urls'
import { appointmentRegister } from './constants/urls'
import { countCost } from './constants/urls'
import { callbackRequest } from './constants/urls'


const superagent = superagentPromise(_superagent, global.Promise);

const host = process.env.NODE_ENV === 'production'
  ? '159.65.196.245'
  : 'localhost:8080'

const apiRoot = _apiRoot(host)

const token = null
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`)
  }
}

const getBody = res => res.body

const requests = {
  del: url =>
    superagent.del(`${apiRoot}${url}`).use(tokenPlugin).then(getBody),
  get: url =>
    superagent.get(`${apiRoot}${url}`).use(tokenPlugin).then(getBody),
  put: (url, body) =>
    superagent.put(`${apiRoot}${url}`, body).use(tokenPlugin).then(getBody),
  post: (url, body) =>
    superagent.post(`${apiRoot}${url}`, body).use(tokenPlugin).then(getBody)
}


//=====================================
//  APIs
//-------------------------------------

export const reviewsApi = {
  all: () => {
    const url = reviews()
    return { api: () => requests.get(url), url }
  },
  page: (itemsOnPage, page) => {
    const url = reviewsPage(itemsOnPage, page)
    return { api: () => requests.get(url), url }
  },
  submit: () => {
    const url = reviews()
    return { api: data => requests.post(url, data), url }
  }
}


export const dentistsApi = {
  page: (itemsOnPage, page) => {
    const url = dentistsPage()
    return { api: () => requests.get(url), url }
  },
  options: () => {
    const url = dentistsOptions()
    return { api: () => requests.get(url), url }
  },
  bySlug: slug => {
    const url = dentistBySlug(slug)
    return { api: () => requests.get(url), url }
  }
}


export const questionsApi = {
  all: () => {
    const url = questions()
    return { api: () => requests.get(url), url }
  },
  page: (itemsOnPage, pageNum = 0) => {
    const url = questionsPage(itemsOnPage, pageNum)
    return { api: () => requests.get(url), url }
  },
  submit: () => {
    const url = questions()
    return { api: data => requests.post(url, data), url }
  }
}


export const specialsApi = {
  previews: () => {
    const url = specialsPreviews()
    return { api: () => requests.get(url), url }
  },
  page: (itemsOnPage, pageNum) => {
    const url = specialsPage(itemsOnPage, pageNum)
    return { api: () => requests.get(url), url }
  },
  article: slug => {
    const url = specialArticle(slug)
    return { api: () => requests.get(url), url }
  }
}


export const newsApi = {
  page: (itemsOnPage, pageNum) => {
    const url = newsPage(itemsOnPage, pageNum)
    return { api: () => requests.get(url), url }
  },
  article: slug => {
    const url = newsArticle(slug)
    return { api: () => requests.get(url), url }
  }
}


export const serviceCategoriesApi = {
  all: () => {
    const url = serviceCategories()
    return { api: () => requests.get(url), url }
  }
}

export const servicesApi = {
  all: () => {
    const url = servicesAll()
    return { api: () => requests.get(url), url }
  },
  byCategory: categoryId => {
    const url = servicesByCategory(categoryId)
    return { api: () => requests.get(url), url }
  }
}


export const appointmentApi = {
  submit: () => {
    const url = appointmentRegister()
    return { api: data => requests.post(url, data) }
  }
}


export const countCostApi = {
  submit: () => {
    const url = countCost()
    return { api: data => requests.post(url, data) }
  }
}


export const callbackApi = {
  submit: () => {
    const url = callbackRequest()
    return { api: data => requests.post(url, data) }
  }
}


export default {
  reviewsApi,
  dentistsApi,
  questionsApi,
  newsApi,
  specialsApi,
  serviceCategoriesApi,
  servicesApi,
  appointmentApi,
  countCostApi,
  callbackApi
}
