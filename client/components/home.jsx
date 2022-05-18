import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Main from './main/main'
import Basket from './basket/basket'

import Head from './head'

const Home = (props) => {
  return (
    <div className="h-screen">
      <Head title={props.location.pathname} />
      <Switch>
        <Route exact path="/main" component={Main} />
        <Route exact path="/:basket" component={Basket} />
      </Switch>
    </div>
  )
}

Home.propTypes = {}

export default Home
