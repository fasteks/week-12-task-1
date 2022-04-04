export const POST_LOGS = 'market/goods/POST_LOGS'

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
    default:
      return state
  }
}
