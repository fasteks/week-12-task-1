import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Head from './head'

import { changeName } from '../redux/reducers/user'

const Main = () => {
  const dispatch = useDispatch()
  const userName = useSelector((s) => s.user.name)
  return (
    <div>
      <Head title="Main" />
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="font-bold text-xl">Hello {userName}</p>
        <div>
          <input
            type="text"
            className="border-4 border-yellow-500"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                dispatch(changeName(e.target.value))
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}

Main.propTypes = {}

export default Main
