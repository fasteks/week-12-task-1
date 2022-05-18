import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Header from '../header/header'
import Table from './table'

import { getCards } from '../../redux/reducers/cards'
import { getRates, EUR_CURRENCY } from '../../redux/reducers/settings'

export const MARKET = 'Market'

const Main = () => {
  const dispatch = useDispatch()
  const { cards } = useSelector((s) => s.cards)
  const { rates } = useSelector((s) => s.settings)



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
    <>
      <Header title={MARKET} />
      <div className="flex flex-col items-center h-full bg-green-100">
        <Table />
      </div>
    </>
  )
}

export default React.memo(Main)
