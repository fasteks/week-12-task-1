import React from 'react'
import { useSelector } from 'react-redux'

import Card from './card'

const Cards = () => {
  const cardsArray = useSelector((s) => s.goods.cards)

  return cardsArray.map((currentCard) => <Card key={currentCard.id} card={currentCard} />)
}

Cards.propTypes = {}

export default Cards
