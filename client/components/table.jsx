import React from 'react'
import { useSelector } from 'react-redux'

import TableRow from './table-row'

const Table = () => {
  const cardsArray = useSelector((s) => s.goods.cards)

  return (
    <table>
      <tbody className="flex flex-wrap justify-evenly">
        {cardsArray.map((currentCard) => (
          <TableRow key={currentCard.id} card={currentCard} />
        ))}
      </tbody>
    </table>
  )
}

Table.propTypes = {}

export default Table
