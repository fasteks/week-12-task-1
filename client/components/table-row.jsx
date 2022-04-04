import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addToBasket } from '../redux/reducers/goods'

const TableRow = (props) => {
  const { card } = props
  const dispatch = useDispatch()
  const productsArray = useSelector((s) => s.goods.products)
  const currentCurrency = useSelector((s) => s.goods.currency)
  const counter = productsArray
    .filter((it) => it.id === card.id)
    .map((el) => el.count)
    .join()
  return (
    <tr className="card flex flex-col items-center justify-between p-2 my-2 bg-yellow-100 border-2 rounded-lg border-lime-600">
      <td>
        <img className="card__image" src={card.image} alt={card.description} />
      </td>
      <td>
        <p className="card__title text-center font-bold">{card.title}</p>
      </td>
      <td>
        <p className="card__price">Price: {card.priceCurrency}</p>
      </td>
      <td>
        <span className="currency">Currency: {currentCurrency}</span>
      </td>
      <td>{counter && <p className="card__product--amount">Quantity in Basket: {counter}</p>}</td>
      <td>
        <button
          type="button"
          className="p-1 mt-1 rounded-md bg-rose-500 text-white"
          onClick={() => {
            dispatch(addToBasket(card))
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
