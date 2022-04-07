import React from 'react'

import Sorting from './sorting'
import Currency from './currency'
import Label from './label'
import Order from './order'
import Total from './total'

const Header = (props) => {
  return (
    <div className="flex flex-wrap justify-evenly items-center p-2 box-border text-lg font-semibold text-white bg-teal-600">
      <Label title={props.title} />
      <Currency />
      <Sorting />
      <Order title={props.title} />
      <Total />
    </div>
  )
}

Header.propTypes = {}

export default Header
