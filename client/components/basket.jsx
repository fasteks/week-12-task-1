import React from 'react'
import { useSelector } from 'react-redux'
import Header from './header'
import Products from './products'

export const BASKET = 'Basket'

const Basket = () => {
  const { sum } = useSelector((s) => s.goods)
  return (
    <div className="flex flex-col justify-between min-h-screen bg-green-100">
      <Header title={BASKET} />
      <div className="flex flex-col items-center">
        <Products />
      </div>
      <p
        id="total-amount"
        className="flex justify-center p-5 box-border text-lg text-white font-semibold bg-teal-600"
      >
        Total cost: {sum}
      </p>
    </div>
  )
}

Basket.propTypes = {}

export default Basket
