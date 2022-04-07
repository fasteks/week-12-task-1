import React from 'react'
import { Switch, Route, useParams } from 'react-router-dom'

import Main from './main/main'
import Basket from './basket/basket'

import Head from './head'

const Home = () => {
  const params = useParams()

  return (
    <div className="h-screen">
      <Head title={params[0] === '' ? 'Market' : 'Basket'} />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/:basket" component={Basket} />
      </Switch>
    </div>
  )
}

Home.propTypes = {}

export default Home
