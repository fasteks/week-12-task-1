import React from 'react'
import { useSelector } from 'react-redux'
import Header from './header'
import Products from './products'

const Basket = () => {
  const currentSum = useSelector((s) => s.goods.sum)
  return (
    <div className="flex flex-col min-h-screen bg-green-100">
      <Header title="Basket" />
      <Products />
      <p
        id="total-amount"
        // className="flex self-center justify-center py-5 px-10 rounded-md font-semibold text-white bg-teal-600"
        className="flex py-5 px-10 rounded-md font-semibold text-white bg-teal-600"
      >
        Total cost: {currentSum}
      </p>
    </div>
  )
}

Basket.propTypes = {}

export default Basket
