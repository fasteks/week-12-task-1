import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import Main from './main'
import Basket from './basket'

import { getGoods } from '../redux/reducers/goods'

const Home = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getGoods())
  })

  return (
    <div>
      {/* <Head title="Main" />
      <Header title="Main" /> */}
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/:basket" component={Basket} />
      </Switch>
    </div>
  )
}

Home.propTypes = {}

export default Home
