import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { MARKET } from '../main/main'

const Order = (props) => {
  const { order } = useSelector((s) => s.goods)
  const isUrl = props.title === MARKET
  return (
    <div>
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
    </div>
  )
}

Order.propTypes = {}

export default Order
