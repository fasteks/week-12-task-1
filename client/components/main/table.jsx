import React from 'react'
import { useSelector } from 'react-redux'

import TableRow from './table-row'

import useScroll from '../useScroll'

const Table = () => {
  const { cards } = useSelector((s) => s.cards)

  const { scrollY, scrollX, scrollDirection } = useScroll()
  console.log({ scrollY, scrollX, scrollDirection })

  return (
    <table className="m-5">
      <tbody className="flex flex-wrap justify-center bg-teal-200 rounded-3xl bg-clip-content">
        {cards.map((currentCard) => (
          <TableRow key={currentCard.id} card={currentCard} />
        ))}
      </tbody>
    </table>
  )
}

Table.propTypes = {}

export default Table
