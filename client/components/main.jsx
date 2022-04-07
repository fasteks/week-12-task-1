import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Header from './header'
import Table from './table'

import { getCards, getRates, EUR_CURRENCY } from '../redux/reducers/goods'

export const MARKET = 'Market'

const Main = () => {
  const dispatch = useDispatch()
  const { cards } = useSelector((s) => s.goods)
  const { rates } = useSelector((s) => s.goods)
  useEffect(() => {
    if (!rates[EUR_CURRENCY]) {
      dispatch(getRates())
    }
    if (cards.length === 0) {
      setTimeout(() => {
        dispatch(getCards())
      }, 150)
    }
  }, [])

  return (
    <div className="min-h-screen bg-green-100">
      <Header title={MARKET} />
      <div className="flex flex-col items-center h-full">
        <Table />
      </div>
    </div>
  )
}

export default React.memo(Main)
