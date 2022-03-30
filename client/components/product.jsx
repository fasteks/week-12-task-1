import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromBusket, getSum } from '../redux/reducers/goods'

const Product = (props) => {
  const dispatch = useDispatch()
  const { product } = props
  const productList = useSelector((s) => s.goods.products)
  const getCurrency = useSelector((s) => s.goods.currency)
  const getRates = useSelector((s) => s.goods.rates)
  let totalSum = useSelector((s) => s.goods.sum) * getRates[getCurrency]
  totalSum = totalSum.toFixed(2)
  const setPrice = product.price * getRates[getCurrency]
  let sumForProduct = product.count * setPrice
  sumForProduct = sumForProduct.toFixed(2)
  const removeProductArr =
    product.count === 1
      ? productList.filter((el) => el.count !== 1)
      : productList.map((obj) => {
          if (obj.id === product.id) {
            const decrease = +obj.count - 1
            return { ...obj, count: decrease }
          }
          return obj
        })
  const decrementSum = () => {
    const calculatedSum = totalSum - setPrice
    return calculatedSum
  }
  return (
    <div className="product flex flex-col items-center justify-between p-2 m-2 bg-lime-100 border-2 rounded-lg border-lime-600">
      <img className="product__image" src={product.image} alt={product.description} />
      <p className="product__title text-center font-bold">{product.title}</p>
      <p className="product__price">Price for one: {setPrice}</p>
      <p className="product__amount">Quantity in Basket: {product.count}</p>
      <p className="product__total_price">Total for products: {sumForProduct}</p>
      <button
        type="button"
        className="product__remove w-full p-1 mt-1 rounded-md bg-rose-500 text-white"
        onClick={() => {
          dispatch(removeFromBusket(removeProductArr))
          dispatch(getSum(decrementSum()))
        }}
      >
        Delete Product
      </button>
    </div>
  )
}

Product.propTypes = {}

export default Product
