import React from 'react'

import Head from './head'
import Header from './header'

const Basket = () => {
  return (
    <div className="flex flex-col items-between h-screen">
      <Head title="Basket" />
      <Header />
      <div className="h-screen">1</div>
      <p id="total-amount" className="flex justify-center bg-teal-600 p-5 font-semibold text-white">
        Total:
      </p>
    </div>
  )
}

Basket.propTypes = {}

export default Basket
