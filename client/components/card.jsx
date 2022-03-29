import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addToBasket } from '../redux/reducers/goods'

const Card = (props) => {
  const dispatch = useDispatch()
  const { card } = props
  const cardList = useSelector((s) => s.goods.cards)
  const lookForCard = () => {
    const neededCard = cardList.find((it) => it.id === card.id)
    return neededCard
  }
  return (
    <div className="card flex flex-col items-center justify-between p-2 m-2 bg-lime-100 border-2 rounded-lg border-lime-600">
      <img className="card__image" src={card.image} alt={card.description} />
      <p className="card__title text-center font-bold">{card.title}</p>
      <p className="card__price">Price: {card.price}</p>
      <span className="currency">Currency: 2</span>
      {true && <p className="card__product--amount">Quantity in Basket: 4</p>}
      <button
        type="button"
        className="p-1 mt-1 rounded-md bg-rose-500 text-white"
        onClick={() => {
          dispatch(addToBasket(lookForCard()))
        }}
      >
        Add to Basket
      </button>
    </div>
  )
}

Card.propTypes = {}

export default Card
