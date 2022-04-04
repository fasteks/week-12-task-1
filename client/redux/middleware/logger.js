import axios from 'axios'

import { POST_LOGS } from '../reducers/logs'
import { CHANGE_CURRENCY } from '../reducers/goods'

const formattedDate = () => {
  const date = new Date().toISOString()
  return `${date.slice(0, 10)} ${date.slice(11, 19)}`
}

export function logger() {
  return (store) => {
    const { dispatch, getState } = store
    return (next) => {
      return (action) => {
        const { currency } = getState().goods
        if (action.type === CHANGE_CURRENCY) {
          console.log('inside CHANGE_CURRENCY action')
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

        console.log('outside of any type of action')
        return next(action)
      }
    }
  }
}

// export function logs(storeApi) {
//   return function wrapDispatch(next) {
//     return function handleAction(action) {
//       return next(action)
//     }
//   }
// }

export function func() {
  return (dispatch, getState) => {
    return (next) => {
      return (action) => {
        if (typeof action === 'function') {
          return action(dispatch, getState)
        }
        // пиши шо хочешь сделать
        return next(action)
      }
    }
  }
}
