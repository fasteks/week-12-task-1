import React from 'react'
import { useSelector } from 'react-redux'

import Card from './card'

const Cards = () => {
  const cardList = useSelector((s) => s.goods.cards)

  return (
    <>
      {cardList.map((currentCard) => (
        <Card key={currentCard.id} card={currentCard} />
      ))}
    </>
  )
}

Cards.propTypes = {}

export default Cards
