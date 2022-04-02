import { combineReducers } from 'redux'

import goods from './goods'
import logs from './logs'

const createRootReducer = () => {
  return combineReducers({
    goods,
    logs
  })
}

export default createRootReducer
