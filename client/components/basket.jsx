import React from 'react'
import { useSelector } from 'react-redux'
import Header from './header'
import Products from './products'

export const BASKET = 'Basket'

const Basket = () => {
  const currentSum = useSelector((s) => s.goods.sum)
  return (
    <div className="flex flex-col min-h-screen bg-green-100">
      <Header title={BASKET} />
      <Products />
      <p
        id="total-amount"
        className="flex justify-center p-5 box-border text-lg text-white font-semibold bg-teal-600"
      >
        Total cost: {currentSum}
      </p>
    </div>
  )
}

Basket.propTypes = {}

export default Basket
