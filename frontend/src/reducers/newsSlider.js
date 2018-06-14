import { NEWS_SLIDES_COLLECTION } from '../constants'
import { DATA_RECEIVED } from '../actions'


export default (state = {}, action) => {
  switch (action.type) {
    case DATA_RECEIVED:
      const news = action.payload.data[NEWS_SLIDES_COLLECTION]
      if (news) {
        return {
          ...state,
          news: news.docs
        }
      }
      return state
    default:
      return state
  }
}
