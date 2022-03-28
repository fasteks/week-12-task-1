import { combineReducers } from 'redux'

import user from './user'

const createRootReducer = () => {
  return combineReducers({
    user
  })
}

export default createRootReducer
