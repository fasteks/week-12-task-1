import React from 'react'

import Products from './products'

const Basket = () => {
  return (
    <div className="flex flex-col items-center h-screen bg-blue-200">
      <Products />
      <p
        id="total-amount"
        className="flex self-center justify-center py-5 px-10 font-semibold text-white bg-teal-600"
      >
        Total: {0}
      </p>
    </div>
  )
}

Basket.propTypes = {}

export default Basket
