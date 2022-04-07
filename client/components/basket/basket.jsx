import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { deleteLogs } from '../../redux/reducers/logs'

import Header from '../header/header'
import Products from './products'

export const BASKET = 'Basket'

const Basket = () => {
  const dispatch = useDispatch()
  const { sum } = useSelector((s) => s.goods)
  return (
    <div className="flex flex-col justify-between min-h-screen bg-green-100">
      <Header title={BASKET} />
      <div className="flex flex-col items-center">
        <Products />
      </div>
      <p
        id="total-amount"
        className="flex justify-between p-5 box-border text-lg text-white font-semibold bg-teal-600"
      >
        <span className="invisible text-xs font-thin">Hidden Logs</span>
        <span>Total cost: {sum}</span>
        <button
          type="button"
          className="text-xs font-thin"
          onClick={() => {
            dispatch(deleteLogs())
          }}
        >
          Delete Logs
        </button>
      </p>
    </div>
  )
}

Basket.propTypes = {}

export default Basket
