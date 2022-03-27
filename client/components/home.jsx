import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Main from './main'
import Profile from './profile'
import Repository from './repository'

const Home = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/:userName" component={Profile} />
          <Route exact path="/:userName/:repositoryName" component={Repository} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

Home.propTypes = {}

export default Home
