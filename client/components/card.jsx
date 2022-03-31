import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addToBasket } from '../redux/reducers/goods'

const Card = (props) => {
  const { card } = props
  const dispatch = useDispatch()
  const productsList = useSelector((s) => s.goods.products)
  const getCurrency = useSelector((s) => s.goods.currency)
  const counter = productsList
    .filter((it) => it.id === card.id)
    .map((el) => el.count)
    .join()
  // const lookForCard = () => {
  //   const isCardInBasket = productsList.find((it) => it.id === card.id)
  //   if (!isCardInBasket) {
  //     const neededCard = cardsList.find((it) => it.id === card.id)
  //     const newProductObj = { ...neededCard, count: 1 }
  //     return [...productsList, newProductObj]
  //   }
  //   const updatedProductsList = productsList.map((obj) => {
  //     if (obj.id === card.id) {
  //       const addCount = +obj.count + 1
  //       const addingOneMoreProduct = { ...obj, count: addCount }
  //       return addingOneMoreProduct
  //     }
  //     return obj
  //   })
  //   return updatedProductsList
  // }
  // const calcSum = () => {
  //   const intialState = card.price * getRates[getCurrency]
  //   const calculatedSum = productsList.reduce(
  //     (acc, rec) => acc + rec.count * rec.price * getRates[getCurrency],
  //     intialState
  //   )
  //   return calculatedSum
  // }
  return (
    <div className="card flex flex-col items-center justify-between p-2 m-2 bg-lime-100 border-2 rounded-lg border-lime-600">
      <img className="card__image" src={card.image} alt={card.description} />
      <p className="card__title text-center font-bold">{card.title}</p>
      <p className="card__price">Price: {card.price}</p>
      <span className="currency">Currency: {getCurrency}</span>
      {counter && <p className="card__product--amount">Quantity in Basket: {counter}</p>}
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
