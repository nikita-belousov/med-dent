import { SERVICES_COLLECTION } from '../constants'
import { DATA_RECEIVED } from '../actions'


const formatData = data => data
  .reduce((res, serv) => {
    if (serv.category) {
      const { title, order } = serv.category
      const exists = res.find(e => e.title === title)
      if (exists) {
        exists.services.push(serv)
      } else {
        res.push({ id: order, title, services: [serv] })
      }
    }
    return res
  }, [])
  .sort((a, b) => a.id > b.id)


const getSidebarLinks = data => data
  .reduce((res, { title, id }) => [ ...res, { title, id } ], [])


export default (state = {}, action) => {
  switch (action.type) {
    case DATA_RECEIVED:
      let services = action.payload.data[SERVICES_COLLECTION]
      if (services) {
        services = formatData(services.docs)
        return {
          ...state,
          services,
          sidebarLinks: getSidebarLinks(services)
        }
      }
      return state
    default:
      return state
  }
}
