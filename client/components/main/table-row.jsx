import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addToBasketObj } from '../../redux/reducers/goods'

const TableRow = (props) => {
  const { card } = props
  const dispatch = useDispatch()
  const { products } = useSelector((s) => s.goods)
  const { currency } = useSelector((s) => s.settings)
  return (
    <tr className="card flex flex-col items-center justify-between w-60 p-5 m-2 my-5 bg-yellow-200 border-2 rounded-lg border-lime-600">
      <td>
        <img className="card__image" src={card.image} alt={card.description} />
      </td>
      <td>
        <p className="card__title h-12 text-center font-bold">{card.title}</p>
      </td>
      <td>
        <p className="card__price">
          Price: {card.priceCurrency} <span className="currency">{currency}</span>
        </p>
      </td>
      <td>
        {(products[card.id] && (
          <p className="card__product--amount">In Cart Count: {products[card.id].count}</p>
        )) || <p className="invisible">&nbsp;</p>}
      </td>
      <td>
        <button
          type="button"
          className="p-1 rounded-md bg-rose-500 text-white"
          onClick={() => {
            dispatch(addToBasketObj(card))
          }}
        >
          Add to Basket
        </button>
      </td>
    </tr>
  )
}
TableRow.propTypes = {}

export default TableRow
