import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from '../components/home'
import NotFound from '../components/404'

const RootComponent = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/*" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default RootComponent
