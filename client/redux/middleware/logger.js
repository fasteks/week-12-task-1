import axios from 'axios'
import { LOCATION_CHANGE } from 'connected-react-router'

import { POST_LOGS } from '../reducers/logs'
import { CHANGE_CURRENCY, ADD_TO_BASKET, REMOVE_FROM_BASKET, SORT_CARDS } from '../reducers/goods'

const Logger = () => {
  return (store) => {
    const { dispatch, getState } = store
    return (next) => {
      return (action) => {
        const formattedDate = () => {
          const date = new Date().toISOString()
          return `${date.slice(0, 10)} ${date.slice(11, 19)}`
        }
        const postLog = (message) => {
          axios({
            method: 'post',
            url: '/api/v1/logs',
            data: {
              log: message
            }
          })
            .then(({ data }) => {
              dispatch({ type: POST_LOGS, payload: data })
            })
            .catch((e) => console.log(e))
        }
        switch (action.type) {
          case CHANGE_CURRENCY: {
            const { currency } = getState().goods
            postLog(`${formattedDate()} - change currency from ${currency} to ${action.curren}`)
            break
          }
          case ADD_TO_BASKET: {
            postLog(`${formattedDate()} - add ${action.cardTitle} to the basket`)
            break
          }
          case REMOVE_FROM_BASKET: {
            postLog(`${formattedDate()} - remove ${action.productTitle} from the backet`)
            break
          }
          case SORT_CARDS: {
            postLog(`${formattedDate()} - sort by ${action.sort}`)
            break
          }
          case LOCATION_CHANGE: {
            const url =
              action.payload.location.pathname === '/' ? '/main' : action.payload.location.pathname
            postLog(`${formattedDate()} - navigate to ${url} page`)
            break
          }
          default:
            return next(action)
        }
        return next(action)
      }
    }
  }
}

export default Logger()
