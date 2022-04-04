import { createBrowserHistory } from 'history'
import { createStore, compose, applyMiddleware } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import createRootReducer from './reducers'

import Logger from './middleware/logger'

export const history = createBrowserHistory()

const middleware = [routerMiddleware(history), Logger, thunk]
const initialState = {}

const composeFunc = process.env.NODE_ENV === 'development' ? composeWithDevTools : compose
const composeEnchanters = composeFunc(applyMiddleware(...middleware))

const store = createStore(createRootReducer(history), initialState, composeEnchanters)

export default store
