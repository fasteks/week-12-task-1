import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import { setCurrency } from '../redux/reducers/goods'

const Header = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const productsList = useSelector((s) => s.goods.products)
  // const getCurrency = useSelector((s) => s.goods.currency)
  // const getRates = useSelector((s) => s.goods.rates)
  // let totalSum = useSelector((s) => s.goods.sum) * getRates[getCurrency]
  const totalSum = useSelector((s) => s.goods.sum)
  const totalSumFixed = totalSum.toFixed(2)
  const isUrl = params[0].length === 0
  const orderCount =
    productsList.length === 0 ? 0 : productsList.reduce((acc, rec) => acc + rec.count, 0)
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
            dispatch(setCurrency('USD'))
          }}
        >
          USD
        </button>
        <button
          type="button"
          className="mx-1"
          onClick={() => {
            dispatch(setCurrency('EUR'))
          }}
        >
          EUR
        </button>
        <button
          type="button"
          className="mx-1"
          onClick={() => {
            dispatch(setCurrency('CAD'))
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
        <button type="button" id="sort-name" className="mx-1">
          Name
        </button>
      </div>
      {!isUrl ? (
        <span id="order-count">Order: {orderCount}</span>
      ) : (
        <Link to="/basket">
          <span id="order-count">Order: {orderCount}</span>
        </Link>
      )}
      <p>Total cost: {totalSumFixed}</p>
    </div>
  )
}

Header.propTypes = {}

export default Header
