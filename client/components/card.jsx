import React from 'react'

const Card = (props) => {
  const { card } = props
  return (
    <div className="card">
      <img className="card__image" src={card.image} alt={card.description} />
      <p className="card__price">{card.price}</p>
      <span className="currency">2</span>
      <p className="card__title">{card.title}</p>
      <p className="card__product--amount">4</p>
      <button type="button">Add to Cart</button>
    </div>
  )
}

Card.propTypes = {}

export default Card
