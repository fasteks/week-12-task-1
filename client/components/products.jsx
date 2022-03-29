import React from 'react'
import { useSelector } from 'react-redux'

import Product from './product'

const Products = () => {
  const productList = useSelector((s) => s.goods.products)
  const isproductList = productList.length === 0
  const isEmpty = 'Your basket is empty!'
  return (
    <div>
      {isproductList
        ? isEmpty
        : productList.map((currentProduct) => (
            <Product key={currentProduct.id} product={currentProduct} />
          ))}
    </div>
  )
}

Products.propTypes = {}

export default Products
