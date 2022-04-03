import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { changeCurrency, sortCards, sortGoods } from '../redux/reducers/goods'

const Header = (props) => {
  const dispatch = useDispatch()
  const { sum } = useSelector((s) => s.goods)
  const { order } = useSelector((s) => s.goods)
  const isUrl = props.title === 'Market'
  return (
    <div className="flex justify-evenly items-center w-full p-2 font-semibold text-white bg-teal-600">
      {isUrl ? (
        <p>Green Market</p>
      ) : (
        <Link to="/" id="brand-name">
          Green Market
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
        <button
          type="button"
          id="sort-price"
          className="mx-1 ml-2"
          onClick={() => {
            dispatch(sortGoods('price'))
            dispatch(sortCards('price'))
          }}
        >
          Price
        </button>
        |
        <button
          type="button"
          id="sort-name"
          className="mx-1"
          onClick={() => {
            dispatch(sortGoods('name'))
            dispatch(sortCards('name'))
          }}
        >
          Name
        </button>
      </div>
      {!isUrl ? (
        <div className="flex justify-evenly items-center w-32">
          <span>Order:</span>
          <div to="/basket" className="flex flex-col items-center text-yellow-300">
            <span id="order-count" className="text-base">
              {order}
            </span>
            <i className="fa fa-shopping-cart" style={{ fontSize: '32px' }} />
          </div>
        </div>
      ) : (
        <div className="flex justify-evenly items-center w-32">
          <span>Order:</span>
          <Link to="/basket" className="flex flex-col items-center text-yellow-300">
            <span id="order-count" className="text-base">
              {order}
            </span>
            <i className="fa fa-shopping-cart" style={{ fontSize: '32px' }} />
          </Link>
        </div>
      )}
      <p className="w-32">Total cost: {sum}</p>
    </div>
  )
}

Header.propTypes = {}

export default Header
