import React from 'react'
import { useSelector } from 'react-redux'

import Card from './card'

const Cards = () => {
  const goodsList = useSelector((s) => s.goods)

  return (
    <>
      {goodsList.map((currentCard) => (
        <Card key={currentCard.id} card={currentCard} />
      ))}
    </>
  )
}

Cards.propTypes = {}

export default Cards
