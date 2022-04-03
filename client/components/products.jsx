import React from 'react'
import { useSelector } from 'react-redux'

import Product from './product'

const Products = () => {
  const productsArray = useSelector((s) => s.goods.products)
  const isProducts = productsArray.length === 0
  return (
    <div className="flex flex-wrap justify-center p-5 font-semibold text-lg text-pink-700">
      {isProducts ? (
        <div className="my-20 p-5 rounded-md bg-teal-600 text-white">Your basket is empty!</div>
      ) : (
        productsArray.map((currentProduct, index) => (
          <Product key={index} product={currentProduct} id={index} />
        ))
      )}
    </div>
  )
}

export default React.memo(Products)
