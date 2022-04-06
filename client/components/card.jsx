import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addToBasket } from '../redux/reducers/goods'

const Card = (props) => {
  const { card } = props
  const dispatch = useDispatch()
  const productsArray = useSelector((s) => s.goods.products)
  const currentCurrency = useSelector((s) => s.goods.currency)
  return (
    <div className="card flex flex-col items-center justify-between p-2 m-2 bg-yellow-100 border-2 rounded-lg border-lime-600">
      <img className="card__image" src={card.image} alt={card.description} />
      <p className="card__title text-center font-bold">{card.title}</p>
      <p className="card__price">Price: {card.priceCurrency}</p>
      <span className="currency">Currency: {currentCurrency}</span>
      {productsArray.count && <p className="card__product--amount">Quantity in Basket: {productsArray.count}</p>}
      <button
        type="button"
        className="p-1 mt-1 rounded-md bg-rose-500 text-white"
        onClick={() => {
          dispatch(addToBasket(card))
        }}
      >
        Add to Basket
      </button>
    </div>
  )
}

Card.propTypes = {}

export default Card
