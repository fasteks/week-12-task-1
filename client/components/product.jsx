import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromBusketObj } from '../redux/reducers/goods'

const Product = (props) => {
  const dispatch = useDispatch()
  const { product } = props
  const { currency } = useSelector((s) => s.goods)

  return (
    <div className="product flex flex-col items-center justify-between w-64 h-96 p-2 m-2 bg-yellow-200 border-2 rounded-lg border-lime-600">
      <img className="product__image" src={product.image} alt={product.description} />
      <p className="product__title h-14 text-center font-bold">{product.title}</p>
      <p className="product__price">
        Price for one: {product.priceCurrency} {currency}
      </p>
      <p className="product__amount">Quantity in Basket: {product.count}</p>
      <p className="product__total_price">Total for products: {product.totalCurrencyPrice}</p>
      <button
        type="button"
        className="product__remove w-full p-1 mt-1 rounded-md bg-rose-500 text-white"
        onClick={() => {
          dispatch(removeFromBusketObj(product))
        }}
      >
        Delete Product
      </button>
    </div>
  )
}

Product.propTypes = {}

export default Product
