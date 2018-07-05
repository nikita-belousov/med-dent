import { combineReducers } from 'redux'

import common from './common'
import header from './header'
import paginatedPage from './paginatedPage'
import articlePage from './articlePage'
import specialsSlider from './specialsSlider'
import newsSlider from './newsSlider'
import changingReviews from './changingReviews'
import pricelist from './pricelist'
import categoryPage from './categoryPage'
import appointment from './appointment'
import dentistPage from './dentistPage'

export default combineReducers({
  common,
  header,
  paginatedPage,
  articlePage,
  specialsSlider,
  newsSlider,
  changingReviews,
  pricelist,
  categoryPage,
  appointment,
  dentistPage
})
