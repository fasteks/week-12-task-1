import React from 'react'

import Products from './products'

const Basket = () => {
  return (
    <>
      <Products />
      <p
        id="total-amount"
        className="flex self-center justify-center py-5 px-10 font-semibold text-white bg-teal-600"
      >
        Total: {0}
      </p>
    </>
  )
}

Basket.propTypes = {}

export default Basket
