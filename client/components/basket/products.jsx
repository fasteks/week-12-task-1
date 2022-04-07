import React from 'react'
import { useSelector } from 'react-redux'

import Product from './product'

const Products = () => {
  const { products } = useSelector((s) => s.goods)
  const isProducts = Object.keys(products).length === 0
  return (
    <div className="flex flex-wrap grow items-center justify-center max-w-screen-xl p-5 m-5 font-semibold text-lg rounded-3xl bg-teal-200">
      {isProducts ? (
        <div className="p-5 rounded-md bg-teal-600 text-white">Your basket is empty!</div>
      ) : (
        Object.keys(products).map((it) => {
          return <Product key={it} product={products[it]} />
        })
      )}
    </div>
  )
}

export default React.memo(Products)
