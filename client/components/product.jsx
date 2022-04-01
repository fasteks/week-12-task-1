import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromBusket } from '../redux/reducers/goods'

const Product = (props) => {
  const dispatch = useDispatch()
  const { product } = props
  const { products, currency } = useSelector((s) => s.goods)
  const removeProductArr =
    product.count === 1
      ? products.filter((el) => el.count !== 1)
      : products.map((obj) => {
          if (obj.id === product.id) {
            const decrease = +obj.count - 1
            return { ...obj, count: decrease }
          }
          return obj
      })

  return (
    <div className="product flex flex-col items-center justify-between p-2 m-2 bg-lime-100 border-2 rounded-lg border-lime-600">
      <img className="product__image" src={product.image} alt={product.description} />
      <p className="product__title text-center font-bold">{product.title}</p>
      <p className="product__price">Price for one: {product.price[currency]}</p>
      <p className="product__amount">Quantity in Basket: {product.count}</p>
      <p className="product__total_price">Total for products: {product.totalPriceForProducts[currency]}</p>
      <button
        type="button"
        className="product__remove w-full p-1 mt-1 rounded-md bg-rose-500 text-white"
        onClick={() => {
          dispatch(removeFromBusket(removeProductArr))
        }}
      >
        Delete Product
      </button>
    </div>
  )
}

Product.propTypes = {}

export default Product
