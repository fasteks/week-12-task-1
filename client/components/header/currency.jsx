import React from 'react'
import { useDispatch } from 'react-redux'

import {
  changeCurrencyObj,
  USD_CURRENCY,
  EUR_CURRENCY,
  CAD_CURRENCY
} from '../../redux/reducers/settings'

const Currency = () => {
  const dispatch = useDispatch()
  return (
    <div className="flex items-center">
      <button
        type="button"
        className="mx-1 p-1 hover:rounded-md hover:bg-lime-500 hover:scale-110 focus:rounded-md focus:bg-white focus:text-teal-800"
        onClick={() => {
          dispatch(changeCurrencyObj(USD_CURRENCY))
        }}
      >
        USD
      </button>
      |
      <button
        type="button"
        className="mx-1 p-1 hover:rounded-md hover:bg-lime-500 hover:scale-110 focus:rounded-md focus:bg-white focus:text-teal-800"
        onClick={() => {
          dispatch(changeCurrencyObj(EUR_CURRENCY))
        }}
      >
        EUR
      </button>
      |
      <button
        type="button"
        className="mx-1 p-1 hover:rounded-md hover:bg-lime-500 hover:scale-110 focus:rounded-md focus:bg-white focus:text-teal-800"
        onClick={() => {
          dispatch(changeCurrencyObj(CAD_CURRENCY))
        }}
      >
        CAD
      </button>
    </div>
  )
}

Currency.propTypes = {}

export default Currency
