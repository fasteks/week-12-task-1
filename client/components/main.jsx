import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Cards from './cards'

import { getCards, getRates } from '../redux/reducers/goods'

const Main = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getRates())
    setTimeout(() => {
      dispatch(getCards())
    }, 150)
  })

  return (
    <div className="flex flex-wrap justify-evenly h-full">
      <Cards />
    </div>
  )
}

Main.propTypes = {}

export default Main
