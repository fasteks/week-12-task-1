import { createStore, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import createRootReducer from './reducers'

const initialState = {}

const composeFunc = process.env.NODE_ENV === 'development' ? composeWithDevTools : compose
const composeEnchanters = composeFunc()
const store = createStore(createRootReducer(), initialState, composeEnchanters)

export default store
