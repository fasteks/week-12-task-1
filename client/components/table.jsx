import React from 'react'
import { useSelector } from 'react-redux'

import TableRow from './table-row'

const Table = () => {
  const cardsArray = useSelector((s) => s.goods.cards)

  return (
    <table className="m-5">
      <tbody className="flex flex-wrap justify-center bg-teal-200 rounded-3xl bg-clip-content">
        {cardsArray.map((currentCard) => (
          <TableRow key={currentCard.id} card={currentCard} />
        ))}
      </tbody>
    </table>
  )
}

Table.propTypes = {}

export default Table
