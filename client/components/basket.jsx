import React from 'react'

import Products from './products'

const Basket = () => {
  return (
    <>
      <Products />
      <p
        id="total-amount"
        className="flex self-center justify-center bg-teal-600 py-5 px-10 font-semibold text-white"
      >
        Total: {0}
      </p>
    </>
  )
}

Basket.propTypes = {}

export default Basket
