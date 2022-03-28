import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import Main from './main'

import { getGoods } from '../redux/reducers/goods'

const Home = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getGoods())
  })

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
