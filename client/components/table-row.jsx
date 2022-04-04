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
    <tr className="card flex flex-col items-center justify-between p-2 m-2 bg-yellow-100 border-2 rounded-lg border-lime-600">
      <tr>
        <img className="card__image" src={card.image} alt={card.description} />
      </tr>
      <tr>
        <p className="card__title text-center font-bold">{card.title}</p>
      </tr>
      <tr>
        <p className="card__price">
          Price: {card.priceCurrency} <span className="currency">{currentCurrency}</span>
        </p>
      </tr>
      <tr>
        {(counter && <p className="card__product--amount">In Cart Count: {counter}</p>) || (
          <p>&nbsp;</p>
        )}
      </tr>
      <tr>
        <button
          type="button"
          className="p-1 mt-1 rounded-md bg-rose-500 text-white"
          onClick={() => {
            dispatch(addToBasket(card))
          }}
        >
          Add to Basket
        </button>
      </tr>
    </tr>
  )
}
TableRow.propTypes = {}

export default TableRow
