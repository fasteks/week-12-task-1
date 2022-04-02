import React from 'react'
import { useSelector } from 'react-redux'

import Product from './product'

const Products = () => {
  const { products } = useSelector((s) => s.goods)
  const isProducts = products.length === 0
  const isEmpty = 'Your basket is empty!'
  return (
    <div className="flex flex-wrap justify-center p-5 font-semibold text-lg text-rose-800">
      {isProducts
        ? isEmpty
        : products.map((currentProduct, index) => (
            <Product key={index} product={currentProduct} id={index} />
          ))}
    </div>
  )
}

export default React.memo(Products)
