import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import goods from './goods'
import logs from './logs'

const createRootReducer = (history) => {
  return combineReducers({
    router: connectRouter(history),
    goods,
    logs
  })
}

export default createRootReducer
