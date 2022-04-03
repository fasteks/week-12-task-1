import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Cards from './cards'

import { getCards, getRates } from '../redux/reducers/goods'

const Main = () => {
  const dispatch = useDispatch()
  const { cards } = useSelector((s) => s.goods)
  const { rates } = useSelector((s) => s.goods)
  const EUR = 'EUR'
  useEffect(() => {
    if (!rates[EUR]) {
      dispatch(getRates())
    }
    if (cards.length === 0) {
      setTimeout(() => {
        dispatch(getCards())
      }, 150)
    }
  }, [])

  return (
    <div className="flex flex-wrap justify-evenly h-full bg-green-100">
      <Cards />
    </div>
  )
}

export default React.memo(Main)
