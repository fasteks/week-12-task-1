import axios from 'axios'

export const POST_LOGS = 'market/logs/POST_LOGS'
const DELETE_LOGS = 'market/logs/DELETE_LOGS'

const initialState = {
  logsList: []
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case POST_LOGS: {
      return {
        ...state,
        logsList: action.payload
      }
    }
    case DELETE_LOGS: {
      return {
        ...state,
        logsList: action.payload
      }
    }
    default:
      return state
  }
}

export function deleteLogs() {
  return async (dispatch) => {
    await axios
      .delete('/api/v1/logs')
      .then(() => {
        dispatch({ type: DELETE_LOGS, payload: [] })
      })
      .catch((err) => err)
  }
}
