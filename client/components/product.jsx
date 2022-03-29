import React from 'react'

const Product = (props) => {
  const { product } = props
  return (
    <div className="product flex flex-col items-center justify-between p-2 m-2 bg-lime-100 border-2 rounded-lg border-lime-600 w-1/6 h-96">
      <img className="product__image" src={product.image} alt={product.description} />
      <p className="product__title text-center font-bold">{product.title}</p>
      <p className="product__price">Price for one: {product.price}</p>
      <p className="product__amount">Quantity in Basket: 4</p>
      <p className="product__total_price">Total for products: 4</p>
      <button type="button" className="product__remove p-1 mt-1 rounded-md bg-rose-500 text-white">
        Delete Product from Basket
      </button>
    </div>
  )
}

Product.propTypes = {}

export default Product
