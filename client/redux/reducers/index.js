import { combineReducers } from 'redux'

import goods from './goods'

const createRootReducer = () => {
  return combineReducers({
    goods
  })
}

export default createRootReducer
