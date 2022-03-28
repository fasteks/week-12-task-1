import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Main from './main'

const Home = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Main} />
      </Switch>
    </div>
  )
}

Home.propTypes = {}

export default Home
