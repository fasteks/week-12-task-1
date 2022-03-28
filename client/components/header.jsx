import React from 'react'
import { Link } from 'react-router-dom'

const Header = (props) => {
  return (
    <div className="flex justify-evenly items-center bg-teal-600 p-5 font-semibold text-white">
      <Link to="/" id="brand-name">
        {props.title}
      </Link>
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
      <Link>
        <span id="order-count">{}</span>
      </Link>
      <p>Total cost: {}</p>
    </div>
  )
}

Header.propTypes = {}

export default Header
