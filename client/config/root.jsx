import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'

import store, { history } from '../redux'

import Home from '../components/home'
import NotFound from '../components/404'

const RootComponent = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/*" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  )
}

export default RootComponent
