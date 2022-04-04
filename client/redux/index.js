import { createStore, compose, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import logger from './middleware/logger'

import createRootReducer from './reducers'

const middleware = [logger(), thunk]
const initialState = {}

const composeFunc = process.env.NODE_ENV === 'development' ? composeWithDevTools : compose
const composeEnchanters = composeFunc(applyMiddleware(...middleware))
const store = createStore(createRootReducer(), initialState, composeEnchanters)

export default store
