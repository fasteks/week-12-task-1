import React, { useEffect } from 'react'
import { Switch, Route, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { navigateToPageLog } from '../redux/reducers/logs'

import Main from './main'
import Basket from './basket'

import Head from './head'
import Header from './header'

const Home = () => {
  const params = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(navigateToPageLog(params[0] || 'main'))
  }, [params])

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
