import React from 'react'

import Head from './head'

const Main = () => {
  return (
    <div>
      <Head title="Main" />
      <div className="flex justify-center items-center h-screen">
        <p className="font-bold text-xl">Hello world</p>
      </div>
    </div>
  )
}

Main.propTypes = {}

export default Main
