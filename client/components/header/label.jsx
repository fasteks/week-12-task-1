import React from 'react'
import { Link } from 'react-router-dom'

import { MARKET } from '../main/main'

const Label = (props) => {
  const isUrl = props.title === MARKET
  return (
    <div>
      {isUrl ? (
        <p>Green Market</p>
      ) : (
        <Link to="/" id="brand-name">
          Green Market
        </Link>
      )}
    </div>
  )
}

Label.propTypes = {}

export default Label
