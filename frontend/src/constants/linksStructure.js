export const HOME = 'home'
export const SERVICES = 'services'
export const DENTISTS = 'dentists'
export const NEWS = 'news'
export const SPECIALS = 'specials'


export default {
  [HOME]: {
    title: 'Главная',
    path: '/'
  },
  [SERVICES]: {
    title: 'Услуги и цены',
    path: '/pricelist',
    parent: HOME
  },
  [DENTISTS]: {
    title: 'Наши врачи',
    pageTitle: 'Наши врачи',
    path: '/staff',
    parent: HOME
  },
  [NEWS]: {
    title: 'Новости',
    path: '/news',
    parent: HOME
  },
  [SPECIALS]: {
    title: 'Акции',
    pageTitle: 'Акции и специальные предложения',
    path: '/specials',
    parent: HOME
  }
}
