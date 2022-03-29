import React from 'react'
import { Link, useParams } from 'react-router-dom'

const Header = () => {
  const params = useParams()
  const isUrl = Object.keys(params).length === 0
  return (
    <div className="flex justify-evenly items-center bg-teal-600 p-5 font-semibold text-white">
      {isUrl && <p>Main</p>}
      {!isUrl && (
        <Link to="/" id="brand-name">
          Main
        </Link>
      )}
      <div>
        <button type="button" className="mx-1">
          USD
        </button>
        <button type="button" className="mx-1">
          EUR
        </button>
        <button type="button" className="mx-1">
          CAD
        </button>
      </div>
      <div className="flex">
        Sort By:
        <button type="button" id="sort-price" className="mx-1 ml-2">
          Price
        </button>
        <button type="button" id="sort-name" className="mx-1">
          Name
        </button>
      </div>
      {!isUrl && <span id="order-count">Order: {0}</span>}
      {isUrl && (
        <Link to="/basket">
          <span id="order-count">Order: {0}</span>
        </Link>
      )}
      <p>Total cost: {}</p>
    </div>
  )
}

Header.propTypes = {}

export default Header
