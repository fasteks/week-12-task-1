import React from 'react'

import Products from './products'

const Basket = () => {
  return (
    <div className="flex flex-col items-between">
      <div className="flex h-96 m-5 justify-center items-center font-semibold text-lg text-rose-600 bg-rose-100 border-2 rounded-lg border-rose-600">
        <Products />
      </div>
      <p
        id="total-amount"
        className="flex self-center justify-center bg-teal-600 py-5 px-10 font-semibold text-white"
      >
        Total: {0}
      </p>
    </div>
  )
}

Basket.propTypes = {}

export default Basket
