import React, { useEffect } from 'react'
import { Switch, Route, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import Main from './main'
import Basket from './basket'

import Head from './head'
import Header from './header'

import { getCards, getRates } from '../redux/reducers/goods'

const Home = () => {
  const dispatch = useDispatch()
  const params = useParams()

  useEffect(() => {
    dispatch(getRates())
    setTimeout(() => {
      dispatch(getCards())
    }, 150)
  })

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
