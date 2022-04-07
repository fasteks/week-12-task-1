import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import goods from './goods'
import cards from './cards'
import settings from './settings'
import logs from './logs'

const createRootReducer = (history) => {
  return combineReducers({
    router: connectRouter(history),
    goods,
    cards,
    settings,
    logs
  })
}

export default createRootReducer
