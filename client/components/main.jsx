import React from 'react'
import { useSelector } from 'react-redux'

import Head from './head'

const Main = () => {
  const userName = useSelector((s) => s.user.name)
  return (
    <div>
      <Head title="Main" />
      <div className="flex justify-center items-center h-screen">
        <p className="font-bold text-xl">Hello world {userName}</p>
      </div>
    </div>
  )
}

Main.propTypes = {}

export default Main
