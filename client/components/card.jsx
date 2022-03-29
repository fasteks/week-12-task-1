import React from 'react'

const Card = (props) => {
  const { card } = props
  return (
    <div className="card flex flex-col items-center p-2 m-2 bg-lime-100 border-2 rounded-lg border-lime-600 ">
      <img className="card__image" src={card.image} alt={card.description} />
      <p className="card__title font-bold">{card.title}</p>
      <p className="card__price">Price: {card.price}</p>
      <span className="currency">Currency: 2</span>
      {true && <p className="card__product--amount">Quantity in Basket: 4</p>}
      <button type="button">Add to Basket</button>
    </div>
  )
}

Card.propTypes = {}

export default Card
