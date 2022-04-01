import React from 'react'
import { Switch, Route, useParams } from 'react-router-dom'

import Main from './main'
import Basket from './basket'

import Head from './head'
import Header from './header'

const Home = () => {
  const params = useParams()

  return (
    <>
      <Head title={params.basket || 'Main'} />
      <Header title={params.basket || 'Main'} />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/:basket" component={Basket} />
      </Switch>
    </>
  )
}

Home.propTypes = {}

export default Home
