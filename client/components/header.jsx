import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

// import { changeCurrency, sortCards, sortGoods, sortCardsServer } from '../redux/reducers/goods'
// import { changeCurrency, sortGoods, sortCardsServer, sortGoodsServer } from '../redux/reducers/goods'
import { changeCurrency, sortCardsServer, sortGoodsServer } from '../redux/reducers/goods'

const Header = (props) => {
  const dispatch = useDispatch()
  const { sum } = useSelector((s) => s.goods)
  const { order } = useSelector((s) => s.goods)
  const isUrl = props.title === 'Market'
  return (
    <div className="flex justify-evenly items-center min-h-56px p-2 text-lg font-semibold text-white bg-teal-600">
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
          className="mx-1 p-1 hover:rounded-md hover:bg-lime-500 hover:scale-110 focus:rounded-md focus:bg-white focus:text-teal-800"
          onClick={() => {
            dispatch(changeCurrency('USD'))
          }}
        >
          USD
        </button>
        |
        <button
          type="button"
          className="mx-1 p-1 hover:rounded-md hover:bg-lime-500 hover:scale-110 focus:rounded-md focus:bg-white focus:text-teal-800"
          onClick={() => {
            dispatch(changeCurrency('EUR'))
          }}
        >
          EUR
        </button>
        |
        <button
          type="button"
          className="mx-1 p-1 hover:rounded-md hover:bg-lime-500 hover:scale-110 focus:rounded-md focus:bg-white focus:text-teal-800"
          onClick={() => {
            dispatch(changeCurrency('CAD'))
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
            // dispatch(sortGoods('price'))
            // dispatch(sortCards('price'))
            dispatch(sortCardsServer('price'))
            dispatch(sortGoodsServer('price'))
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
            // dispatch(sortGoods('name'))
            // dispatch(sortCards('name'))
            dispatch(sortCardsServer('name'))
            dispatch(sortGoodsServer('name'))
          }}
        >
          Name
        </button>
      </div>
      {!isUrl ? (
        <div className="flex flex-col justify-evenly items-center w-36">
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
          className="flex items-start justify-evenly items-center w-36 group"
        >
          <p className="flex flex-col items-center">
            <span>Order:</span>
            <i
              className="fa fa-shopping-cart text-yellow-300 group-hover:translate-x-11 ease-in duration-200"
              style={{ fontSize: '28px' }}
            />
          </p>
          <p className="self-start -mt-0.5 -ml-4 text-xl text-yellow-300 group-hover:translate-y-5 ease-in duration-200">
            {order}
          </p>
        </Link>
      )}
      <p className="w-36">Total cost: {sum}</p>
    </div>
  )
}

Header.propTypes = {}

export default Header
