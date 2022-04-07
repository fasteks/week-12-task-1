import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { SORT_BY_NAME, SORT_BY_PRICE } from '../../../server/common/index'
import { SORT_CARDS, sortByServer } from '../../redux/reducers/cards'
import { sortGoodsServer } from '../../redux/reducers/goods'

const Sorting = () => {
  const dispatch = useDispatch()
  const { products } = useSelector((s) => s.goods)
  const [isClickedPrice, setClickPrice] = useState(true)
  const [isClickedName, setClickName] = useState(true)
  return (
    <div className="flex items-center">
      Sort By:
      <button
        type="button"
        id="sort-price"
        className="mx-1 ml-2 p-1 hover:rounded-md hover:bg-lime-500 hover:scale-110 focus:rounded-md focus:bg-white focus:text-teal-800"
        onClick={() => {
          if (isClickedPrice) {
            setClickPrice(!isClickedPrice)
            dispatch(sortByServer(SORT_CARDS, SORT_BY_PRICE))
            if (Object.keys(products).length !== 0) {
              dispatch(sortGoodsServer(SORT_BY_PRICE))
            }
          }
          if (isClickedPrice && !isClickedName) {
            setClickName(!isClickedName)
          }
        }}
      >
        Price
      </button>
      |
      <button
        type="button"
        id="sort-name"
        className="mx-1 p-1 hover:rounded-md hover:bg-lime-500 hover:scale-110 focus:rounded-md focus:bg-white focus:text-teal-800"
        onClick={() => {
          if (isClickedName) {
            setClickName(!isClickedName)
            dispatch(sortByServer(SORT_CARDS, SORT_BY_NAME))
            if (Object.keys(products).length !== 0) {
              dispatch(sortGoodsServer(SORT_BY_NAME))
            }
          }
          if (isClickedName && !isClickedPrice) {
            setClickPrice(!isClickedPrice)
          }
        }}
      >
        Name
      </button>
    </div>
  )
}

Sorting.propTypes = {}

export default Sorting
