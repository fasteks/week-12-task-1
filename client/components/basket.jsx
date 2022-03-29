import React from 'react'

const Basket = () => {
  return (
    <div className="flex flex-col items-between h-screen">
      <div className="h-screen">1</div>
      <p id="total-amount" className="flex justify-center bg-teal-600 p-5 font-semibold text-white">
        Total:
      </p>
    </div>
  )
}

Basket.propTypes = {}

export default Basket
