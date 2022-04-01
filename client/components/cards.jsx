import React from 'react'
import { useSelector } from 'react-redux'

import Card from './card'

const Cards = () => {
  const { cards } = useSelector((s) => s.goods)

  return (
    <>
      {cards.map((currentCard) => (
        <Card key={currentCard.id} card={currentCard} />
      ))}
    </>
  )
}

Cards.propTypes = {}

export default Cards
