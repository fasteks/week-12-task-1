import React from 'react'

import Head from './head'
import Header from './header'
import Cards from './cards'

const Main = () => {
  return (
    <div>
      <Head title="Main" />
      <Header title="Main" />
      <div className="flex flex-wrap justify-between items-center h-full">
        <Cards />
      </div>
    </div>
  )
}

Main.propTypes = {}

export default Main
