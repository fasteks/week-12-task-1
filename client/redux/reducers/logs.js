import axios from 'axios'

const POST_LOGS = 'market/goods/POST_LOGS'
const GET_LOGS = 'market/goods/GET_LOGS'

const initialState = {
  logsList: []
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case POST_LOGS: {
      return {
        ...state,
        logsList: [...state.logsList, ...action.payload]
      }
    }
    case GET_LOGS: {
      return {
        ...state,
        logsList: action.payload
      }
    }
    default:
      return state
  }
}

export function getLogs() {
  return async (dispatch) => {
    await axios({
      method: 'get',
      url: '/api/v1/logs'
    }).then(({ data }) => {
      dispatch({ type: GET_LOGS, payload: data })
    })
  }
}

export function currencyLogs(currency1, currency2) {
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
