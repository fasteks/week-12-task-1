import { combineReducers } from 'redux'

import user from './current-user'

const createRootReducer = () => combineReducers({ user })

export default createRootReducer
