import axios from 'axios'

const POST_LOGS = 'market/goods/POST_LOGS'
// const GET_LOGS = 'market/goods/GET_LOGS'

const initialState = {
  logsList: []
}

// 1. transfer logs to middleware
// https://redux.js.org/tutorials/fundamentals/part-4-store#middleware
// like this --->
//   function func() {
//   return ({ dispatch, getState }) =>
//     (next) =>
//     (action) => {
//       // if (typeof action === 'function') {
//       //  return action(dispatch, getState);
//       //}
//       // пиши шо хочешь сделать
//       return next(action)
//     }
// }
// 5. refactoring into table structure view

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case POST_LOGS: {
      return {
        ...state,
        logsList: action.payload
      }
    }
    // case GET_LOGS: {
    //   return {
    //     ...state,
    //     logsList: action.payload
    //   }
    // }
    default:
      return state
  }
}

// export function getLogs() {
//   return async (dispatch) => {
//     await axios({
//       method: 'get',
//       url: '/api/v1/logs'
//     }).then(({ data }) => {
//       dispatch({ type: GET_LOGS, payload: data })
//     })
//   }
// }

export function currencyLog(currency1, currency2) {
  return async (dispatch) => {
    const formattedDate = () => {
      const date = new Date().toISOString()
      return `${date.slice(0, 10)} ${date.slice(11, 19)}`
    }
    await axios({
      method: 'post',
      url: '/api/v1/logs',
      data: {
        action: `${formattedDate()} - change currency from ${currency1} to ${currency2}`
      }
    }).then(({ data }) => {
      dispatch({ type: POST_LOGS, payload: data })
    })
  }
}

export function addToBasketLog(title) {
  return async (dispatch) => {
    const formattedDate = () => {
      const date = new Date().toISOString()
      return `${date.slice(0, 10)} ${date.slice(11, 19)}`
    }
    await axios({
      method: 'post',
      url: '/api/v1/logs',
      data: {
        action: `${formattedDate()} - add ${title} to the backet`
      }
    }).then(({ data }) => {
      dispatch({ type: POST_LOGS, payload: data })
    })
  }
}

export function removeFromBasketLog(title) {
  return async (dispatch) => {
    const formattedDate = () => {
      const date = new Date().toISOString()
      return `${date.slice(0, 10)} ${date.slice(11, 19)}`
    }
    await axios({
      method: 'post',
      url: '/api/v1/logs',
      data: {
        action: `${formattedDate()} - remove ${title} from the backet`
      }
    }).then(({ data }) => {
      dispatch({ type: POST_LOGS, payload: data })
    })
  }
}

export function navigateToPageLog(url) {
  return async (dispatch) => {
    const formattedDate = () => {
      const date = new Date().toISOString()
      return `${date.slice(0, 10)} ${date.slice(11, 19)}`
    }
    await axios({
      method: 'post',
      url: '/api/v1/logs',
      data: {
        action: `${formattedDate()} - navigate to ${url} page`
      }
    }).then(({ data }) => {
      dispatch({ type: POST_LOGS, payload: data })
    })
  }
}

export function sortByLog(by) {
  return async (dispatch) => {
    const formattedDate = () => {
      const date = new Date().toISOString()
      return `${date.slice(0, 10)} ${date.slice(11, 19)}`
    }
    await axios({
      method: 'post',
      url: '/api/v1/logs',
      data: {
        action: `${formattedDate()} - sort by ${by}`
      }
    }).then(({ data }) => {
      dispatch({ type: POST_LOGS, payload: data })
    })
  }
}
