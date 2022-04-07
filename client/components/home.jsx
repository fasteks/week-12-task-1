import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Main from './main'
import Basket from './basket'

import Head from './head'

const Home = (props) => {
  return (
    <div className="min-h-screen">
      <Head title={props.location.pathname} />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/:basket" component={Basket} />
      </Switch>
    </div>
  )
}

Home.propTypes = {}

export default Home
