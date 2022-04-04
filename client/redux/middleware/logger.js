import axios from 'axios'

import { POST_LOGS } from '../reducers/logs'
import { CHANGE_CURRENCY, ADD_TO_BASKET, REMOVE_FROM_BASKET, SORT_CARDS } from '../reducers/goods'

const formattedDate = () => {
  const date = new Date().toISOString()
  return `${date.slice(0, 10)} ${date.slice(11, 19)}`
}

export default () => {
  return (store) => {
    const { dispatch, getState } = store
    return (next) => {
      return (action) => {
        if (action.type === CHANGE_CURRENCY) {
          const { currency } = getState().goods
          axios({
            method: 'post',
            url: '/api/v1/logs',
            data: {
              log: `${formattedDate()} - change currency from ${currency} to ${action.curren}`
            }
          }).then(({ data }) => {
            dispatch({ type: POST_LOGS, payload: data })
          })
        }
        if (action.type === ADD_TO_BASKET) {
          axios({
            method: 'post',
            url: '/api/v1/logs',
            data: {
              log: `${formattedDate()} - add ${action.cardTitle} to the basket`
            }
          }).then(({ data }) => {
            dispatch({ type: POST_LOGS, payload: data })
          })
        }
        if (action.type === REMOVE_FROM_BASKET) {
          axios({
            method: 'post',
            url: '/api/v1/logs',
            data: {
              log: `${formattedDate()} - remove ${action.productTitle} from the backet`
            }
          }).then(({ data }) => {
            dispatch({ type: POST_LOGS, payload: data })
          })
        }
        if (action.type === SORT_CARDS) {
          axios({
            method: 'post',
            url: '/api/v1/logs',
            data: {
              log: `${formattedDate()} - sort by ${action.sort}`
            }
          }).then(({ data }) => {
            dispatch({ type: POST_LOGS, payload: data })
          })
        }
        // if (action.type === 1) {
        //   axios({
        //     method: 'post',
        //     url: '/api/v1/logs',
        //     data: {
        //       log: `${formattedDate()} - navigate to ${1} page`
        //     }
        //   }).then(({ data }) => {
        //     dispatch({ type: POST_LOGS, payload: data })
        //   })
        // }
        return next(action)
      }
    }
  }
}
