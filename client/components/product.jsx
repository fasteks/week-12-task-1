import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromBusket } from '../redux/reducers/goods'

const Product = (props) => {
  const dispatch = useDispatch()
  const { product } = props
  const productList = useSelector((s) => s.goods.products)
  const filteredList = productList
  return (
    <div className="product flex flex-col items-center justify-between p-2 m-2 bg-lime-100 border-2 rounded-lg border-lime-600">
      <img className="product__image" src={product.image} alt={product.description} />
      <p className="product__title text-center font-bold">{product.title}</p>
      <p className="product__price">Price for one: {product.price}</p>
      <p className="product__amount">Quantity in Basket: {product.count}</p>
      <p className="product__total_price">Total for products: 4</p>
      <button
        type="button"
        className="product__remove w-full p-1 mt-1 rounded-md bg-rose-500 text-white"
        onClick={() => {
          dispatch(removeFromBusket(filteredList))
        }}
      >
        Delete Product
      </button>
    </div>
  )
}

Product.propTypes = {}

export default Product
