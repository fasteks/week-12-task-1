import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import { changeCurrency } from '../redux/reducers/goods'

const Header = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const { currency, sum, order } = useSelector((s) => s.goods)
  const isUrl = params[0].length === 0
  return (
    <div className="flex justify-evenly items-center bg-teal-600 p-5 font-semibold text-white">
      {isUrl ? (
        <p>Main</p>
      ) : (
        <Link to="/" id="brand-name">
          Main
        </Link>
      )}
      <div>
        <button
          type="button"
          className="mx-1"
          onClick={() => {
            dispatch(changeCurrency('USD'))
          }}
        >
          USD
        </button>
        |
        <button
          type="button"
          className="mx-1"
          onClick={() => {
            dispatch(changeCurrency('EUR'))
          }}
        >
          EUR
        </button>
        |
        <button
          type="button"
          className="mx-1"
          onClick={() => {
            dispatch(changeCurrency('CAD'))
          }}
        >
          CAD
        </button>
      </div>
      <div className="flex">
        Sort By:
        <button type="button" id="sort-price" className="mx-1 ml-2">
          Price
        </button>
        |
        <button type="button" id="sort-name" className="mx-1">
          Name
        </button>
      </div>
      {!isUrl ? (
        <span id="order-count">Order: {order}</span>
      ) : (
        <Link to="/basket">
          <span id="order-count">Order: {order}</span>
        </Link>
      )}
      <p>Total cost: {sum[currency]}</p>
    </div>
  )
}

Header.propTypes = {}

export default Header
