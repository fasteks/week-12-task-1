import React from 'react'
import { useSelector } from 'react-redux'

import Product from './product'

const Products = () => {
  const productList = useSelector((s) => s.goods.products)
  const isproductList = productList.length === 0
  const isEmpty = 'Your basket is empty!'
  return (
    <div className="flex flex-wrap justify-center p-5 font-semibold text-lg text-rose-800">
      {isproductList
        ? isEmpty
        : productList.map((currentProduct, index) => (
            <Product key={index} product={currentProduct} id={index} />
          ))}
    </div>
  )
}

Products.propTypes = {}

export default Products
