import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Main from './main'
import Profile from './profile'
import Repository from './repository'

const Home = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/:userName" component={Profile} />
        <Route exact path="/:userName/:repositoryName" component={Repository} />
      </Switch>
    </div>
  )
}

Home.propTypes = {}

export default React.memo(Home)
