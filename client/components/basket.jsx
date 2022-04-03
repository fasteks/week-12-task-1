import React from 'react'
import { useSelector } from 'react-redux'

import Products from './products'

const Basket = () => {
  const currentSum = useSelector((s) => s.goods.sum)
  return (
    <div className="flex flex-col items-center h-screen bg-green-100">
      <Products />
      <p
        id="total-amount"
        className="flex self-center justify-center py-5 px-10 rounded-md font-semibold text-white bg-teal-600"
      >
        Total cost: {currentSum}
      </p>
    </div>
  )
}

Basket.propTypes = {}

export default Basket
