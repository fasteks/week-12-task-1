import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import {
  changeCurrencyObj,
  sortCardsServer,
  sortGoodsServer,
  USD_CURRENCY,
  EUR_CURRENCY,
  CAD_CURRENCY
} from '../redux/reducers/goods'
import { SORT_BY_NAME, SORT_BY_PRICE } from '../../server/common/index'
import { MARKET } from './main'

const Header = (props) => {
  const dispatch = useDispatch()
  const { sum } = useSelector((s) => s.goods)
  const { order } = useSelector((s) => s.goods)
  const { products } = useSelector((s) => s.goods)
  const [isClickedPrice, setClickPrice] = useState(true)
  const [isClickedName, setClickName] = useState(false)
  const isUrl = props.title === MARKET
  return (
    <div className="flex flex-wrap justify-evenly items-center p-2 box-border text-lg font-semibold text-white bg-teal-600">
      {isUrl ? (
        <p className="">Green Market</p>
      ) : (
        <Link to="/" id="brand-name">
          Green Market
        </Link>
      )}
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
      <div className="flex items-center">
        Sort By:
        <button
          type="button"
          id="sort-price"
          className="mx-1 ml-2 p-1 hover:rounded-md hover:bg-lime-500 hover:scale-110 focus:rounded-md focus:bg-white focus:text-teal-800"
          onClick={() => {
            if (isClickedPrice) {
              setClickPrice(!isClickedPrice)
              setClickName(!isClickedName)

              dispatch(sortCardsServer(SORT_BY_PRICE))
              if (Object.keys(products).length !== 0) {
                dispatch(sortGoodsServer(SORT_BY_PRICE))
              }
            }
          }}
        >
          Price
        </button>
        |
        <button
          type="button"
          id="sort-name"
          className="mx-1 p-1 hover:rounded-md hover:bg-lime-500 hover:scale-110 focus:rounded-md focus:bg-white focus:text-teal-800"
          onClick={() => {
            if (isClickedName) {
              setClickName(!isClickedName)
              setClickPrice(!isClickedPrice)

              dispatch(sortCardsServer(SORT_BY_NAME))
              if (Object.keys(products).length !== 0) {
                dispatch(sortGoodsServer(SORT_BY_NAME))
              }
            }
          }}
        >
          Name
        </button>
      </div>
      {!isUrl ? (
        <div className="flex flex-col justify-evenly items-center w-40">
          <span>Order:</span>
          <div to="/basket" className="flex flex-col items-center text-yellow-300 group">
            <span
              id="order-count"
              className="text-xl font-bold group-hover:animate-spin duration-400 ease-in"
            >
              {order}
            </span>
          </div>
        </div>
      ) : (
        <Link
          to="/basket"
          id="order-count"
          className="flex items-start justify-evenly items-center w-40 group"
        >
          <p className="flex flex-col items-center">
            <span>Order:</span>
            <i
              className="fa fa-shopping-cart text-yellow-300 group-hover:translate-x-14 ease-in duration-200"
              style={{ fontSize: '28px' }}
            />
          </p>
          <p className="self-start w-7 -ml-1 text-lg text-yellow-300 group-hover:translate-y-5 ease-in duration-200">
            {order}
          </p>
        </Link>
      )}
      <p className="flex flex-col items-center">
        <span>Total cost:</span>
        <span>{sum}</span>
      </p>
    </div>
  )
}

Header.propTypes = {}

export default Header
