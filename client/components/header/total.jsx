import React from 'react'
import { useSelector } from 'react-redux'

const Total = () => {
  const { sum } = useSelector((s) => s.goods)
  return (
    <p className="flex flex-col items-center">
      <span>Total cost:</span>
      <span>{sum}</span>
    </p>
  )
}

Total.propTypes = {}

export default Total
