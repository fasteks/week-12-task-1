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
  const { products } = useSelector((s) => s.goods)
  const isUrl = props.title === 'Market'
  return (
    <div className="flex flex-wrap justify-evenly items-center p-2 box-border text-lg font-semibold text-white bg-teal-600">
      {isUrl ? (
        <p className="">Green Market</p>
      ) : (
        <Link to="/" id="brand-name" className="">
          Green Market
        </Link>
      )}
      <div className="flex items-center">
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
            if (products.length !== 0) {
              dispatch(sortGoodsServer('price'))
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
            // dispatch(sortGoods('name'))
            // dispatch(sortCards('name'))
            dispatch(sortCardsServer('name'))
            if (products.length !== 0) {
              dispatch(sortGoodsServer('name'))
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
        <span>{sum}</span></p>
    </div>
  )
}

Header.propTypes = {}

export default Header
